import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="max-w-content mx-auto px-6 py-14 hairline">
      <Reveal>
        <SectionHeading eyebrow="From people who use it" title="What they're saying" />
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
            <div className="rounded-xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6 h-full flex flex-col">
              <p className="text-ink/85 dark:text-white/85 leading-relaxed italic font-display text-lg mb-6 flex-1">
                "{t.quote}"
              </p>
              <div>
                <p className="text-sm font-medium text-ink dark:text-white">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
