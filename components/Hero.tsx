import SearchBar from "@/components/SearchBar";
import TiltCard from "@/components/TiltCard";
import MiniCalculatorPreview from "@/components/MiniCalculatorPreview";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-24 w-[480px] h-[480px] rounded-full bg-indigo/25 blur-[90px] opacity-40 animate-drift pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-10 -right-20 w-[380px] h-[380px] rounded-full bg-amber/25 blur-[90px] opacity-40 animate-drift pointer-events-none"
        style={{ animationDelay: "-6s" }}
      />

      <div className="relative max-w-content mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
        <div>
          <Reveal>
            <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">
              Free · no sign-up · runs in your browser
            </p>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="font-display text-4xl md:text-6xl leading-[1.08] mb-6 text-ink dark:text-white">
              Everyday calculators, <span className="italic text-indigo">done right</span>.
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="text-lg text-muted max-w-md mb-9 leading-relaxed">
              EMI, tax, percentage, age, and cash counting — accurate tools you can
              trust, with nothing sent to a server.
            </p>
          </Reveal>

          <Reveal delay={2}>
            <SearchBar />
          </Reveal>

          <Reveal delay={3} className="mt-10 flex gap-8">
            <div>
              <p className="font-mono text-2xl text-ink dark:text-white">6</p>
              <p className="text-xs text-muted">free tools</p>
            </div>
            <div>
              <p className="font-mono text-2xl text-ink dark:text-white">100%</p>
              <p className="text-xs text-muted">client-side</p>
            </div>
            <div>
              <p className="font-mono text-2xl text-ink dark:text-white">0</p>
              <p className="text-xs text-muted">sign-ups</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={2} className="flex justify-center">
          <TiltCard>
            <MiniCalculatorPreview />
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
