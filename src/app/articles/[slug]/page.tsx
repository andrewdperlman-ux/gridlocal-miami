import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getPostBySlug, getPosts } from "@/lib/ghost";

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getPostBySlug(params.slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.featuredImage, width: 1200, height: 630 }],
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const [article, allArticles] = await Promise.all([
    getPostBySlug(params.slug),
    getPosts(),
  ]);

  if (!article) notFound();

  const related = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://miami.gridlocal.io";
  const articleUrl = `${siteUrl}/articles/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage,
    author: { "@type": "Person", name: article.author.name },
    publisher: {
      "@type": "Organization",
      name: "GridLocal Miami Cars",
      url: siteUrl,
    },
    datePublished: article.publishedAt,
    url: articleUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-background min-h-screen">
        {/* Hero image */}
        <div className="relative h-64 sm:h-96 overflow-hidden">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 container-content">
            <Link
              href={`/articles?category=${encodeURIComponent(article.category)}`}
              className="badge bg-primary text-white mb-3 inline-block"
            >
              {article.category}
            </Link>
          </div>
        </div>

        <div className="container-content py-10">
          <div className="max-w-4xl mx-auto">
            <div className="lg:grid lg:grid-cols-3 lg:gap-10">
              {/* Main content */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl sm:text-4xl font-black text-secondary mb-4 leading-tight">
                  {article.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-6 pb-6 border-b">
                  <div className="flex items-center gap-2">
                    {article.author.avatar && (
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span className="font-medium text-secondary">{article.author.name}</span>
                  </div>
                  <span>{formattedDate}</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {article.readingTime} min read
                  </span>
                </div>

                {/* Excerpt */}
                <p className="text-lg text-muted italic mb-8 leading-relaxed border-l-4 border-primary pl-4">
                  {article.excerpt}
                </p>

                {/* Body */}
                <div
                  className="ghost-content prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Source */}
                {article.source && (
                  <div className="mt-8 pt-6 border-t text-sm text-muted">
                    <strong>Source:</strong> {article.source}
                  </div>
                )}

                {/* Tags */}
                {article.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="badge bg-gray-100 text-gray-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Social share */}
                <div className="mt-8 pt-6 border-t">
                  <p className="text-sm font-bold text-secondary mb-3">Share this article</p>
                  <div className="flex gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="badge bg-black text-white hover:bg-gray-800 transition-colors"
                    >
                      Share on X
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="badge bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      Share on Facebook
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(articleUrl)}&title=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="badge bg-blue-800 text-white hover:bg-blue-900 transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1 mt-10 lg:mt-0">
                <div className="sticky top-24">
                  <h3 className="text-lg font-bold text-secondary mb-4">Related Articles</h3>
                  {related.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {related.map((rel) => (
                        <Link
                          key={rel.id}
                          href={`/articles/${rel.slug}`}
                          className="group flex gap-3 p-3 rounded-lg hover:bg-white transition-colors"
                        >
                          <img
                            src={rel.featuredImage}
                            alt={rel.title}
                            className="w-20 h-14 object-cover rounded-lg shrink-0"
                          />
                          <div>
                            <p className="text-sm font-medium text-secondary group-hover:text-primary transition-colors line-clamp-2">
                              {rel.title}
                            </p>
                            <p className="text-xs text-muted mt-1">{rel.readingTime}m read</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted">No related articles yet.</p>
                  )}

                  {/* Back link */}
                  <Link
                    href="/articles"
                    className="mt-6 btn-secondary text-sm w-full justify-center"
                  >
                    ← All Articles
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
