const crypto = require('crypto');

function generateSlug(year, make, model, trim, id) {
  const parts = [year, make, model, trim].filter(Boolean).map(p =>
    String(p).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  );
  // Add short hash of id to ensure uniqueness
  const hash = crypto.createHash('md5').update(String(id)).digest('hex').slice(0, 6);
  return [...parts, hash].join('-');
}

function generateId(sourceUrl) {
  return crypto.createHash('md5').update(sourceUrl).digest('hex').slice(0, 12);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const cleaned = String(priceStr).replace(/[^0-9.]/g, '');
  return parseInt(cleaned) || 0;
}

function parseMileage(mileageStr) {
  if (!mileageStr) return 0;
  const cleaned = String(mileageStr).replace(/[^0-9]/g, '');
  return parseInt(cleaned) || 0;
}

function parseYearMakeModel(title) {
  // Try to extract year, make, model from a title string
  // Common patterns: "2024 Ferrari Purosangue", "1967 Ford Mustang GT", etc.
  const match = title.match(/(\d{4})\s+(\S+)\s+(.*)/);
  if (match) {
    return {
      year: parseInt(match[1]),
      make: match[2],
      model: match[3].trim()
    };
  }
  return { year: 0, make: '', model: title };
}

function isFlorida(locationStr) {
  if (!locationStr) return false;
  const loc = locationStr.toLowerCase().trim();
  // Exact match for state code
  if (loc === 'fl') return true;
  const keywords = [
    'miami', 'fort lauderdale', 'ft lauderdale', 'west palm beach',
    'palm beach', 'boca raton', 'hollywood, fl', 'coral gables',
    'doral', 'hialeah', 'pompano', 'aventura', 'south florida',
    'broward', 'dade', 'miami-dade', 'delray beach', 'boynton beach',
    'jupiter', 'stuart', 'homestead', 'key biscayne', 'coconut grove',
    'sunny isles', 'surfside', 'bal harbour', 'north miami',
    'florida', ' fl ', ',fl', ', fl', 'tampa', 'orlando', 'naples',
    'jacksonville', 'sarasota', 'st petersburg', 'clearwater',
    'apopka', 'ocala', 'daytona', 'key west', 'fort myers',
  ];
  return keywords.some(kw => loc.includes(kw));
}

function isSouthFlorida(locationStr) {
  if (!locationStr) return false;
  const loc = locationStr.toLowerCase().trim();
  const keywords = [
    'miami', 'fort lauderdale', 'ft lauderdale', 'west palm beach',
    'palm beach', 'boca raton', 'hollywood, fl', 'coral gables',
    'doral', 'hialeah', 'pompano', 'aventura', 'south florida',
    'broward', 'dade', 'miami-dade', 'delray beach', 'boynton beach',
    'jupiter', 'stuart', 'homestead', 'key biscayne', 'coconut grove',
    'sunny isles', 'surfside', 'bal harbour', 'north miami',
  ];
  return keywords.some(kw => loc.includes(kw));
}

function createListing({ id, year, make, model, trim, price, mileage, location, type, description, images, sourceUrl, sourceName, listedAt, color, transmission, engine }) {
  const listingId = id || generateId(sourceUrl);
  return {
    id: listingId,
    slug: generateSlug(year, make, model, trim, listingId),
    year: year || 0,
    make: make || '',
    model: model || '',
    trim: trim || '',
    price: price || 0,
    mileage: mileage || 0,
    location: location || '',
    type: type || '',
    description: description || '',
    images: images || [],
    sourceUrl: sourceUrl || '',
    sourceName: sourceName || '',
    listedAt: listedAt || new Date().toISOString(),
    color: color || '',
    transmission: transmission || '',
    engine: engine || ''
  };
}

// Allowed makes — Miami exotic/high-end only
const ALLOWED_MAKES = [
  'ferrari', 'lamborghini', 'pagani', 'bugatti', 'mclaren',
  'bmw',        // filtered to M series in isAllowedListing()
  'mercedes',   // filtered to AMG in isAllowedListing()
  'mercedes-benz',
  'audi',       // filtered to RS series in isAllowedListing()
  'porsche', 'rolls-royce', 'rolls royce', 'bentley', 'aston martin',
  'koenigsegg', 'rimac', 'lotus', 'maserati',
];

function isAllowedListing(make, model) {
  if (!make) return false;
  const m = make.toLowerCase().trim();
  const mod = (model || '').toLowerCase().trim();

  // BMW — only M series (M2, M3, M4, M5, M8, X5M, X6M, etc.)
  if (m === 'bmw') {
    return /\bm\d/i.test(mod) || /\bx\d+\s*m/i.test(mod) || mod.startsWith('m');
  }

  // Mercedes — only AMG
  if (m === 'mercedes' || m === 'mercedes-benz') {
    return /amg/i.test(mod);
  }

  // Audi — only RS series
  if (m === 'audi') {
    return /\brs\s*\d/i.test(mod);
  }

  // All other allowed makes pass through
  return ALLOWED_MAKES.includes(m);
}

module.exports = { generateSlug, generateId, delay, parsePrice, parseMileage, parseYearMakeModel, isFlorida, isSouthFlorida, createListing, isAllowedListing, ALLOWED_MAKES };
