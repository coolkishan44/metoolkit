import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import { tools, getToolBySlug, getRelatedTools } from "@/lib/data";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: tool.name,
    description: tool.tagline
  };
}

const pricingStyle: Record<string, string> = {
  Free: "bg-indigo-soft text-indigo-dark dark:bg-indigo/15 dark:text-indigo",
  Freemium: "bg-amber-soft text-amber-dark dark:bg-amber/15 dark:text-amber",
  Paid: "bg-ink/5 text-ink/70 dark:bg-white/10 dark:text-white/70"
};

export default async function ToolDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const related = getRelatedTools(tool);

  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <Link href="/tools" className="text-sm text-muted hover:text-indigo transition-colors">
        ← All tools
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white">{tool.name}</h1>
            {tool.isAI && (
              <span className="text-[11px] font-mono uppercase tracking-wide text-indigo border border-indigo/30 rounded-full px-2 py-0.5">
                AI
              </span>
            )}
          </div>
          <p className="text-lg text-muted leading-relaxed">{tool.tagline}</p>
        </div>

        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-sm font-medium bg-ink text-paper dark:bg-white dark:text-ink px-5 py-3 rounded-full hover:bg-indigo dark:hover:bg-indigo dark:hover:text-white transition-colors"
        >
          Visit {tool.name} →
        </a>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <span className="text-sm text-muted">{tool.category}</span>
        <span className="text-line">·</span>
        <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${pricingStyle[tool.pricing]}`}>
          {tool.pricing}
        </span>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-10 hairline pt-10">
        <div className="md:col-span-2">
          <h2 className="font-display text-xl italic mb-3 text-ink dark:text-white">About</h2>
          <p className="text-ink/80 dark:text-white/80 leading-relaxed">{tool.description}</p>
        </div>

        <div>
          <h2 className="font-display text-xl italic mb-3 text-ink dark:text-white">Features</h2>
          <ul className="space-y-2">
            {tool.features.map((f) => (
              <li key={f} className="text-sm text-ink/80 dark:text-white/80 flex gap-2">
                <span className="text-indigo">·</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-14 hairline pt-10">
          <h2 className="font-display text-2xl italic mb-6 text-ink dark:text-white">
            More in {tool.category}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
