import Link from "next/link";
import type { Tool } from "@/lib/data";

const pricingStyle: Record<Tool["pricing"], string> = {
  Free: "bg-indigo-soft text-indigo-dark",
  Freemium: "bg-amber-soft text-amber-dark",
  Paid: "bg-ink/5 text-ink/70"
};

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group block rounded-xl border border-line bg-surface p-6 hover:border-indigo hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg leading-snug group-hover:text-indigo transition-colors">
          {tool.name}
        </h3>
        {tool.isAI && (
          <span className="shrink-0 text-[11px] font-mono uppercase tracking-wide text-indigo border border-indigo/30 rounded-full px-2 py-0.5">
            AI
          </span>
        )}
      </div>

      <p className="mt-2 text-sm text-muted leading-relaxed">{tool.tagline}</p>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs text-muted">{tool.category}</span>
        <span className="text-line">·</span>
        <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${pricingStyle[tool.pricing]}`}>
          {tool.pricing}
        </span>
      </div>
    </Link>
  );
}
