import Link from "next/link";
import type { Category } from "@/lib/data";

export default function CategoryChip({ category }: { category: Category }) {
  return (
    <Link
      href={`/tools?category=${category.slug}`}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm hover:border-indigo hover:text-indigo transition-colors"
    >
      {category.label}
      <span className="font-mono text-xs text-muted tabular">{category.count}</span>
    </Link>
  );
}
