import Link from "next/link";
import Hero from "@/components/Hero";
import QuickTools from "@/components/QuickTools";
import WhyChooseUs from "@/components/WhyChooseUs";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { blogPosts } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="max-w-content mx-auto px-6 py-14 hairline">
        <Reveal>
          <SectionHeading eyebrow="Or jump straight to a tool" title="All tools" />
        </Reveal>
        <QuickTools />
      </section>

      <WhyChooseUs />
      <Stats />
      <FAQ />

      <section className="max-w-content mx-auto px-6 py-14 hairline">
        <Reveal>
          <SectionHeading
            eyebrow="Guides"
            title="How to actually use these tools"
          />
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post, i) => (
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
