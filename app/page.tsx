import { Suspense } from "react";
import type { Metadata } from "next";
import ToolsExplorer from "@/components/ToolsExplorer";
import { tools, categories } from "@/lib/data";

export const metadata: Metadata = {
  title: "AI tools",
  description: "Every AI-powered tool in the index, searchable by category and pricing."
};

export default function AiToolsPage() {
  const aiTools = tools.filter((t) => t.isAI);
  const aiCategorySlugs = new Set(aiTools.map((t) => t.category.toLowerCase()));
  const aiCategories = categories.filter((c) => aiCategorySlugs.has(c.slug));

  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">
        Spotlight
      </p>
      <h1 className="font-display text-3xl md:text-4xl mb-2 text-ink dark:text-white">AI tools</h1>
      <p className="text-muted mb-8 max-w-xl">
        Every tool here uses AI as its core mechanism — not just a chatbot bolted onto an existing product.
      </p>

      <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
        <ToolsExplorer
          tools={aiTools}
          categories={aiCategories}
          totalIndexed={aiTools.length}
        />
      </Suspense>
    </div>
  );
}
