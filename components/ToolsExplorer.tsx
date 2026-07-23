"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ToolCard from "@/components/ToolCard";
import type { Tool, Category } from "@/lib/data";

export default function ToolsExplorer({
  tools,
  categories,
  totalIndexed
}: {
  tools: Tool[];
  categories: Category[];
  totalIndexed: number;
}) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const results = useMemo(() => {
    let list = tools;

    if (activeCategory !== "all") {
      list = list.filter(
        (t) => t.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [tools, query, activeCategory]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <label htmlFor="explorer-search" className="sr-only">
          Search tools
        </label>
        <input
          id="explorer-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, category, or what it does…"
          className="flex-1 rounded-xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] text-ink dark:text-white px-4 py-3 text-sm placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-indigo"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory("all")}
          className={`text-sm rounded-full px-4 py-2 border transition-colors ${
            activeCategory === "all"
              ? "bg-ink text-paper dark:bg-white dark:text-ink border-ink dark:border-white"
              : "border-line dark:border-white/10 text-ink dark:text-white hover:border-indigo hover:text-indigo"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setActiveCategory(c.slug)}
            className={`text-sm rounded-full px-4 py-2 border transition-colors ${
              activeCategory.toLowerCase() === c.slug.toLowerCase()
                ? "bg-ink text-paper dark:bg-white dark:text-ink border-ink dark:border-white"
                : "border-line dark:border-white/10 text-ink dark:text-white hover:border-indigo hover:text-indigo"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <p className="text-sm font-mono tabular text-muted mb-6">
        showing {results.length} of {totalIndexed} tools indexed
      </p>

      {results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line dark:border-white/10 py-16 text-center">
          <p className="font-display text-lg mb-1 text-ink dark:text-white">Nothing matches that search</p>
          <p className="text-sm text-muted">
            Try a different word, or clear the category filter.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
