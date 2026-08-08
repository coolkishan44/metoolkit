import Link from "next/link";

const quickTools = [
  {
    href: "/calculator",
    label: "Calculator",
    description: "Everyday math, instantly"
  },
  {
    href: "/cash-counter",
    label: "Cash Counter",
    description: "Count Indian notes & coins"
  },
  {
    href: "/tax-calculator",
    label: "Tax Calculator",
    description: "Old vs new regime (India)"
  },
  {
    href: "/emi-calculator",
    label: "EMI Calculator",
    description: "Loan EMI & interest"
  },
  {
    href: "/percentage-calculator",
    label: "Percentage Calculator",
    description: "3 common percent calcs"
  },
  {
    href: "/age-calculator",
    label: "Age Calculator",
    description: "Exact age & next birthday"
  }
];

export default function QuickTools() {
  return (
    <div className="flex flex-wrap gap-3">
      {quickTools.map((tool) => (
        <Link
          key={tool.href}
          href={tool.href}
          className="group flex items-center gap-3 rounded-full border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] pl-2 pr-4 py-2 hover:border-indigo transition-colors"
        >
          <span className="w-7 h-7 rounded-full bg-indigo-soft dark:bg-indigo/15 flex items-center justify-center text-xs font-mono text-indigo shrink-0">
            ⚡
          </span>
          <span>
            <span className="block text-sm font-medium text-ink dark:text-white group-hover:text-indigo transition-colors">
              {tool.label}
            </span>
            <span className="block text-xs text-muted">{tool.description}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
