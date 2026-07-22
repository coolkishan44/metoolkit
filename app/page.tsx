import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import CategoryChip from "@/components/CategoryChip";
import ToolCard from "@/components/ToolCard";
import SectionHeading from "@/components/SectionHeading";
import { tools, categories, blogPosts } from "@/lib/data";

export default function HomePage() {
  const featured = tools.filter((t) => t.featured);
  const aiTools = tools.filter((t) => t.isAI).slice(0, 3);

  return (
    <>
      {/* Hero — search is the interface, not a headline + CTA */}
      <section className="max-w-content mx-auto px-6 pt-16 pb-14 flex flex-col items-start">
        <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">
          A directory, not a feed
        </p>
        <h1 className="font-display text-4xl md:text-5xl leading-[1.1] max-w-2xl mb-8">
          Find the right tool <span className="italic text-indigo">before</span> you build the wrong workaround.
        </h1>
        <SearchBar />

        <div className="mt-8 flex flex-wrap gap-3">
          {categories.slice(0, 6).map((c) => (
            <CategoryChip key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* Featured tools */}
      <section className="max-w-content mx-auto px-6 py-14 hairline">
        <SectionHeading
          eyebrow="Hand-picked"
          title="Featured this week"
          action={
            <Link href="/tools" className="text-sm text-indigo hover:underline">
              View all tools →
            </Link>
          }
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* AI tools spotlight */}
      <section className="max-w-content mx-auto px-6 py-14 hairline">
        <SectionHeading
          eyebrow="Spotlight"
          title="AI tools worth your trial account"
          action={
            <Link href="/ai-tools" className="text-sm text-indigo hover:underline">
              Browse AI tools →
            </Link>
          }
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Blog strip */}
      <section className="max-w-content mx-auto px-6 py-14 hairline">
        <SectionHeading
          eyebrow="From the index"
          title="Comparisons and field notes"
          action={
            <Link href="/blog" className="text-sm text-indigo hover:underline">
              Read the blog →
            </Link>
          }
        />
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <p className="text-xs font-mono text-muted tabular mb-2">
                {post.date} · {post.readMinutes} min read
              </p>
              <h3 className="font-display text-lg leading-snug group-hover:text-indigo transition-colors mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
