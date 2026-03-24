import type { MetadataRoute } from "next";
import { getPosts, getListings, getEvents } from "@/lib/ghost";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://miami.gridlocal.io";

  const [posts, listings, events] = await Promise.all([
    getPosts(),
    getListings(),
    getEvents(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${siteUrl}/articles`, lastModified: new Date(), priority: 0.9 },
    { url: `${siteUrl}/listings`, lastModified: new Date(), priority: 0.9 },
    { url: `${siteUrl}/events`, lastModified: new Date(), priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: new Date(), priority: 0.5 },
  ];

  const articlePages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/articles/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    priority: 0.8,
  }));

  const listingPages: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `${siteUrl}/listings/${listing.slug}`,
    lastModified: new Date(listing.listedAt),
    priority: 0.7,
  }));

  const eventPages: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${siteUrl}/events/${event.slug}`,
    lastModified: new Date(event.date),
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages, ...listingPages, ...eventPages];
}
