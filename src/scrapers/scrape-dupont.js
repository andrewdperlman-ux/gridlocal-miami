#!/usr/bin/env node
/**
 * DuPont Registry Scraper
 * Scrapes luxury/exotic car listings from dupontregistry.com
 * Uses Playwright for browser-based scraping (WAF protected)
 */

const { chromium } = require('playwright');
const { createListing, delay, parsePrice, parseMileage, isSouthFlorida } = require('./utils');

const SEARCH_URLS = [
  'https://www.dupontregistry.com/autos/results/all/all/all/all/all/all/all/all/all/all/miami?state=FL',
  'https://www.dupontregistry.com/autos/results/all/all/all/all/all/all/all/all/all/all/fort-lauderdale?state=FL',
];

async function scrape() {
  console.log('[DuPont] Starting browser-based scrape...');

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
    });

    const page = await context.newPage();
    const allListings = [];

    // First, try the homepage for featured cars (always works)
    console.log('[DuPont] Fetching homepage featured cars...');
    try {
      await page.goto('https://www.dupontregistry.com/', { waitUntil: 'networkidle', timeout: 30000 });
      await delay(2000);

      const nextData = await page.evaluate(() => {
        const el = document.querySelector('#__NEXT_DATA__');
        return el ? JSON.parse(el.textContent) : null;
      });

      if (nextData) {
        const featured = nextData?.props?.pageProps?.featuredCars?.response || [];
        console.log(`[DuPont] Found ${featured.length} featured cars from homepage`);

        for (const car of featured) {
          const state = car.dealer?.state || '';
          const city = car.dealer?.city || '';
          const location = city && state ? `${city}, ${state}` : state || '';

          // Get images
          const images = [];
          if (car.images?.length) {
            for (const img of car.images.slice(0, 10)) {
              const url = img.url || img.originalUrl || img.thumbnailUrl || '';
              if (url) images.push(url);
            }
          }
          if (car.image) images.push(car.image);

          const listing = createListing({
            year: car.year || 0,
            make: car.carBrand?.name || '',
            model: car.carModel?.name || '',
            trim: car.trim || '',
            price: car.price || 0,
            mileage: car.mileage || 0,
            location,
            type: 'Exotic',
            description: (car.description || '').slice(0, 500),
            images,
            sourceUrl: `https://www.dupontregistry.com/autos/listing/${car.id}/${car.year}-${(car.carBrand?.alias || '').toLowerCase()}-${(car.carModel?.alias || '').toLowerCase()}`,
            sourceName: 'DuPont Registry',
            listedAt: car.createdAt || car.publishedAt || new Date().toISOString(),
            color: car.exteriorColor?.name || '',
            transmission: car.transmission || '',
            engine: car.engine || car.driveTrain || '',
          });

          allListings.push(listing);
        }
      }
    } catch (err) {
      console.warn(`[DuPont] Homepage error: ${err.message}`);
    }

    // Now try search results pages with browser
    for (const searchUrl of SEARCH_URLS) {
      console.log(`[DuPont] Navigating to: ${searchUrl}`);
      try {
        await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });

        // Wait for potential WAF challenge to resolve
        await delay(5000);

        // Check if we passed the WAF
        const title = await page.title();
        if (title.includes('Human Verification') || title.includes('Just a moment')) {
          console.log('[DuPont] WAF challenge detected, waiting...');
          try {
            await page.waitForNavigation({ timeout: 20000 });
          } catch {
            console.warn('[DuPont] WAF challenge not resolved, skipping this URL');
            continue;
          }
        }

        // Wait for listings to load - try waiting for specific elements or network idle
        try {
          await page.waitForSelector('[class*="listing"], [class*="car-card"], [class*="vehicle"]', { timeout: 15000 });
        } catch {
          // If no listing elements found, try waiting more
          await delay(5000);
        }

        // Try to extract from __NEXT_DATA__
        const nextData = await page.evaluate(() => {
          const el = document.querySelector('#__NEXT_DATA__');
          return el ? JSON.parse(el.textContent) : null;
        });

        if (nextData) {
          const autos = nextData?.props?.pageProps?.initialState?.autosState?.currentAutos ||
            nextData?.props?.pageProps?.initialState?.autosState?.response ||
            [];

          console.log(`[DuPont] Found ${autos.length} cars from search`);

          for (const car of autos) {
            const state = car.dealer?.state || '';
            const city = car.dealer?.city || '';
            const location = city && state ? `${city}, ${state}` : state || '';

            if (!isSouthFlorida(location) && state !== 'FL') continue;

            const images = [];
            if (car.images?.length) {
              for (const img of car.images.slice(0, 10)) {
                const url = img.url || img.originalUrl || '';
                if (url) images.push(url);
              }
            }

            const listing = createListing({
              year: car.year || 0,
              make: car.carBrand?.name || '',
              model: car.carModel?.name || '',
              trim: car.trim || '',
              price: car.price || 0,
              mileage: car.mileage || 0,
              location,
              type: 'Exotic',
              description: (car.description || '').slice(0, 500),
              images,
              sourceUrl: `https://www.dupontregistry.com/autos/listing/${car.id}/${car.year}-${(car.carBrand?.alias || '').toLowerCase()}-${(car.carModel?.alias || '').toLowerCase()}`,
              sourceName: 'DuPont Registry',
              listedAt: car.createdAt || car.publishedAt || new Date().toISOString(),
              color: car.exteriorColor?.name || '',
              transmission: car.transmission || '',
              engine: car.engine || car.driveTrain || '',
            });

            allListings.push(listing);
          }
        }

        // If __NEXT_DATA__ didn't work, try scraping the rendered page
        if (allListings.length < 5) {
          console.log('[DuPont] Trying to scrape rendered listing cards...');
          const cards = await page.$$eval('[class*="listing"], [class*="car-card"], [class*="vehicle-card"], a[href*="/autos/listing/"]', (elements) => {
            return elements.map(el => {
              const link = el.href || el.querySelector('a')?.href || '';
              const title = el.querySelector('[class*="title"], h2, h3')?.textContent || '';
              const price = el.querySelector('[class*="price"]')?.textContent || '';
              const img = el.querySelector('img')?.src || '';
              const location = el.querySelector('[class*="location"], [class*="city"]')?.textContent || '';
              const mileage = el.querySelector('[class*="mileage"], [class*="mile"]')?.textContent || '';
              return { link, title, price, img, location, mileage };
            }).filter(c => c.link && c.title);
          });

          console.log(`[DuPont] Found ${cards.length} rendered cards`);

          for (const card of cards) {
            if (!isSouthFlorida(card.location)) continue;

            const titleMatch = card.title.match(/(\d{4})\s+(\S+)\s+(.*)/);
            if (!titleMatch) continue;

            const listing = createListing({
              year: parseInt(titleMatch[1]),
              make: titleMatch[2],
              model: titleMatch[3].trim(),
              price: parsePrice(card.price),
              mileage: parseMileage(card.mileage),
              location: card.location,
              type: 'Exotic',
              description: card.title,
              images: card.img ? [card.img] : [],
              sourceUrl: card.link,
              sourceName: 'DuPont Registry',
              listedAt: new Date().toISOString(),
            });

            allListings.push(listing);
          }
        }

        await delay(3000);
      } catch (err) {
        console.warn(`[DuPont] Error scraping ${searchUrl}: ${err.message}`);
      }
    }

    await browser.close();

    // Deduplicate by sourceUrl
    const seen = new Set();
    const unique = allListings.filter(l => {
      if (seen.has(l.sourceUrl)) return false;
      seen.add(l.sourceUrl);
      return true;
    });

    console.log(`[DuPont] Total unique listings: ${unique.length}`);
    return unique;

  } catch (err) {
    if (browser) await browser.close().catch(() => {});
    throw err;
  }
}

if (require.main === module) {
  scrape()
    .then(listings => {
      console.log(`\n[DuPont] Scraped ${listings.length} listings`);
      listings.forEach(l => {
        console.log(`  ${l.year} ${l.make} ${l.model} - ${l.location || 'N/A'} - $${l.price}`);
      });
    })
    .catch(err => {
      console.error('[DuPont] Error:', err.message);
      process.exit(1);
    });
}

module.exports = { scrape };
