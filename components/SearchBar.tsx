"use client";

import { useMemo, useState } from "react";
import { tools, totalToolsIndexed } from "@/lib/data";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return tools;
    const q = query.toLowerCase();
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="w-full max-w-2xl">
      <label htmlFor="tool-search" className="sr-only">
        Search tools
      </label>
      <div className="relative">
        <input
          id="tool-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 'sales call transcription' or 'ai design'…"
          className="w-full rounded-2xl border border-line bg-surface px-6 py-5 text-lg font-display placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-indigo shadow-sm"
        />
      </div>
      <p className="mt-3 text-sm font-mono tabular text-muted">
        showing {results.length} of {totalToolsIndexed} tools indexed
      </p>
    </div>
  );
}
