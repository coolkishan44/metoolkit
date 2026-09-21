import type { Metadata } from "next";

const FORM_URL = "https://forms.gle/29kWpEgV6USV2hrG9";

export const metadata: Metadata = {
  title: "Feedback & Suggestions",
  description:
    "Suggest a tool, report a problem, or share feedback about MeToolkit. Takes under a minute.",
  alternates: { canonical: "/feedback" }
};

export default function FeedbackPage() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-24 w-[420px] h-[420px] rounded-full bg-indigo/20 blur-[90px] opacity-40 animate-drift pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-20 -right-20 w-[320px] h-[320px] rounded-full bg-amber/20 blur-[90px] opacity-40 animate-drift pointer-events-none"
        style={{ animationDelay: "-6s" }}
      />

      <div className="relative max-w-content mx-auto px-6 py-14">
        <p className="text-xs font-mono uppercase tracking-widest text-muted mb-3">
          We read every response
        </p>
        <h1 className="font-display text-3xl md:text-5xl leading-[1.1] text-ink dark:text-white mb-4 max-w-2xl">
          Tell us what to <span className="italic text-indigo">build next</span>.
        </h1>
        <p className="text-lg text-muted max-w-xl mb-10 leading-relaxed">
          Missing a calculator you need? Found something that gives the wrong number?
          Drop it here — this is where the roadmap actually comes from.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: "🧰", title: "Suggest a tool", text: "Tell us which calculator you keep searching for." },
            { icon: "🐞", title: "Report a problem", text: "Wrong result or broken button? We'll fix it." },
            { icon: "💬", title: "General feedback", text: "Anything about the site that could be better." }
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-5"
            >
              <span className="block w-10 h-10 rounded-xl bg-indigo-soft dark:bg-indigo/15 flex items-center justify-center text-lg mb-3">
                {item.icon}
              </span>
              <p className="font-medium text-ink dark:text-white mb-1">{item.title}</p>
              <p className="text-sm text-muted leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] overflow-hidden shadow-[0_2px_8px_rgba(22,35,29,0.06),0_24px_48px_-24px_rgba(22,35,29,0.25)]">
          <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-line dark:border-white/10">
            <p className="text-xs font-mono uppercase tracking-widest text-muted">
              Feedback form
            </p>
            
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-indigo hover:underline shrink-0"
            >
              Open in new tab →
            </a>
          </div>

          <iframe
            src={FORM_URL}
            title="MeToolkit feedback form"
            className="w-full h-[900px] border-0 bg-white"
            loading="lazy"
          >
            Loading form…
          </iframe>
        </div>

        <p className="text-xs text-muted leading-relaxed mt-5 max-w-xl">
          The form above is hosted by Google Forms. If it doesn&apos;t load in your
          browser, use the &ldquo;Open in new tab&rdquo; link instead — responses reach
          us either way.
        </p>
      </div>
    </div>
  );
}
