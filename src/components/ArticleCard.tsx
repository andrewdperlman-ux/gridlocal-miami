import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types";

const categoryColors: Record<string, string> = {
  News: "bg-blue-100 text-blue-700",
  Events: "bg-green-100 text-green-700",
  Spotlights: "bg-purple-100 text-purple-700",
  "Market Trends": "bg-yellow-100 text-yellow-700",
  "Buyer Guides": "bg-orange-100 text-orange-700",
};

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <article className={`card h-full flex flex-col ${featured ? "md:flex-row" : ""}`}>
        {/* Image */}
        <div className={`relative overflow-hidden ${featured ? "md:w-1/2 min-h-[240px]" : "aspect-[16/9]"}`}>
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className={`absolute top-3 left-3`}>
            <span className={`badge ${categoryColors[article.category] || "bg-gray-100 text-gray-700"}`}>
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h2 className={`font-bold text-secondary group-hover:text-primary transition-colors line-clamp-2 mb-2 ${featured ? "text-xl" : "text-base"}`}>
            {article.title}
          </h2>
          <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-muted border-t pt-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                {article.author.avatar && (
                  <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
                )}
              </div>
              <span>{article.author.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>{formattedDate}</span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {article.readingTime}m
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
