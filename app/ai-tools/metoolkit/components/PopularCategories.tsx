import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { categories } from "@/lib/data";

export default function PopularCategories() {
  return (
    <section className="max-w-content mx-auto px-6 py-14 hairline">
      <Reveal>
        <SectionHeading eyebrow="Browse by category" title="Popular categories" />
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
            <Link
              href={`/tools?category=${c.slug}`}
              className="group flex items-center justify-between rounded-xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] px-6 py-5 hover:border-indigo transition-colors"
            >
              <span className="font-display text-lg text-ink dark:text-white group-hover:text-indigo transition-colors">
                {c.label}
              </span>
              <span className="font-mono text-xs text-muted tabular">{c.count}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
