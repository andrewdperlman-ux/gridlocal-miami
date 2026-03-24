import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import { getListingBySlug, getListings } from "@/lib/ghost";

interface ListingPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const listings = await getListings();
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const listing = await getListingBySlug(params.slug);
  if (!listing) return { title: "Listing Not Found" };

  const title = `${listing.year} ${listing.make} ${listing.model} — ${listing.price.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}`;
  return {
    title,
    description: listing.description.slice(0, 160),
    openGraph: {
      title,
      description: listing.description.slice(0, 160),
      images: [{ url: listing.images[0], width: 800, height: 600 }],
    },
  };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const [listing, allListings] = await Promise.all([
    getListingBySlug(params.slug),
    getListings(),
  ]);

  if (!listing) notFound();

  const similar = allListings
    .filter((l) => l.id !== listing.id && l.type === listing.type)
    .slice(0, 3);

  const formattedPrice = listing.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const formattedMileage = listing.mileage.toLocaleString("en-US");

  const listedDate = new Date(listing.listedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://miami.gridlocal.io";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${listing.year} ${listing.make} ${listing.model}`,
    vehicleModelDate: String(listing.year),
    brand: { "@type": "Brand", name: listing.make },
    model: listing.model,
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    description: listing.description,
    image: listing.images,
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: listing.mileage,
      unitCode: "SMI",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-background min-h-screen">
        <div className="container-content py-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-primary">Listings</Link>
            <span>/</span>
            <span className="text-secondary">{listing.year} {listing.make} {listing.model}</span>
          </nav>

          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            {/* Left: Photos + Details */}
            <div className="lg:col-span-2">
              {/* Main image */}
              <div className="rounded-2xl overflow-hidden mb-3 aspect-[16/10]">
                <img
                  src={listing.images[0]}
                  alt={`${listing.year} ${listing.make} ${listing.model}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail gallery */}
              {listing.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mb-8">
                  {listing.images.map((img, i) => (
                    <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden">
                      <img src={img} alt={`Photo ${i + 1}`} className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer" />
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <h2 className="text-lg font-bold text-secondary mb-4">About This Vehicle</h2>
                <p className="text-secondary leading-relaxed">{listing.description}</p>
              </div>

              {/* Specs */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-secondary mb-4">Vehicle Specs</h2>
                <dl className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Year", value: listing.year },
                    { label: "Make", value: listing.make },
                    { label: "Model", value: listing.model },
                    { label: "Trim", value: listing.trim || "—" },
                    { label: "Mileage", value: `${formattedMileage} miles` },
                    { label: "Type", value: listing.type },
                    { label: "Color", value: listing.color || "—" },
                    { label: "Transmission", value: listing.transmission || "—" },
                    { label: "Engine", value: listing.engine || "—" },
                    { label: "Location", value: listing.location },
                    { label: "Listed", value: listedDate },
                    { label: "Source", value: listing.sourceName },
                  ].map(({ label, value }) => (
                    <div key={label} className="border-b border-gray-100 pb-3">
                      <dt className="text-xs font-bold text-muted uppercase mb-0.5">{label}</dt>
                      <dd className="text-sm text-secondary font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Right: Price + CTA */}
            <aside className="lg:col-span-1 mt-8 lg:mt-0">
              <div className="sticky top-24 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                {/* Price header */}
                <div className="bg-secondary text-white p-6">
                  <p className="text-sm text-gray-400 mb-1">{listing.year} {listing.make} {listing.model}</p>
                  <p className="text-3xl font-black text-accent">{formattedPrice}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="badge bg-white/20 text-white text-xs">{listing.type}</span>
                    <span className="text-xs text-gray-400">via {listing.sourceName}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-col gap-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {listing.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 1h8l2-1z" />
                      </svg>
                      {formattedMileage} miles
                    </div>
                  </div>

                  <a
                    href={listing.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center text-base"
                  >
                    View Original Listing
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>

                  <p className="text-xs text-muted text-center mt-3">
                    Listed on {listing.sourceName} · {listedDate}
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {/* Similar listings */}
          {similar.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-secondary mb-6">Similar Listings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similar.map((l) => (
                  <ListingCard key={l.id} listing={l} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
