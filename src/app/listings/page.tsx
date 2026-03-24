import type { Metadata } from "next";
import { Suspense } from "react";
import ListingCard from "@/components/ListingCard";
import { getListings } from "@/lib/ghost";
import type { ListingType } from "@/types";

export const metadata: Metadata = {
  title: "Car Listings",
  description: "Browse exotic, classic, modified, and daily driver cars for sale in Miami, FL. Updated daily by GridLocal AI.",
};

const LISTING_TYPES: ListingType[] = ["Exotic", "Classic", "Modified", "Daily Driver"];
const PRICE_RANGES = [
  { label: "Under $50k", min: 0, max: 50000 },
  { label: "$50k – $100k", min: 50000, max: 100000 },
  { label: "$100k – $250k", min: 100000, max: 250000 },
  { label: "$250k+", min: 250000, max: null },
];

interface ListingsPageProps {
  searchParams: {
    make?: string;
    type?: string;
    price?: string;
    sort?: string;
    year?: string;
  };
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const listings = await getListings();

  // Filter
  let filtered = listings;
  if (searchParams.make) {
    filtered = filtered.filter((l) => l.make.toLowerCase() === searchParams.make!.toLowerCase());
  }
  if (searchParams.type) {
    filtered = filtered.filter((l) => l.type === searchParams.type);
  }
  if (searchParams.price) {
    const range = PRICE_RANGES.find((r) => r.label === searchParams.price);
    if (range) {
      filtered = filtered.filter(
        (l) => l.price >= range.min && (range.max === null || l.price <= range.max)
      );
    }
  }

  // Sort
  if (searchParams.sort === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (searchParams.sort === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (searchParams.sort === "year-desc") {
    filtered = [...filtered].sort((a, b) => b.year - a.year);
  } else {
    // Default: newest listed
    filtered = [...filtered].sort(
      (a, b) => new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime()
    );
  }

  const makes = Array.from(new Set(listings.map((l) => l.make))).sort();

  return (
    <div className="bg-background min-h-screen">
      {/* Page header */}
      <div className="bg-secondary text-white py-12">
        <div className="container-content">
          <h1 className="text-3xl sm:text-4xl font-black mb-2">Car Listings</h1>
          <p className="text-gray-300">
            Exotic, classic, and interesting cars for sale in Miami — aggregated daily
          </p>
        </div>
      </div>

      <div className="container-content py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-8">
          <form className="flex flex-wrap gap-3 items-end">
            {/* Make */}
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs font-bold text-muted uppercase mb-1.5">Make</label>
              <select
                name="make"
                defaultValue={searchParams.make || ""}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              >
                <option value="">All Makes</option>
                {makes.map((make) => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs font-bold text-muted uppercase mb-1.5">Type</label>
              <select
                name="type"
                defaultValue={searchParams.type || ""}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              >
                <option value="">All Types</option>
                {LISTING_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs font-bold text-muted uppercase mb-1.5">Price Range</label>
              <select
                name="price"
                defaultValue={searchParams.price || ""}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              >
                <option value="">Any Price</option>
                {PRICE_RANGES.map((r) => (
                  <option key={r.label} value={r.label}>{r.label}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs font-bold text-muted uppercase mb-1.5">Sort By</label>
              <select
                name="sort"
                defaultValue={searchParams.sort || ""}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              >
                <option value="">Newest Listed</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year-desc">Year: Newest First</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn-primary text-sm px-5 py-2"
            >
              Filter
            </button>
          </form>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted mb-6">
          {filtered.length} listing{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🚗</div>
            <h2 className="text-xl font-bold text-secondary mb-2">No listings match your filters</h2>
            <p className="text-muted">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
