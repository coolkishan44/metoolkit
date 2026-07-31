import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getBlogPostBySlug } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt
  };
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="max-w-content mx-auto px-6 py-14">
      <Link href="/blog" className="text-sm text-muted hover:text-indigo transition-colors">
        ← Blog
      </Link>

      <p className="text-xs font-mono text-muted tabular mt-6 mb-3">
        {post.date} · {post.readMinutes} min read
      </p>
      <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-10 max-w-3xl">
        {post.title}
      </h1>

      <div className="max-w-2xl space-y-5">
        {post.content.map((paragraph, i) => (
          <p key={i} className="text-ink/85 dark:text-white/85 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
