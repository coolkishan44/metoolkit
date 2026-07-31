import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Why MeToolkit exists and how the index is maintained."
};

export default function AboutPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">About</p>
      <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-10 max-w-2xl">
        A directory built for comparison, not browsing
      </h1>

      <div className="max-w-2xl space-y-5 text-ink/85 dark:text-white/85 leading-relaxed">
        <p>
          MeToolkit started from a simple frustration: finding the right AI or business
          tool usually means ten open browser tabs, half of them outdated review sites
          and the other half thinly disguised ads.
        </p>
        <p>
          We built an index instead — every tool listed with its actual pricing tier,
          category, and what it does in one line, so you can compare without reading
          five separate landing pages.
        </p>
        <p>
          Nothing here is paid placement. Featured sections are editorial picks based on
          what's actually useful, not who bought a spot. If that ever changes for a
          listing, we'll label it clearly rather than blend it in.
        </p>
        <p>
          The index is reviewed and updated on a rolling basis — tools that go stale,
          change pricing, or shut down get updated or removed rather than left to rot.
        </p>
        <p>
          MeToolkit is run as a small, focused project. If you spot something out of
          date, the fastest way to flag it is through the contact page.
        </p>
      </div>
    </div>
  );
}
