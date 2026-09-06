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
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {quickTools.map((tool) => (
        <Link
          key={tool.href}
          href={tool.href}
          className="group relative block rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-indigo hover:shadow-2xl hover:shadow-indigo/15 dark:hover:shadow-black/30"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-indigo/0 group-hover:bg-indigo/15 blur-3xl transition-colors duration-500"
          />
          <span className="relative block w-11 h-11 rounded-xl bg-indigo-soft dark:bg-indigo/15 flex items-center justify-center text-lg mb-4 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6">
            {tool.icon}
          </span>
          <span className="relative block text-base font-medium text-ink dark:text-white group-hover:text-indigo transition-colors mb-1">
            {tool.label}
          </span>
          <span className="relative block text-sm text-muted">{tool.description}</span>
        </Link>
      ))}
    </div>
  );
}
