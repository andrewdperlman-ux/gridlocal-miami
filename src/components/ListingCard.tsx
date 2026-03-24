import Link from "next/link";
import type { Listing } from "@/types";

const typeColors: Record<string, string> = {
  Exotic: "bg-red-100 text-red-700",
  Classic: "bg-amber-100 text-amber-700",
  Modified: "bg-purple-100 text-purple-700",
  "Daily Driver": "bg-blue-100 text-blue-700",
};

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const formattedPrice = listing.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const formattedMileage = listing.mileage.toLocaleString("en-US");

  return (
    <Link href={`/listings/${listing.slug}`} className="group block">
      <article className="card h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={listing.images[0]}
            alt={`${listing.year} ${listing.make} ${listing.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {/* Badges overlay */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`badge ${typeColors[listing.type] || "bg-gray-100 text-gray-700"}`}>
              {listing.type}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="badge bg-secondary/80 text-white text-xs">
              {listing.sourceName}
            </span>
          </div>
          {/* Price overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary/90 to-transparent p-3">
            <span className="text-xl font-black text-white">{formattedPrice}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h2 className="font-bold text-secondary text-base group-hover:text-primary transition-colors mb-1">
            {listing.year} {listing.make} {listing.model}
            {listing.trim && <span className="font-normal text-muted"> {listing.trim}</span>}
          </h2>

          {listing.engine && (
            <p className="text-xs text-muted mb-3 flex items-center gap-1">
              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {listing.engine}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between text-xs text-muted border-t pt-3">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {listing.location}
            </span>
            <span>{formattedMileage} mi</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
