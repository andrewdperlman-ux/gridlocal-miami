import type { Metadata } from "next";
import { Suspense } from "react";
import ArticleCard from "@/components/ArticleCard";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import { getPosts } from "@/lib/ghost";
import type { ArticleCategory } from "@/types";

export const metadata: Metadata = {
  title: "Articles",
  description: "Miami car culture news, exotic spotlights, buyer guides, and market trends — updated daily by GridLocal AI.",
};

const CATEGORIES: ArticleCategory[] = ["News", "Events", "Spotlights", "Market Trends", "Buyer Guides"];
const PER_PAGE = 9;

interface ArticlesPageProps {
  searchParams: { category?: string; page?: string; q?: string };
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const articles = (await getPosts()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  
  const activeCategory = searchParams.category as ArticleCategory | undefined;
  const searchQuery = searchParams.q?.toLowerCase();
  const currentPage = Number(searchParams.page) || 1;

  let filtered = articles;
  if (activeCategory) {
    filtered = filtered.filter((a) => a.category === activeCategory);
  }
  if (searchQuery) {
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery) ||
        a.excerpt.toLowerCase().includes(searchQuery) ||
        a.tags.some((t) => t.toLowerCase().includes(searchQuery))
    );
  }

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <div className="bg-background min-h-screen">
      {/* Page header */}
      <div className="bg-secondary text-white py-12">
        <div className="container-content">
          <h1 className="text-3xl sm:text-4xl font-black mb-2">Articles</h1>
          <p className="text-gray-300">
            Miami car culture coverage — spotlights, market analysis, buyer guides, and event recaps
          </p>
        </div>
      </div>

      <div className="container-content py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 max-w-sm">
            <SearchBar placeholder="Search articles..." basePath="/articles" />
          </div>
          <div className="flex-1">
            <Suspense>
              <CategoryFilter
                categories={CATEGORIES}
                activeCategory={activeCategory}
                basePath="/articles"
              />
            </Suspense>
          </div>
        </div>

        {/* Results count */}
        {(activeCategory || searchQuery) && (
          <p className="text-sm text-muted mb-6">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            {activeCategory && ` in ${activeCategory}`}
            {searchQuery && ` matching "${searchParams.q}"`}
          </p>
        )}

        {/* Grid */}
        {paginated.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-secondary mb-2">No articles found</h2>
            <p className="text-muted">Try a different search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const params = new URLSearchParams();
              if (activeCategory) params.set("category", activeCategory);
              if (searchQuery) params.set("q", searchParams.q!);
              params.set("page", String(page));
              return (
                <a
                  key={page}
                  href={`/articles?${params.toString()}`}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                    page === currentPage
                      ? "bg-primary text-white"
                      : "bg-white border border-gray-200 text-secondary hover:border-primary"
                  }`}
                >
                  {page}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
