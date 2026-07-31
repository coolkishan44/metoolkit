import SearchBar from "@/components/SearchBar";
import CategoryChip from "@/components/CategoryChip";
import Reveal from "@/components/Reveal";
import { categories } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft background glow — pure CSS, no images, keeps this fast */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-indigo/10 dark:bg-indigo/15 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-content mx-auto px-6 pt-20 pb-14 flex flex-col items-start">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">
            220+ tools · updated weekly
          </p>
        </Reveal>

        <Reveal delay={1}>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.08] max-w-3xl mb-6 text-ink dark:text-white">
            Find the right tool{" "}
            <span className="italic text-indigo">before</span> you build the wrong workaround.
          </h1>
        </Reveal>

        <Reveal delay={2}>
          <p className="text-lg text-muted max-w-xl mb-9 leading-relaxed">
            MeToolkit is a searchable index of AI and business tools, organized by
            what they actually do — not by who paid for placement.
          </p>
        </Reveal>

        <Reveal delay={2} className="w-full flex justify-start">
          <SearchBar />
        </Reveal>

        <Reveal delay={3} className="mt-8 flex flex-wrap gap-3">
          {categories.slice(0, 6).map((c) => (
            <CategoryChip key={c.slug} category={c} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
