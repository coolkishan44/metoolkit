import SearchBar from "./SearchBar";
import ToolShowcase from "./ToolShowcase";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-indigo/10 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-0 w-[380px] h-[380px] rounded-full bg-amber/10 blur-3xl"
      />

      <div className="relative max-w-content mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-muted mb-5">
              Free · No sign-up · Runs in your browser
            </p>

            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.08] text-ink dark:text-white mb-6">
              Everyday calculators,{" "}
              <em className="italic text-indigo">done right</em>.
            </h1>

            <p className="text-muted text-lg leading-relaxed max-w-lg mb-8">
              EMI, tax, GST, percentage, age, BMI, and cash counting — accurate
              tools you can trust, with nothing sent to a server.
            </p>

            <div className="max-w-md mb-10">
              <SearchBar />
            </div>

            <dl className="flex flex-wrap gap-x-10 gap-y-5">
              <div>
                <dt className="text-xs font-mono uppercase tracking-widest text-muted mb-1">
                  Tools
                </dt>
                <dd className="font-mono text-2xl tabular text-ink dark:text-white">
                  9
                </dd>
              </div>
              <div>
                <dt className="text-xs font-mono uppercase tracking-widest text-muted mb-1">
                  Client-side
                </dt>
                <dd className="font-mono text-2xl tabular text-ink dark:text-white">
                  100%
                </dd>
              </div>
              <div>
                <dt className="text-xs font-mono uppercase tracking-widest text-muted mb-1">
                  Sign-ups
                </dt>
                <dd className="font-mono text-2xl tabular text-ink dark:text-white">
                  0
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:pt-2">
            <ToolShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
