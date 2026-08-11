import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides on using MeToolkit's calculators — EMI, tax, percentage, age, and cash counting."
};

export default function BlogPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">Guides</p>
      <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-10">
        How to actually use these tools
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
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
