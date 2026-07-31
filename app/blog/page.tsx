import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Comparisons and field notes on AI and business tools."
};

export default function BlogPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <SectionHeading eyebrow="From the index" title="Comparisons and field notes" />

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <p className="text-xs font-mono text-muted tabular mb-2">
              {post.date} · {post.readMinutes} min read
            </p>
            <h2 className="font-display text-xl leading-snug text-ink dark:text-white group-hover:text-indigo transition-colors mb-2">
              {post.title}
            </h2>
            <p className="text-sm text-muted leading-relaxed">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
