import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getBlogPostBySlug, type BlogBlock } from "@/lib/data";

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

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="font-display text-2xl text-ink dark:text-white mt-10 mb-4">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-display text-lg text-ink dark:text-white mt-6 mb-3">
          {block.text}
        </h3>
      );
    case "list":
      return (
        <ul className="space-y-2 my-4">
          {block.items.map((item) => (
            <li key={item} className="text-ink/85 dark:text-white/85 leading-relaxed flex gap-2">
              <span className="text-indigo shrink-0">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return (
        <p className="text-ink/85 dark:text-white/85 leading-relaxed mb-4">{block.text}</p>
      );
  }
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer }
    }))
  };

  return (
    <article className="max-w-content mx-auto px-6 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Link href="/blog" className="text-sm text-muted hover:text-indigo transition-colors">
        ← Guides
      </Link>

      <div
        aria-hidden="true"
        className="mt-6 mb-8 h-40 md:h-56 rounded-2xl bg-gradient-to-br from-indigo/15 via-indigo/5 to-amber/10 dark:from-indigo/20 dark:via-indigo/5 dark:to-amber/10 border border-line dark:border-white/10 flex items-center justify-center"
      >
        <span className="font-display italic text-3xl md:text-4xl text-indigo/40">
          MeToolkit
        </span>
      </div>

      <p className="text-xs font-mono text-muted tabular mb-3">
        {post.date} · {post.readMinutes} min read
      </p>
      <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-8 max-w-3xl">
        {post.title}
      </h1>

      <div className="max-w-2xl">
        {post.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}

        <Link
          href={post.toolHref}
          className="inline-block mt-6 mb-12 rounded-full bg-indigo text-white px-6 py-3 text-sm font-medium hover:bg-indigo-dark transition-colors"
        >
          {post.toolLabel} →
        </Link>

        {post.faqs.length > 0 && (
          <div className="hairline pt-10">
            <h2 className="font-display text-2xl text-ink dark:text-white mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {post.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-display text-base text-ink dark:text-white mb-1.5">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
