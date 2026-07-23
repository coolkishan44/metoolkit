import Reveal from "@/components/Reveal";
import { stats } from "@/lib/data";

export default function Stats() {
  return (
    <section className="border-y border-line dark:border-white/10 bg-ink dark:bg-white/[0.02]">
      <div className="max-w-content mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
            <div>
              <p className="font-mono text-3xl md:text-4xl tabular text-paper dark:text-white mb-1">
                {s.value}
              </p>
              <p className="text-sm text-paper/60 dark:text-white/60">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
