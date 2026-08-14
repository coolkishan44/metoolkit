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
    category: "Utility"
  },
  {
    href: "/cash-counter",
    name: "Cash Counter",
    description: "Count Indian notes and coins with automatic totals in Lakh/Crore format.",
    category: "Finance"
  },
  {
    href: "/tax-calculator",
    name: "Tax Calculator",
    description: "Compare old vs new income tax regime for FY 2025-26/2026-27.",
    category: "Finance"
  },
  {
    href: "/emi-calculator",
    name: "EMI Calculator",
    description: "Monthly EMI, total interest, and total payment for any loan.",
    category: "Finance"
  },
  {
    href: "/percentage-calculator",
    name: "Percentage Calculator",
    description: "X% of Y, what percent one number is of another, or percentage change.",
    category: "Utility"
  },
  {
    href: "/age-calculator",
    name: "Age Calculator",
    description: "Exact age in years, months, and days, plus days to your next birthday.",
    category: "Utility"
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
            className="group block rounded-xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6 hover:border-indigo hover:shadow-md dark:hover:shadow-none transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h2 className="font-display text-lg text-ink dark:text-white group-hover:text-indigo transition-colors">
                {tool.name}
              </h2>
              <span className="shrink-0 text-[11px] font-mono uppercase tracking-wide text-muted border border-line dark:border-white/10 rounded-full px-2 py-0.5">
                {tool.category}
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
