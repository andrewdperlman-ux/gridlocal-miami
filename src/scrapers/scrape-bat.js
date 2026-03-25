#!/usr/bin/env node
/**
 * Bring a Trailer Scraper
 * Scrapes active auctions from BaT's RSS feed + individual listing pages
 * Filters for Florida/Miami area listings
 */

const fetch = require('node-fetch');
const { parseStringPromise } = require('xml2js');
const cheerio = require('cheerio');
const { createListing, delay, parsePrice, parseMileage, parseYearMakeModel, isSouthFlorida } = require('./utils');

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': USER_AGENT,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
        timeout: 15000,
      });
      if (res.ok) return res;
      console.warn(`  [BaT] HTTP ${res.status} for ${url}`);
    } catch (err) {
      console.warn(`  [BaT] Fetch error (attempt ${i + 1}): ${err.message}`);
    }
    if (i < retries - 1) await delay(2000);
  }
  return null;
}

async function fetchRSS() {
  console.log('[BaT] Fetching RSS feed...');
  const res = await fetchWithRetry('https://bringatrailer.com/feed/');
  if (!res) throw new Error('Failed to fetch BaT RSS feed');

  const xml = await res.text();
  const parsed = await parseStringPromise(xml, { explicitArray: false });
  const items = parsed.rss.channel.item;
  const itemList = Array.isArray(items) ? items : [items];

  console.log(`[BaT] Found ${itemList.length} RSS items`);
  return itemList;
}

async function scrapeListingPage(url) {
  await delay(1500 + Math.random() * 1000); // Rate limiting
  const res = await fetchWithRetry(url);
  if (!res) return null;

  const html = await res.text();
  const $ = cheerio.load(html);

  // Extract location from listing details
  let location = '';
  let mileage = 0;
  let transmission = '';
  let engine = '';
  let color = '';
  let type = '';

  // BaT has listing essentials in a structured format
  $('.listing-essentials-item, .essentials li, .listing-available-item').each((_, el) => {
    const text = $(el).text().trim();
    const label = text.split(':')[0]?.toLowerCase() || '';
    const value = text.split(':').slice(1).join(':').trim();

    if (label.includes('location') || label.includes('seller')) {
      location = value || text;
    }
    if (label.includes('mile') || label.includes('odometer')) {
      mileage = parseMileage(value || text);
    }
    if (label.includes('transmission') || label.includes('trans')) {
      transmission = value || text;
    }
    if (label.includes('engine') || label.includes('motor')) {
      engine = value || text;
    }
    if (label.includes('color') || label.includes('exterior')) {
      color = value || text;
    }
    if (label.includes('body') || label.includes('type') || label.includes('style')) {
      type = value || text;
    }
  });

  // Check text for mileage patterns like "143k miles" or "32,000 miles"
  if (!mileage) {
    const bodyText = $('body').text();
    const mileMatch = bodyText.match(/(?:shows?\s+|odometer\s+(?:reads?\s+)?|(?:has\s+)?)(\d[\d,]+)k?\s*(?:miles|mi\b)/i);
    if (mileMatch) {
      let val = mileMatch[1].replace(/,/g, '');
      const numVal = parseInt(val);
      // If the text says "143k" (with k suffix in context), multiply
      if (mileMatch[0].match(/\d+k\s/i) && numVal < 1000) {
        mileage = numVal * 1000;
      } else {
        mileage = numVal;
      }
    }
  }

  // Also check the meta/structured data
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const ld = JSON.parse($(el).html());
      if (ld['@type'] === 'Product' || ld['@type'] === 'Car') {
        if (ld.offers?.areaServed) location = location || ld.offers.areaServed;
        if (ld.mileageFromOdometer?.value) mileage = mileage || parseMileage(ld.mileageFromOdometer.value);
        if (ld.vehicleTransmission) transmission = transmission || ld.vehicleTransmission;
        if (ld.vehicleEngine?.name) engine = engine || ld.vehicleEngine.name;
        if (ld.color) color = color || ld.color;
      }
    } catch {}
  });

  // Check for the listing details/stats area
  const detailTexts = [];
  $('.listing-stats-value, .stat-value, [class*="detail"] td, [class*="detail"] dd').each((_, el) => {
    detailTexts.push($(el).text().trim());
  });

  // Try to find location from the page content/description
  if (!location) {
    const bodyText = $('body').text();
    const locMatch = bodyText.match(/(?:located?\s+(?:in\s+)?|seller\s*(?:is\s+)?(?:located?\s+)?(?:in\s+)?)([\w\s]+,\s*(?:FL|Florida))/i);
    if (locMatch) location = locMatch[1].trim();
  }

  // Get images
  const images = [];
  $('img[src*="bringatrailer.com/wp-content/uploads"]').each((_, el) => {
    const src = $(el).attr('src');
    if (src && !images.includes(src) && images.length < 10) {
      // Get higher res version
      const highRes = src.replace(/\?.*$/, '?w=940');
      images.push(highRes);
    }
  });

  // Get current bid/price
  let price = 0;
  const bidText = $('.listing-bid-value, .current-bid-value, [class*="bid"] .info-value').first().text();
  if (bidText) price = parsePrice(bidText);

  return { location, mileage, transmission, engine, color, type, images, price };
}

async function scrape() {
  const items = await fetchRSS();
  const listings = [];

  for (const item of items) {
    const title = item.title || '';
    const link = item.link || '';
    const description = item.description || '';
    const pubDate = item.pubDate || '';
    const imageUrl = item['media:content']?.['$']?.url || '';

    // Parse year/make/model from title
    // BaT titles are like: "1984 Mercedes-Benz 300CD Turbo at No Reserve"
    // or "32k-Mile 2003 Aston Martin DB7 V12 Vantage GTA"
    let cleanTitle = title
      .replace(/^[\d,]+k?-?\s*(?:mile|mi(?:le)?|kilometer)\s+/i, '')  // Remove mileage prefix
      .replace(/^[\w\s]+-colored?\s+/i, '') // Remove color prefix like "Fjord Green"
      .replace(/^[\w\s]+-metallic\s+/i, '') // Remove metallic color prefix
      .replace(/\s+at\s+no\s+reserve$/i, '')  // Remove "at No Reserve"
      .replace(/\s+(?:no\s+)?reserve$/i, '')  // Remove "Reserve/No Reserve"
      .replace(/^\d+-(?:mile|mi)\s+/i, '') // "88-Mile ..."
      .trim();

    // Handle multi-word makes
    const MULTI_WORD_MAKES = [
      'Aston Martin', 'Alfa Romeo', 'Land Rover', 'Range Rover', 'Mercedes-Benz',
      'Rolls-Royce', 'De Tomaso', 'AM General', 'Austin-Healey',
    ];

    let { year, make, model } = parseYearMakeModel(cleanTitle);

    // Fix multi-word makes
    for (const mwm of MULTI_WORD_MAKES) {
      if (cleanTitle.includes(mwm)) {
        const afterYear = cleanTitle.replace(/^\d{4}\s+/, '');
        if (afterYear.startsWith(mwm)) {
          make = mwm;
          model = afterYear.slice(mwm.length).trim();
          break;
        }
      }
    }

    if (!year || year < 1900) continue; // Skip non-car items

    // Try to scrape listing page for details (including location)
    console.log(`[BaT] Scraping: ${title}`);
    let details = null;
    try {
      details = await scrapeListingPage(link);
    } catch (err) {
      console.warn(`  [BaT] Failed to scrape page: ${err.message}`);
    }

    const location = details?.location || '';
    const images = details?.images?.length ? details.images : (imageUrl ? [imageUrl] : []);

    const listing = createListing({
      year,
      make,
      model: model.split(' ').slice(0, 4).join(' '), // Limit model length
      trim: model.split(' ').slice(4).join(' '),
      price: details?.price || 0,
      mileage: details?.mileage || 0,
      location,
      type: details?.type || 'Collector',
      description: description.replace(/<[^>]*>/g, '').trim().slice(0, 500),
      images,
      sourceUrl: link,
      sourceName: 'Bring a Trailer',
      listedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      color: details?.color || '',
      transmission: details?.transmission || '',
      engine: details?.engine || '',
    });

    listings.push(listing);
  }

  // Note: BaT RSS gives us the latest listings globally. 
  // We keep all of them since BaT is nationwide, and filter happens in the master script.
  // But we also flag Florida ones
  const floridaListings = listings.filter(l => isSouthFlorida(l.location));
  console.log(`[BaT] Total listings: ${listings.length}, Florida: ${floridaListings.length}`);

  // Return all listings - the master script will handle Florida filtering
  // But if we have enough Florida ones, prefer those
  return listings;
}

// Run standalone
if (require.main === module) {
  scrape()
    .then(listings => {
      console.log(`\n[BaT] Scraped ${listings.length} listings`);
      listings.slice(0, 3).forEach(l => {
        console.log(`  ${l.year} ${l.make} ${l.model} - ${l.location || 'N/A'} - $${l.price}`);
      });
      // Write to stdout as JSON if piped
      if (!process.stdout.isTTY) {
        process.stdout.write(JSON.stringify(listings, null, 2));
      }
    })
    .catch(err => {
      console.error('[BaT] Error:', err.message);
      process.exit(1);
    });
}

module.exports = { scrape };
