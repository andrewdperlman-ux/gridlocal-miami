import type { Article, Listing, Event } from "@/types";

export const mockArticles: Article[] = [
  {
    id: "1",
    slug: "supercar-saturdays-miami-weekly-roundup",
    title: "Supercar Saturdays Miami: This Week's Wildest Builds",
    excerpt:
      "From a pearl-white Bugatti Chiron to a slammed Lamborghini Urus on air suspension, Supercar Saturdays at Bal Harbour delivered yet again. Here's what turned heads this weekend.",
    content: `
      <p>Every Saturday morning, the Bal Harbour parking lot transforms into one of the most exclusive open-air car shows in America. This week did not disappoint.</p>
      <h2>The Headliners</h2>
      <p>The undisputed star of the morning was a pearl-white Bugatti Chiron Sport belonging to a well-known Miami real estate developer. The quad-turbocharged W16 engine ticked and popped as it cooled under the morning sun, drawing a crowd that stretched across three rows of parking spots.</p>
      <p>Right next to it, a Lamborghini Urus on full air suspension sat slammed to the ground — so low it could barely clear a speed bump, but that wasn't the point. The deep teal wrap, custom Forgiato wheels, and full exhaust setup made it impossible to walk past without stopping.</p>
      <h2>Exotics for Days</h2>
      <p>Ferrari was well-represented this week. A 488 Pista in Rosso Fuoco arrived early, followed by a stunning SF90 Stradale in a bespoke Grigio Ferro that had photographers circling it for the better part of an hour. The owner, a local entrepreneur, confirmed it was ordered directly through the Ferrari atelier program.</p>
      <p>McLarens showed up in force: a 720S Spider, a 765LT (one of only 765 produced worldwide), and a stealthy Artura hybrid rounded out the British contingent. All three owners were decidedly younger than you'd expect for that kind of hardware.</p>
      <h2>The Sleeper of the Week</h2>
      <p>While the exotics grabbed the spotlight, the true crowd-pleaser was an immaculate 1987 Buick Grand National. Black on black, completely stock from the outside, sitting on the original wheels. The owner lifted the hood to reveal a built 3.8L turbo V6 making north of 600 horsepower. The crowd lost it.</p>
      <p>That's the magic of Supercar Saturdays — you never know what's going to show up. See you next week.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=630&fit=crop",
    category: "Events",
    author: { name: "GridLocal AI", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=gridlocal&backgroundColor=ff4500" },
    publishedAt: "2026-03-22T10:00:00Z",
    readingTime: 4,
    tags: ["supercar saturday", "exotic cars", "bal harbour", "miami"],
    source: "GridLocal Editorial",
  },
  {
    id: "2",
    slug: "wynwood-walls-car-meet-march-2026",
    title: "Wynwood Walls Car Meet Draws 300+ Cars in March's Biggest Night",
    excerpt:
      "The monthly Wynwood car meet broke records this March with over 300 vehicles ranging from built Civics to McLarens. The art district never looked better lit up by headlights.",
    content: `
      <p>Miami's arts district turned into an automotive gallery last Friday night. The monthly Wynwood car meet — unofficially organized through Instagram and word of mouth — drew its largest crowd yet with an estimated 300+ vehicles pouring into the streets around the iconic murals.</p>
      <h2>Street Culture Meets Art Culture</h2>
      <p>Wynwood has always been a place where subcultures collide, and the car meet embodied that perfectly. A slammed Acura Integra Type R sat next to a stock-looking but heavily modified Porsche 911 GT3 RS. A group of lowriders — proper hydraulics, candy paint, the full experience — parked near a fleet of Liberty Walk-kitted European exotics.</p>
      <p>The demographics were as diverse as Miami itself. Young kids on their first builds mixing with 20-year veterans of the scene. Women enthusiasts running some of the cleanest JDM cars there. Older collectors in pristine American muscle. It was exactly what a real car scene looks like.</p>
      <h2>Standout Builds</h2>
      <p>The build that generated the most buzz? A Miami-owned Nissan R34 GT-R, legally imported under the 25-year rule in 2024. Bayside Blue, right-hand drive, N1 motor — completely original. The owner said he'd been contacted by three separate parties offering over $200,000 before he even got home that night.</p>
      <p>Other notable appearances included a widebody Supra A90 on Volk TE37s, a beautifully restored 1969 Dodge Charger Daytona with the original wing, and a Tesla Plaid that kept drag racing itself on the straight stretch near NW 2nd Avenue (legally, on a closed section for the event).</p>
      <h2>The Scene is Alive</h2>
      <p>Miami's car culture often gets overshadowed by the nightlife and the beaches, but events like this prove it's one of the most vibrant automotive scenes in the country. Mark your calendars: next meet is the last Friday of April.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=1200&h=630&fit=crop",
    category: "Events",
    author: { name: "GridLocal AI", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=gridlocal&backgroundColor=ff4500" },
    publishedAt: "2026-03-20T08:30:00Z",
    readingTime: 5,
    tags: ["wynwood", "car meet", "miami", "street cars", "JDM"],
    source: "GridLocal Editorial",
  },
  {
    id: "3",
    slug: "exotic-car-spotting-brickell-miami-guide",
    title: "The Ultimate Guide to Exotic Car Spotting in Brickell",
    excerpt:
      "Brickell Avenue is ground zero for exotic car sightings in America. We mapped out the best spots, best times, and what to look for — from resident Ferraris to visiting megayacht crews in matching Rolls-Royces.",
    content: `
      <p>If you want to see more exotic cars per square mile than anywhere else in the Western Hemisphere (with the possible exception of Monaco), Brickell is your spot. Here's how to maximize your sightings.</p>
      <h2>The Golden Hours</h2>
      <p>Tuesday through Thursday between 11 AM and 2 PM is primetime. The valet stands outside Cipriani, Komodo, and the Four Seasons fill up with Ferraris, McLarens, and Bentleys as the finance crowd heads to lunch. Friday and Saturday nights after 10 PM are equally productive — the clubs and rooftop bars draw the nightlife crowd in their best machinery.</p>
      <h2>The Best Spots</h2>
      <p><strong>Brickell City Centre:</strong> The valet area here is a rotating showroom. Regulars include multiple Rolls-Royces (there are estimated to be over 400 registered in Miami-Dade), a rotating cast of Lamborghinis and Ferraris, and the occasional Pagani or Koenigsegg belonging to a visiting collector.</p>
      <p><strong>Mary Brickell Village:</strong> More relaxed, but excellent for spotting modified cars alongside the exotics. The parking garage here has become a de facto car meet on weekend afternoons.</p>
      <p><strong>Brickell Key:</strong> The residential island tucked behind Brickell houses some of Miami's wealthiest residents. The gatehouse sees a parade of Cullinans and G-Wagons morning and evening.</p>
      <h2>What to Look For</h2>
      <p>Beyond the obvious Ferraris and Lamborghinis, keep your eyes peeled for: Bugatti Veyron/Chirons (Miami has at least 12 registered), Koenigsegg Ageras and Regeras (two confirmed local owners), Pagani Huayras (one well-known local collector has three), and the occasional LaFerrari or Porsche 918.</p>
      <p>Pro tip: Follow @gridlocal_miami on Instagram for real-time sighting alerts from our network of spotters throughout the city.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=630&fit=crop",
    category: "Spotlights",
    author: { name: "GridLocal AI", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=gridlocal&backgroundColor=ff4500" },
    publishedAt: "2026-03-18T14:00:00Z",
    readingTime: 6,
    tags: ["brickell", "exotic cars", "car spotting", "ferraris", "miami guide"],
    source: "GridLocal Editorial",
  },
  {
    id: "4",
    slug: "miami-auto-show-2026-preview",
    title: "Miami Auto Show 2026: Everything You Need to Know",
    excerpt:
      "The Miami International Auto Show returns to the Miami Beach Convention Center this November. We've got the full preview — world debuts, electric supercars, and why this year's show might be the best yet.",
    content: `
      <p>The Miami International Auto Show is one of the most underrated auto shows in North America, and the 2026 edition is shaping up to be something special. Here's our comprehensive preview.</p>
      <h2>Confirmed World Debuts</h2>
      <p>Ferrari is using Miami as the launch pad for what's being described internally as a "halo hybrid" positioned above the Roma in the lineup. Sources close to the company suggest a mid-mounted V6 hybrid system producing north of 800 horsepower — Ferrari's most powerful non-track road car ever.</p>
      <p>Rimac is bringing the Nevera R, an updated version of their 1,914-horsepower electric hypercar with improved range and revised aerodynamics. Miami's climate and the show's demographic make it a natural choice for the global debut.</p>
      <h2>Electric Everything</h2>
      <p>Porsche will be showing the Macan EV in its first major Florida appearance, while Lamborghini brings the Urus SE plug-in hybrid. Even Bentley has confirmed an appearance of their Bentayga EWB Azure — long wheelbase, ultra-luxury, fully electric drivetrain.</p>
      <h2>The Miami Touch</h2>
      <p>What makes the Miami show unique is its attendees. Unlike Detroit (industry insiders) or LA (media-heavy), Miami draws genuine buyers. The man standing next to you looking at that Rolls-Royce Spectre is quite possibly about to write a check for one. It gives the show an energy unlike any other.</p>
      <p>The show runs November 7-16 at the Miami Beach Convention Center. Tickets go on sale September 1.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=630&fit=crop",
    category: "News",
    author: { name: "GridLocal AI", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=gridlocal&backgroundColor=ff4500" },
    publishedAt: "2026-03-15T09:00:00Z",
    readingTime: 5,
    tags: ["auto show", "miami", "2026", "ferrari", "electric cars"],
    source: "GridLocal Editorial",
  },
  {
    id: "5",
    slug: "miami-exotic-car-market-2026-trends",
    title: "Miami's Exotic Car Market in 2026: Prices Are Moving — Here's Where",
    excerpt:
      "Miami remains one of the hottest markets for exotic and collectible cars in the U.S. We analyzed six months of sales data to identify which makes are appreciating, which are cooling, and what the smart money is buying right now.",
    content: `
      <p>Miami has always been a bellwether for the exotic car market. When global wealth concentrates here — whether for business, pleasure, or relocation — it shows up in the car market first. Here's what the data is telling us for 2026.</p>
      <h2>What's Appreciating</h2>
      <p>Pre-2000 Ferraris continue their relentless march upward. A clean F355 Spider that sold for $85,000 in Miami in early 2024 recently changed hands for $127,000. F40s and F50s are simply out of reach for most collectors now, with local sales touching $3.2M and $8.5M respectively in the past 12 months.</p>
      <p>Manual transmission cars across all brands are commanding a 15-25% premium over automatic equivalents, a trend that's accelerated as EVs become more common. The last manual Porsche 911 GT3 delivered to a Miami buyer sold for $50,000 over sticker within a week of registration.</p>
      <h2>What's Cooling</h2>
      <p>First-generation Lamborghini Uruses have come back to earth. Cars that were trading at 20-30% over MSRP during the 2021-2023 frenzy are now available at or slightly below dealer invoice. For buyers, this represents excellent value — the Urus is a genuinely spectacular vehicle and the early cars are the ones to have before the inevitable refresh.</p>
      <h2>The Smart Money</h2>
      <p>Our sources tell us the smart collectors are currently focused on: early McLaren P1s (sub-$1.5M and climbing), Porsche Carrera GTs (the manual V10 hypercar is undervalued relative to its competition), and early 2000s Honda NSXes in original condition.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&h=630&fit=crop",
    category: "Market Trends",
    author: { name: "GridLocal AI", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=gridlocal&backgroundColor=ff4500" },
    publishedAt: "2026-03-12T11:00:00Z",
    readingTime: 7,
    tags: ["market trends", "exotic cars", "investment", "ferrari", "porsche"],
    source: "GridLocal Editorial",
  },
  {
    id: "6",
    slug: "buying-first-exotic-car-miami-guide",
    title: "Buying Your First Exotic Car in Miami: The Complete Buyer's Guide",
    excerpt:
      "Miami is one of the best places in the world to buy an exotic car — and one of the easiest places to get burned. Our comprehensive guide covers everything from pre-purchase inspections to the best dealers and private sellers in South Florida.",
    content: `
      <p>Buying your first exotic car is one of life's great thrills — and potential nightmares. Miami's combination of sun, salt air, and fast money creates a unique market with specific risks and rewards. Here's how to navigate it.</p>
      <h2>Step 1: Set a Real Budget</h2>
      <p>The purchase price is just the beginning. Factor in: insurance (a 488 GTB in Miami can cost $8,000-15,000/year), maintenance (Ferrari factory service schedules are expensive), storage (climate-controlled in Miami is a must), and the inevitable cost of ownership surprises. A good rule of thumb: budget 20-30% of the car's purchase price annually for carrying costs.</p>
      <h2>Step 2: Choose Your Car Wisely</h2>
      <p>For first-time exotic buyers in Miami, we consistently recommend: the Porsche 911 Carrera S (bulletproof reliability, amazing driving experience, excellent dealer support), the Ferrari California T or Portofino (the most approachable Ferrari, excellent for daily driving in Miami traffic), or the McLaren 570S (genuinely exotic performance at a relatively accessible price point now that depreciation has leveled).</p>
      <h2>Step 3: Pre-Purchase Inspection is Non-Negotiable</h2>
      <p>Miami's weather is brutal on cars. Flood damage, salt corrosion, and deferred maintenance from owners who only care how a car looks (not how it runs) are real risks. Never skip a PPI. For Ferraris, use a Ferrari-authorized independent shop. For Porsches, Sunset Motorsports and GT3 Touring in South Florida are well-regarded.</p>
      <h2>Where to Buy</h2>
      <p>Dealer recommendations: Braman Motorcars (authorized Ferrari/McLaren/Bentley/Rolls-Royce, excellent certified pre-owned inventory), Prestige Imports (Lamborghini/Aston Martin, excellent service reputation), and Warren Henry (Aston Martin, McLaren).</p>
      <p>For private sales, Barrett-Jackson's Palm Beach auction in April and the various Broad Arrow events in South Florida offer curated inventory with known provenance.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&h=630&fit=crop",
    category: "Buyer Guides",
    author: { name: "GridLocal AI", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=gridlocal&backgroundColor=ff4500" },
    publishedAt: "2026-03-08T13:00:00Z",
    readingTime: 9,
    tags: ["buyer guide", "exotic cars", "first time buyer", "miami", "porsche", "ferrari"],
    source: "GridLocal Editorial",
  },
];

export const mockListings: Listing[] = [
  {
    id: "1",
    slug: "2019-lamborghini-huracan-evo-miami",
    year: 2019,
    make: "Lamborghini",
    model: "Huracán EVO",
    trim: "Spyder",
    price: 285000,
    mileage: 7800,
    location: "Brickell, Miami FL",
    type: "Exotic",
    description:
      "Stunning example of the naturally aspirated V10 masterpiece. Arancio Borealis (pearl orange) exterior over black Alcantara interior. Full PPF, ceramic coating, titanium Akrapovic exhaust. 1 owner, always stored in climate-controlled garage. Never tracked. Full Lamborghini service history at Prestige Imports Miami.",
    images: [
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&h=600&fit=crop",
    ],
    sourceUrl: "#",
    sourceName: "PrivateSeller",
    listedAt: "2026-03-20T00:00:00Z",
    color: "Arancio Borealis",
    transmission: "7-Speed DCT",
    engine: "5.2L V10 640hp",
  },
  {
    id: "2",
    slug: "1967-ford-mustang-fastback-miami",
    year: 1967,
    make: "Ford",
    model: "Mustang",
    trim: "Fastback",
    price: 89500,
    mileage: 62000,
    location: "Coral Gables, Miami FL",
    type: "Classic",
    description:
      "Frame-off restoration completed 2022. Wimbledon White with Parchment interior. Matching numbers 390 FE big block V8. 4-speed toploader manual. Concours-level restoration with correct date-coded parts throughout. Show winner — took Best of Show at Palm Beach Concours 2024.",
    images: [
      "https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1547744152-14d985cb937f?w=800&h=600&fit=crop",
    ],
    sourceUrl: "#",
    sourceName: "Barrett-Jackson",
    listedAt: "2026-03-18T00:00:00Z",
    color: "Wimbledon White",
    transmission: "4-Speed Manual",
    engine: "390 FE V8",
  },
  {
    id: "3",
    slug: "2021-porsche-911-gt3-miami",
    year: 2021,
    make: "Porsche",
    model: "911 GT3",
    trim: "991.2",
    price: 198000,
    mileage: 3200,
    location: "Coconut Grove, Miami FL",
    type: "Exotic",
    description:
      "One of the last great naturally aspirated manual sports cars. Guards Red with black leather sport seats. 6-speed manual transmission (the one to have). Clubsport package with roll cage, fire extinguisher, and harness bar. Sport Chrono, PCCB ceramic brakes. Absolutely immaculate.",
    images: [
      "https://images.unsplash.com/photo-1611651338502-8e89136a3591?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611651338502-8e89136a3591?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611651338502-8e89136a3591?w=800&h=600&fit=crop",
    ],
    sourceUrl: "#",
    sourceName: "Braman Motorcars",
    listedAt: "2026-03-17T00:00:00Z",
    color: "Guards Red",
    transmission: "6-Speed Manual",
    engine: "4.0L Flat-6 503hp",
  },
  {
    id: "4",
    slug: "2018-honda-civic-type-r-modified-miami",
    year: 2018,
    make: "Honda",
    model: "Civic Type R",
    trim: "FK8",
    price: 42500,
    mileage: 28500,
    location: "Hialeah, Miami FL",
    type: "Modified",
    description:
      "Championship White FK8 with extensive tasteful modifications. Hondata FlashPro tune, Tein coilovers, Enkei RPF1 wheels, Injen intake, GReddy exhaust. Stock engine internals — all power mods are bolt-on, nothing forced. Street legal, daily driven. Clean title, no accidents.",
    images: [
      "https://images.unsplash.com/photo-1606611013016-969c19ba27b5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606611013016-969c19ba27b5?w=800&h=600&fit=crop",
    ],
    sourceUrl: "#",
    sourceName: "Cars & Bids",
    listedAt: "2026-03-16T00:00:00Z",
    color: "Championship White",
    transmission: "6-Speed Manual",
    engine: "2.0L Turbo 306hp (stock)",
  },
  {
    id: "5",
    slug: "2020-ferrari-sf90-stradale-miami",
    year: 2020,
    make: "Ferrari",
    model: "SF90 Stradale",
    price: 625000,
    mileage: 1900,
    location: "South Beach, Miami FL",
    type: "Exotic",
    description:
      "Ferrari's first series-production PHEV hypercar. Commissioned through the Ferrari atelier program in a unique bespoke Grigio Ferro with yellow racing stripe. Assetto Fiorano package with Multimatic shock absorbers, pyrolytic carbon fiber seats, and Michelin Pilot Sport Cup 2R tires. Under 2,000 miles. Extraordinary.",
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
    ],
    sourceUrl: "#",
    sourceName: "Braman Motorcars",
    listedAt: "2026-03-14T00:00:00Z",
    color: "Grigio Ferro (Bespoke)",
    transmission: "8-Speed DCT",
    engine: "4.0L Twin-Turbo V8 + 3 Electric Motors = 986hp",
  },
  {
    id: "6",
    slug: "1970-chevrolet-chevelle-ss454-miami",
    year: 1970,
    make: "Chevrolet",
    model: "Chevelle",
    trim: "SS 454",
    price: 145000,
    mileage: 78000,
    location: "Aventura, Miami FL",
    type: "Classic",
    description:
      "The pinnacle of American muscle. Fathom Green over black vinyl bench seat. LS6 454 cubic inch V8 — the most powerful engine available to the public from any American manufacturer in 1970. Numbers matching. M21 4-speed close-ratio manual. Marti Report and build sheet included. A true investment-grade collector car.",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
    ],
    sourceUrl: "#",
    sourceName: "Mecum Auctions",
    listedAt: "2026-03-12T00:00:00Z",
    color: "Fathom Green",
    transmission: "4-Speed Manual",
    engine: "454 LS6 V8 450hp",
  },
  {
    id: "7",
    slug: "2022-toyota-supra-gr-widebody-miami",
    year: 2022,
    make: "Toyota",
    model: "GR Supra",
    trim: "3.0 Premium",
    price: 68000,
    mileage: 12400,
    location: "Doral, Miami FL",
    type: "Modified",
    description:
      "Full TRA Kyoto Rocket Bunny widebody kit, professionally installed with matching paint. JB4 tune, downpipe, and charge pipe for approximately 450whp. KW V3 coilovers. Volk Racing TE37 Ultra 19-inch wheels. Recaro bucket seats. Daily driveable but properly fast. One of the cleanest Supras in South Florida.",
    images: [
      "https://images.unsplash.com/photo-1632245889029-e406faaa34cd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1632245889029-e406faaa34cd?w=800&h=600&fit=crop",
    ],
    sourceUrl: "#",
    sourceName: "Cars & Bids",
    listedAt: "2026-03-10T00:00:00Z",
    color: "Matte Black",
    transmission: "8-Speed Auto",
    engine: "3.0L Turbo I6 ~450whp",
  },
  {
    id: "8",
    slug: "2023-mercedes-amg-c63-miami",
    year: 2023,
    make: "Mercedes-AMG",
    model: "C 63 S E Performance",
    price: 118000,
    mileage: 4200,
    location: "Brickell, Miami FL",
    type: "Daily Driver",
    description:
      "The controversial but spectacular new C63 — a 671-horsepower hybrid sedan that's genuinely faster than the old V8 car. Obsidian Black with AMG Performance seats in Nappa leather. Burmester sound system, Energizing Comfort package, AMG Night package. This is the perfect Miami daily driver: fast, luxurious, and just exotic enough to turn heads at the valet.",
    images: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop",
    ],
    sourceUrl: "#",
    sourceName: "Mercedes-Benz of Coral Gables",
    listedAt: "2026-03-08T00:00:00Z",
    color: "Obsidian Black",
    transmission: "9-Speed MCT",
    engine: "2.0L Turbo + Electric = 671hp",
  },
];

export const mockEvents: Event[] = [
  {
    id: "1",
    slug: "supercar-saturday-bal-harbour-april-2026",
    name: "Supercar Saturday — Bal Harbour",
    date: "2026-04-05T07:00:00Z",
    endDate: "2026-04-05T11:00:00Z",
    location: "Bal Harbour Shops",
    address: "9700 Collins Ave, Bal Harbour, FL 33154",
    description:
      "The weekly Supercar Saturday gathering at Bal Harbour Shops — South Florida's premier weekend car meet. Free to attend, all makes and models welcome. Exotic, classic, and modified cars fill the parking lot every Saturday morning. Arrive early for the best spots.",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=500&fit=crop",
    link: "#",
    category: "Car Meet",
  },
  {
    id: "2",
    slug: "wynwood-car-meet-april-2026",
    name: "Wynwood Monthly Car Meet — April",
    date: "2026-04-25T20:00:00Z",
    endDate: "2026-04-26T00:00:00Z",
    location: "Wynwood Arts District",
    address: "NW 2nd Ave & NW 24th St, Miami, FL 33127",
    description:
      "The biggest monthly car meet in Miami. All cars welcome, from daily drivers to supercars. The Wynwood murals provide an unbeatable backdrop. Food trucks, DJ, and of course, incredible cars. Last meet drew over 300 vehicles.",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&h=500&fit=crop",
    link: "#",
    category: "Car Meet",
  },
  {
    id: "3",
    slug: "palm-beach-concours-delegance-2026",
    name: "Cavallino Classic Palm Beach",
    date: "2026-04-18T09:00:00Z",
    endDate: "2026-04-20T17:00:00Z",
    location: "The Breakers Palm Beach",
    address: "One South County Rd, Palm Beach, FL 33480",
    description:
      "The world's most prestigious Ferrari concours. Held annually on the manicured lawns of The Breakers, the Cavallino Classic draws Ferrari collectors and enthusiasts from around the world. Features a concours competition, Ferrari market, and intimate dinners with factory representatives.",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=500&fit=crop",
    link: "#",
    category: "Exhibition",
  },
  {
    id: "4",
    slug: "miami-track-day-homestead-speedway",
    name: "Track Day at Homestead-Miami Speedway",
    date: "2026-05-10T08:00:00Z",
    endDate: "2026-05-10T17:00:00Z",
    location: "Homestead-Miami Speedway",
    address: "1 Speedway Blvd, Homestead, FL 33035",
    description:
      "Open track day at Homestead-Miami Speedway organized by Miami Track Day Club. All skill levels welcome. HPDE instruction available for beginners. Tech inspection required. Run groups from novice to advanced. Brings your helmet and your fastest car — or rent from our fleet.",
    image: "https://images.unsplash.com/photo-1541348263662-e068662d82af?w=800&h=500&fit=crop",
    link: "#",
    category: "Track Day",
  },
];
