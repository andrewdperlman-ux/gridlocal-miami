import type { Article, Listing, Event } from "@/types";
import { mockArticles, mockListings, mockEvents } from "./mock-data";

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
    featuredImage: post.feature_image || "https://picsum.photos/seed/ghost/1200/630",
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

export async function getPosts(): Promise<Article[]> {
  const api = await getGhostApi();
  if (!api) return mockArticles;
  
  try {
    const posts = await api.posts.browse({
      limit: "all",
      include: "tags,authors",
      fields: "id,slug,title,excerpt,custom_excerpt,html,feature_image,primary_tag,primary_author,published_at,reading_time,tags",
    });
    return posts.map(ghostPostToArticle);
  } catch {
    return mockArticles;
  }
}

export async function getPostBySlug(slug: string): Promise<Article | null> {
  const api = await getGhostApi();
  
  if (!api) {
    return mockArticles.find((a) => a.slug === slug) || null;
  }
  
  try {
    const post = await api.posts.read({ slug }, { include: "tags,authors" });
    return ghostPostToArticle(post);
  } catch {
    return mockArticles.find((a) => a.slug === slug) || null;
  }
}

export async function getPostsByTag(tag: string): Promise<Article[]> {
  const api = await getGhostApi();
  
  if (!api) {
    return mockArticles.filter((a) =>
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
    return mockArticles;
  }
}

// Listings — from mock data (extend with your own DB or CMS)
export async function getListings(): Promise<Listing[]> {
  return mockListings;
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  return mockListings.find((l) => l.slug === slug) || null;
}

// Events — from mock data (extend with your own DB or CMS)
export async function getEvents(): Promise<Event[]> {
  return mockEvents;
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  return mockEvents.find((e) => e.slug === slug) || null;
}
