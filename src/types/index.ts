export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: ArticleCategory;
  author: Author;
  publishedAt: string;
  readingTime: number; // minutes
  tags: string[];
  source?: string;
}

export type ArticleCategory =
  | "News"
  | "Events"
  | "Spotlights"
  | "Market Trends"
  | "Buyer Guides"
  | "Reviews";

export interface Author {
  name: string;
  avatar?: string;
  bio?: string;
}

export interface Listing {
  id: string;
  slug: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  price: number;
  mileage: number;
  location: string;
  type: ListingType;
  description: string;
  images: string[];
  sourceUrl: string;
  sourceName: string;
  listedAt: string;
  color?: string;
  transmission?: string;
  engine?: string;
}

export type ListingType = "Exotic" | "Classic" | "Modified" | "Daily Driver";

export interface Event {
  id: string;
  slug: string;
  name: string;
  date: string; // ISO string
  endDate?: string;
  location: string;
  address: string;
  description: string;
  image: string;
  link: string;
  category: EventCategory;
  isPast?: boolean;
}

export type EventCategory =
  | "Car Meet"
  | "Auto Show"
  | "Track Day"
  | "Cruise"
  | "Auction"
  | "Exhibition";

export interface FilterOptions {
  makes: string[];
  priceRanges: { label: string; min: number; max: number | null }[];
  years: number[];
  types: ListingType[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}
