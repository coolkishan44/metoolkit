import Link from "next/link";
import BentoGrid from "./BentoGrid";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-24 w-[520px] h-[420px] rounded-full bg-indigo/15 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-20 w-[460px] h-[380px] rounded-full bg-amber/10 blur-3xl"
      />

      <div className="relative max-w-content mx-auto px-5 pt-16 pb-12 md:pt-24">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-line dark:border-white/10 bg-paper/70 dark:bg-white/5 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-muted mb-7">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-indigo animate-ping" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-indigo" />
            </span>
            Nine tools live · nothing leaves your browser
          </div>

          <h1 className="font-display text-[2.7rem] md:text-[4rem] leading-[1.03] tracking-[-.035em] text-ink dark:text-white mb-6">
            Calculators that show you how they got there
          </h1>

          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-[54ch] mb-8">
            EMI, GST, income tax, cash counting and five more — built for Indian
            numbers, running entirely on your device.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/tools"
              className="rounded-full bg-indigo px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo/30 transition-transform hover:-translate-y-0.5"
            >
              Browse all nine
            </Link>
            <Link
              href="/blog"
              className="group rounded-full border border-line dark:border-white/10 bg-surface dark:bg-white/5 px-6 py-3 text-sm font-semibold text-ink dark:text-white transition-all hover:border-indigo hover:-translate-y-0.5"
            >
              Read the guides
              <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        <BentoGrid />
      </div>
    </section>
  );
}
