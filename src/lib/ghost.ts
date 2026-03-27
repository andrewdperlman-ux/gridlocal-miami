import type { Article, Listing, Event } from "@/types";
import { mockArticles, mockListings as fallbackListings, mockEvents } from "./mock-data";

// Load data files if they exist
let dataArticles: Article[] | null = null;
let dataListings: Listing[] | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  dataArticles = require("@/data/articles.json") as Article[];
} catch { dataArticles = null; }

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  dataListings = require("@/data/listings.json") as Listing[];
} catch { dataListings = null; }

// Ghost Content API integration
// Falls back to mock data when GHOST_URL/KEY are not configured
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ghostApi: any = null;

async function getGhostApi() {
  if (ghostApi) return ghostApi;
  
  const url = process.env.GHOST_URL;
  const key = process.env.GHOST_CONTENT_API_KEY;
  
  if (!url || !key || url === "https://your-ghost-instance.ghost.io") {
    return null;
  }
  
  try {
    const GhostContentAPI = (await import("@tryghost/content-api")).default;
    ghostApi = new GhostContentAPI({ url, key, version: "v5.0" });
    return ghostApi;
  } catch {
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ghostPostToArticle(post: any): Article {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || post.custom_excerpt || "",
    content: post.html || "",
    featuredImage: post.feature_image || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=630&fit=crop",
    category: (post.primary_tag?.name as Article["category"]) || "News",
    author: {
      name: post.primary_author?.name || "GridLocal AI",
      avatar: post.primary_author?.profile_image,
      bio: post.primary_author?.bio,
    },
    publishedAt: post.published_at,
    readingTime: post.reading_time || 3,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tags: post.tags?.map((t: any) => t.name) || [],
    source: "GridLocal via Ghost",
  };
}

function sortByDate(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPosts(): Promise<Article[]> {
  const allArticles = dataArticles && dataArticles.length > 0 ? dataArticles : mockArticles;
  const api = await getGhostApi();
  if (!api) return sortByDate(allArticles);
  
  try {
    const posts = await api.posts.browse({
      limit: "all",
      include: "tags,authors",
      fields: "id,slug,title,excerpt,custom_excerpt,html,feature_image,primary_tag,primary_author,published_at,reading_time,tags",
    });
    return posts.map(ghostPostToArticle);
  } catch {
    return allArticles;
  }
}

export async function getPostBySlug(slug: string): Promise<Article | null> {
  const allArticles = dataArticles && dataArticles.length > 0 ? dataArticles : mockArticles;
  const api = await getGhostApi();
  
  if (!api) {
    return allArticles.find((a) => a.slug === slug) || null;
  }
  
  try {
    const post = await api.posts.read({ slug }, { include: "tags,authors" });
    return ghostPostToArticle(post);
  } catch {
    return allArticles.find((a) => a.slug === slug) || null;
  }
}

export async function getPostsByTag(tag: string): Promise<Article[]> {
  const allArticles = dataArticles && dataArticles.length > 0 ? dataArticles : mockArticles;
  const api = await getGhostApi();
  
  if (!api) {
    return allArticles.filter((a) =>
      a.tags.some((t) => t.toLowerCase() === tag.toLowerCase()) ||
      a.category.toLowerCase() === tag.toLowerCase()
    );
  }
  
  try {
    const posts = await api.posts.browse({
      filter: `tag:${tag}`,
      include: "tags,authors",
    });
    return posts.map(ghostPostToArticle);
  } catch {
    return allArticles;
  }
}

// Listings — from data file or fallback mock data
const allListings = dataListings && dataListings.length > 0 ? dataListings : fallbackListings;

export async function getListings(): Promise<Listing[]> {
  return allListings;
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  return allListings.find((l) => l.slug === slug) || null;
}

// Events — from mock data (extend with your own DB or CMS)
export async function getEvents(): Promise<Event[]> {
  return mockEvents;
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  return mockEvents.find((e) => e.slug === slug) || null;
}
