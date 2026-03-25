#!/usr/bin/env node
/**
 * Hemmings Scraper
 * Scrapes classic/collector car listings from hemmings.com
 * Uses Playwright to handle Cloudflare + intercepts API responses
 */

const { chromium } = require('playwright');
const { createListing, delay, parsePrice, parseMileage, isFlorida, isSouthFlorida } = require('./utils');

async function scrape() {
  console.log('[Hemmings] Starting browser-based scrape...');

  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      executablePath: '/usr/bin/chromium',
    });

    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1920, height: 1080 },
      locale: 'en-US',
    });

    const page = await context.newPage();
    const listings = [];
    let apiData = null;

    // Intercept the listings API response
    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('api.hemmings.com') && url.includes('search/listings')) {
        try {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            console.log(`[Hemmings] Intercepted API: ${data.total_count} total, ${data.results.length} on page`);
            apiData = data;
          }
        } catch {}
      }
    });

    // Load the classifieds page - this triggers Cloudflare and then the API call
    console.log('[Hemmings] Loading classifieds page...');
    await page.goto('https://www.hemmings.com/classifieds/cars-for-sale', {
      waitUntil: 'domcontentloaded',
      timeout: 45000,
    });

    // Wait for Cloudflare challenge to resolve
    let cfAttempts = 0;
    while (cfAttempts < 5) {
      const title = await page.title();
      if (!title.includes('Just a moment')) break;
      await delay(5000);
      cfAttempts++;
    }

    // Wait for API data to load
    await delay(8000);

    if (apiData) {
      console.log(`[Hemmings] Processing ${apiData.results.length} listings from API...`);
      
      for (const item of apiData.results) {
        const listing = mapHemmingsItem(item);
        if (listing) listings.push(listing);
      }
    }

    // Now try to navigate with Florida state filter using the browser's cookies
    // The API filter may work differently; let's try URL-based state filtering
    const stateUrls = [
      'https://www.hemmings.com/classifieds/cars-for-sale?state=FL',
      'https://www.hemmings.com/classifieds/cars-for-sale?location=miami',
    ];

    for (const stateUrl of stateUrls) {
      apiData = null;
      try {
        console.log(`[Hemmings] Trying: ${stateUrl}`);
        await page.goto(stateUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await delay(8000);

        if (apiData && apiData.results) {
          console.log(`[Hemmings] Got ${apiData.results.length} more results`);
          for (const item of apiData.results) {
            const listing = mapHemmingsItem(item);
            if (listing) listings.push(listing);
          }
        }
      } catch (err) {
        console.warn(`[Hemmings] Error with ${stateUrl}: ${err.message}`);
      }
    }

    // Fetch additional pages by navigating (triggers fresh API calls with cookies)
    for (let p = 2; p <= 4; p++) {
      apiData = null;
      try {
        const pageUrl = `https://www.hemmings.com/classifieds/cars-for-sale?page=${p}`;
        console.log(`[Hemmings] Loading page ${p}...`);
        await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await delay(6000);
        if (apiData && apiData.results) {
          console.log(`[Hemmings] Page ${p}: ${apiData.results.length} results`);
          for (const item of apiData.results) {
            const listing = mapHemmingsItem(item);
            if (listing) listings.push(listing);
          }
        }
      } catch (err) {
        console.warn(`[Hemmings] Page ${p} error: ${err.message}`);
      }
    }

    await browser.close();

    // Deduplicate
    const seen = new Set();
    const unique = listings.filter(l => {
      if (seen.has(l.sourceUrl)) return false;
      seen.add(l.sourceUrl);
      return true;
    });

    // Filter for Florida (use broader filter for Hemmings since it's classic/collector)
    const floridaListings = unique.filter(l => isFlorida(l.location));
    console.log(`[Hemmings] Total: ${unique.length}, Florida: ${floridaListings.length}`);

    // Return Florida listings
    return floridaListings;

  } catch (err) {
    if (browser) await browser.close().catch(() => {});
    console.error(`[Hemmings] Error: ${err.message}`);
    return [];
  }
}

function mapHemmingsItem(item) {
  if (!item) return null;

  // Determine the source URL
  let sourceUrl = item.url || '';
  if (!sourceUrl && item.id) {
    sourceUrl = `https://www.hemmings.com/classifieds/${item.id}`;
  }

  // Parse year/make/model from structured fields
  const year = item.year || 0;
  const make = (typeof item.make === 'object' ? item.make?.name : item.make) || '';
  const model = (typeof item.model === 'object' ? item.model?.name : item.model) || '';
  const trim = item.trim || '';

  // Get images from thumbnail object
  const images = [];
  if (item.thumbnail) {
    // Prefer xl > lg > md sizes, full aspect ratio
    const sizes = ['xl', 'lg', 'md'];
    for (const size of sizes) {
      const url = item.thumbnail[size]?.['3:2'] || item.thumbnail[size]?.full || '';
      if (url) {
        images.push(url);
        break;
      }
    }
  }
  if (item.featured_image && !images.includes(item.featured_image)) {
    images.push(item.featured_image);
  }
  if (item.photo_url && !images.includes(item.photo_url)) {
    images.push(item.photo_url);
  }

  // Location - prefer the full location string from API
  let location = '';
  if (item.location && item.location.length > 5) {
    location = item.location;
  } else if (item.city && item.state) {
    location = `${item.city}, ${item.state}`;
  } else if (item.state) {
    location = item.state;
  } else if (item.location) {
    location = item.location;
  }

  // Price - check multiple fields
  let price = 0;
  if (item.price) {
    price = parsePrice(item.price);
  } else if (item.current_price) {
    price = parsePrice(item.current_price);
  } else if (item.current_bid) {
    price = parsePrice(item.current_bid);
  } else if (item.asking_price) {
    price = parsePrice(item.asking_price);
  }

  // Mileage
  let mileage = 0;
  if (item.mileage) {
    mileage = parseMileage(item.mileage);
  } else if (item.odometer) {
    mileage = parseMileage(item.odometer);
  }

  // Type based on listing_type
  let type = 'Classic';
  if (item.listing_type === 'auctions' || item.type === 'auction') {
    type = 'Classic Auction';
  }

  // Description
  let description = item.abstract || item.body || item.long_title || item.title || '';
  description = description.replace(/<[^>]*>/g, '').trim().slice(0, 500);

  return createListing({
    year,
    make,
    model,
    trim,
    price,
    mileage,
    location,
    type,
    description,
    images,
    sourceUrl,
    sourceName: 'Hemmings',
    listedAt: item.created_at || item.published_at || new Date().toISOString(),
    color: item.exterior_color || item.color || '',
    transmission: item.transmission || '',
    engine: item.engine || '',
  });
}

if (require.main === module) {
  scrape()
    .then(listings => {
      console.log(`\n[Hemmings] Scraped ${listings.length} listings`);
      listings.slice(0, 5).forEach(l => {
        console.log(`  ${l.year} ${l.make} ${l.model} - ${l.location || 'N/A'} - $${l.price}`);
      });
    })
    .catch(err => {
      console.error('[Hemmings] Error:', err.message);
      process.exit(1);
    });
}

module.exports = { scrape };
