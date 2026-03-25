# GridLocal Miami Cars - Listing Scrapers

Scrapes car listings from multiple sources and combines them with existing Craigslist data.

## Sources

| Source | Method | Notes |
|--------|--------|-------|
| Craigslist | Existing data | Preserved from listings.json |
| Bring a Trailer | RSS feed + page scraping | Active auctions, nationwide |
| DuPont Registry | Playwright + __NEXT_DATA__ | Luxury/exotic, WAF protected |
| Hemmings | Playwright + API interception | Classic/collector, Cloudflare protected |

## Usage

### Run all scrapers (recommended)
```bash
node update-listings.js
```

### Run individual scrapers
```bash
node scrape-bat.js       # Bring a Trailer
node scrape-dupont.js    # DuPont Registry
node scrape-hemmings.js  # Hemmings
```

## Requirements

- Node.js 18+
- Chromium (for Playwright-based scrapers)
- `npm install` to install dependencies

## Notes

- DuPont Registry and Hemmings use WAF/Cloudflare protection, so they require Playwright (headless browser)
- BaT uses a public RSS feed, which is fast and reliable
- Rate limiting is built in (1.5-2s delays between requests)
- Each scraper handles errors gracefully; if one fails, others still work
