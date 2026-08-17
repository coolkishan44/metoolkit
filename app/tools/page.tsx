import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Tools",
  description: "Every free tool on MeToolkit — calculator, cash counter, tax calculator, EMI, percentage, and age calculator."
};

const allTools = [
  {
    href: "/calculator",
    name: "Calculator",
    description: "Everyday math — addition, subtraction, multiplication, division.",
    category: "Utility",
    icon: "🧮"
  },
  {
    href: "/cash-counter",
    name: "Cash Counter",
    description: "Count Indian notes and coins with automatic totals in Lakh/Crore format.",
    category: "Finance",
    icon: "💵"
  },
  {
    href: "/tax-calculator",
    name: "Tax Calculator",
    description: "Compare old vs new income tax regime for FY 2025-26/2026-27.",
    category: "Finance",
    icon: "🧾"
  },
  {
    href: "/emi-calculator",
    name: "EMI Calculator",
    description: "Monthly EMI, total interest, and total payment for any loan.",
    category: "Finance",
    icon: "🏠"
  },
  {
    href: "/percentage-calculator",
    name: "Percentage Calculator",
    description: "X% of Y, what percent one number is of another, or percentage change.",
    category: "Utility",
    icon: "％"
  },
  {
    href: "/age-calculator",
    name: "Age Calculator",
    description: "Exact age in years, months, and days, plus days to your next birthday.",
    category: "Utility",
    icon: "🎂"
  }
];

export default function ToolsPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">
        Free · No sign-up
      </p>
      <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-10">
        All tools
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group relative block rounded-xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:border-indigo hover:shadow-xl hover:shadow-indigo/10 dark:hover:shadow-black/30"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-indigo/0 group-hover:bg-indigo/10 blur-2xl transition-colors duration-500"
            />

            <div className="relative flex items-start justify-between gap-3 mb-3">
              <span className="w-10 h-10 rounded-lg bg-indigo-soft dark:bg-indigo/15 flex items-center justify-center text-lg transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6">
                {tool.icon}
              </span>
              <span className="shrink-0 text-[11px] font-mono uppercase tracking-wide text-muted border border-line dark:border-white/10 rounded-full px-2 py-0.5">
                {tool.category}
              </span>
            </div>

            <h2 className="relative font-display text-lg text-ink dark:text-white group-hover:text-indigo transition-colors mb-2">
              {tool.name}
            </h2>
            <p className="relative text-sm text-muted leading-relaxed mb-4">
              {tool.description}
            </p>

            <span className="relative inline-flex items-center gap-1 text-sm font-medium text-indigo opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
              Open tool
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
