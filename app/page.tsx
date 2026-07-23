import { Suspense } from "react";
import type { Metadata } from "next";
import ToolsExplorer from "@/components/ToolsExplorer";
import { tools, categories, totalToolsIndexed } from "@/lib/data";

export const metadata: Metadata = {
  title: "Browse tools",
  description: "Search and filter every tool in the index by category, pricing, and what it does."
};

export default function ToolsPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">
        Full index
      </p>
      <h1 className="font-display text-3xl md:text-4xl mb-8 text-ink dark:text-white">Browse every tool</h1>

      <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
        <ToolsExplorer
          tools={tools}
          categories={categories}
          totalIndexed={totalToolsIndexed}
        />
      </Suspense>
    </div>
  );
}
