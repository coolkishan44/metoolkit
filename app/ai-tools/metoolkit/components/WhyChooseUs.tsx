import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const points = [
  {
    title: "No paid placement",
    description:
      "Featured tools are editorial picks. If a listing is ever sponsored, it's labeled — never disguised as a recommendation."
  },
  {
    title: "Updated weekly",
    description:
      "Dead tools and stale pricing get removed. We'd rather have 220 accurate listings than 2,000 outdated ones."
  },
  {
    title: "Built for comparison",
    description:
      "Every listing shows pricing tier, category, and what it actually does — so you can compare in seconds, not tabs."
  },
  {
    title: "Fast, no clutter",
    description:
      "No autoplay videos, no popups, no infinite scroll tricks. Just a search box and clear results."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="max-w-content mx-auto px-6 py-14 hairline">
      <Reveal>
        <SectionHeading eyebrow="Why MeToolkit" title="Built to save you time, not sell your attention" />
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-6 mt-2">
        {points.map((p, i) => (
          <Reveal key={p.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
            <div className="rounded-xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6">
              <div className="w-9 h-9 rounded-lg bg-indigo-soft dark:bg-indigo/15 flex items-center justify-center mb-4">
                <span className="font-mono text-sm text-indigo">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="font-display text-lg mb-2 text-ink dark:text-white">{p.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{p.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
