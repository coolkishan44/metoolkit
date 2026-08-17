import Link from "next/link";

const quickTools = [
  { href: "/calculator", label: "Calculator", description: "Everyday math, instantly", icon: "🧮" },
  { href: "/cash-counter", label: "Cash Counter", description: "Count Indian notes & coins", icon: "💵" },
  { href: "/tax-calculator", label: "Tax Calculator", description: "Old vs new regime (India)", icon: "🧾" },
  { href: "/emi-calculator", label: "EMI Calculator", description: "Loan EMI & interest", icon: "🏠" },
  { href: "/percentage-calculator", label: "Percentage Calculator", description: "3 common percent calcs", icon: "％" },
  { href: "/age-calculator", label: "Age Calculator", description: "Exact age & next birthday", icon: "🎂" }
];

export default function QuickTools() {
  return (
    <div className="flex flex-wrap gap-3">
      {quickTools.map((tool) => (
        <Link
          key={tool.href}
          href={tool.href}
          className="group flex items-center gap-3 rounded-full border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] pl-2 pr-4 py-2 transition-all duration-300 ease-out hover:border-indigo hover:-translate-y-0.5 hover:shadow-md hover:shadow-indigo/10 dark:hover:shadow-black/30"
        >
          <span className="w-7 h-7 rounded-full bg-indigo-soft dark:bg-indigo/15 flex items-center justify-center text-xs shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6">
            {tool.icon}
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
