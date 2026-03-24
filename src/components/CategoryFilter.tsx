"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface CategoryFilterProps {
  categories: string[];
  activeCategory?: string;
  basePath: string;
  paramName?: string;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  basePath,
  paramName = "category",
}: CategoryFilterProps) {
  const router = useRouter();

  const handleSelect = (cat: string) => {
    if (cat === activeCategory) {
      router.push(basePath);
    } else {
      router.push(`${basePath}?${paramName}=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => router.push(basePath)}
        className={`badge whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
          !activeCategory
            ? "bg-secondary text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleSelect(cat)}
          className={`badge whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
            activeCategory === cat
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
