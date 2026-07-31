import Link from "next/link";
import Hero from "@/components/Hero";
import PopularCategories from "@/components/PopularCategories";
import WhyChooseUs from "@/components/WhyChooseUs";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import ToolCard from "@/components/ToolCard";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { tools, blogPosts } from "@/lib/data";

export default function HomePage() {
  const featured = tools.filter((t) => t.featured);
  const aiTools = tools.filter((t) => t.isAI).slice(0, 3);

  return (
    <>
      <Hero />

      {/* Featured tools */}
      <section className="max-w-content mx-auto px-6 py-14 hairline">
        <Reveal>
          <SectionHeading
            eyebrow="Hand-picked"
            title="Featured this week"
            action={
              <Link href="/tools" className="text-sm text-indigo hover:underline">
                View all tools →
              </Link>
            }
          />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((tool, i) => (
            <Reveal key={tool.slug} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <ToolCard tool={tool} />
            </Reveal>
          ))}
        </div>
      </section>

      <PopularCategories />

      {/* AI tools spotlight */}
      <section className="max-w-content mx-auto px-6 py-14 hairline">
        <Reveal>
          <SectionHeading
            eyebrow="Spotlight"
            title="AI tools worth your trial account"
            action={
              <Link href="/ai-tools" className="text-sm text-indigo hover:underline">
                Browse AI tools →
              </Link>
            }
          />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiTools.map((tool, i) => (
            <Reveal key={tool.slug} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <ToolCard tool={tool} />
            </Reveal>
          ))}
        </div>
      </section>

      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <FAQ />

      {/* Blog strip */}
      <section className="max-w-content mx-auto px-6 py-14 hairline">
        <Reveal>
          <SectionHeading
            eyebrow="From the index"
            title="Comparisons and field notes"
            action={
              <Link href="/blog" className="text-sm text-indigo hover:underline">
                Read the blog →
              </Link>
            }
          />
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <p className="text-xs font-mono text-muted tabular mb-2">
                  {post.date} · {post.readMinutes} min read
                </p>
                <h3 className="font-display text-lg leading-snug text-ink dark:text-white group-hover:text-indigo transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{post.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
