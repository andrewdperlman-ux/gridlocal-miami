#!/usr/bin/env node
/**
 * Master Listings Updater
 * Runs all scrapers, combines with existing Craigslist data, deduplicates,
 * and writes the combined result to listings.json
 */

const fs = require('fs');
const path = require('path');
const { isSouthFlorida, isAllowedListing } = require('./utils');

const LISTINGS_PATH = path.join(__dirname, '..', 'site', 'src', 'data', 'listings.json');

async function loadExistingCraigslistListings() {
  try {
    const data = JSON.parse(fs.readFileSync(LISTINGS_PATH, 'utf8'));
    const craigslist = data.filter(l => l.sourceName === 'Craigslist');
    console.log(`[Master] Loaded ${craigslist.length} existing Craigslist listings`);
    return craigslist;
  } catch (err) {
    console.warn(`[Master] Could not load existing listings: ${err.message}`);
    return [];
  }
}

async function runScraper(name, scraperFn) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`[Master] Running ${name} scraper...`);
  console.log('='.repeat(60));
  try {
    const listings = await scraperFn();
    console.log(`[Master] ${name} returned ${listings.length} listings`);
    return listings;
  } catch (err) {
    console.error(`[Master] ${name} scraper FAILED: ${err.message}`);
    return [];
  }
}

function deduplicateListings(listings) {
  const seen = new Map();

  for (const listing of listings) {
    // Use sourceUrl as primary dedup key
    const key = listing.sourceUrl || `${listing.year}-${listing.make}-${listing.model}-${listing.price}`;

    if (!seen.has(key)) {
      seen.set(key, listing);
    }
  }

  return Array.from(seen.values());
}

async function main() {
  console.log('[Master] Starting listings update...');
  console.log(`[Master] Output: ${LISTINGS_PATH}\n`);

  const allListings = [];

  // 1. Load existing Craigslist listings
  const craigslistListings = await loadExistingCraigslistListings();
  allListings.push(...craigslistListings);

  // 2. Run BaT scraper
  try {
    const batModule = require('./scrape-bat');
    const batListings = await runScraper('Bring a Trailer', batModule.scrape);
    // For BaT, we include all listings (nationwide auction site, people browse all)
    allListings.push(...batListings);
  } catch (err) {
    console.error(`[Master] Could not load BaT scraper: ${err.message}`);
  }

  // 3. DuPont Registry — disabled (WAF blocks images, low yield)
  // To re-enable: uncomment and fix image scraping
  // try {
  //   const dupontModule = require('./scrape-dupont');
  //   const dupontListings = await runScraper('DuPont Registry', dupontModule.scrape);
  //   allListings.push(...dupontListings);
  // } catch (err) {
  //   console.error(`[Master] Could not load DuPont scraper: ${err.message}`);
  // }

  // 4. Run Hemmings scraper
  try {
    const hemmingsModule = require('./scrape-hemmings');
    const hemmingsListings = await runScraper('Hemmings', hemmingsModule.scrape);
    allListings.push(...hemmingsListings);
  } catch (err) {
    console.error(`[Master] Could not load Hemmings scraper: ${err.message}`);
  }

  // 5. Filter to exotic/high-end makes only
  const filtered = allListings.filter(l => isAllowedListing(l.make, l.model));
  console.log(`\n[Master] Filtered to exotic/high-end: ${filtered.length} of ${allListings.length} listings`);

  // 6. Deduplicate
  const deduplicated = deduplicateListings(filtered);

  // 6. Sort by listedAt (newest first)
  deduplicated.sort((a, b) => {
    const dateA = new Date(a.listedAt || 0);
    const dateB = new Date(b.listedAt || 0);
    return dateB - dateA;
  });

  // 7. Summary
  const sources = {};
  for (const l of deduplicated) {
    sources[l.sourceName] = (sources[l.sourceName] || 0) + 1;
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('[Master] SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total listings: ${deduplicated.length}`);
  for (const [source, count] of Object.entries(sources).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${source}: ${count}`);
  }

  const floridaCount = deduplicated.filter(l => isSouthFlorida(l.location)).length;
  console.log(`  South Florida: ${floridaCount}`);

  // 8. Write output
  fs.writeFileSync(LISTINGS_PATH, JSON.stringify(deduplicated, null, 2));
  console.log(`\n[Master] Wrote ${deduplicated.length} listings to ${LISTINGS_PATH}`);
}

main().catch(err => {
  console.error('[Master] Fatal error:', err);
  process.exit(1);
});
