"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const searchIndex = [
  { label: "Calculator", href: "/calculator", type: "Tool", description: "Everyday math" },
  { label: "Cash Counter", href: "/cash-counter", type: "Tool", description: "Count Indian notes & coins" },
  { label: "Tax Calculator", href: "/tax-calculator", type: "Tool", description: "Old vs new regime (India)" },
  { label: "EMI Calculator", href: "/emi-calculator", type: "Tool", description: "Loan EMI & interest" },
  { label: "GST Calculator", href: "/gst-calculator", type: "Tool", description: "Add/remove GST, CGST/SGST" },
  { label: "Percentage Calculator", href: "/percentage-calculator", type: "Tool", description: "3 common percent calcs" },
  { label: "Age Calculator", href: "/age-calculator", type: "Tool", description: "Exact age & next birthday" },
  { label: "BMI Calculator", href: "/bmi-calculator", type: "Tool", description: "Standard WHO BMI categories" },
  { label: "Unit Converter", href: "/unit-converter", type: "Tool", description: "Length, weight, temperature" },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const results = query.trim()
    ? searchIndex.filter(
        (t) => t.label.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={boxRef} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search tools…"
        className="w-full rounded-full border border-line dark:border-white/10 bg-paper dark:bg-[#0F1712] text-ink dark:text-white px-5 py-3 text-sm placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-indigo"
      />
      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#0F1712] shadow-xl shadow-black/5 dark:shadow-black/30 overflow-hidden z-50">
          {results.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
              className="flex items-center justify-between px-4 py-3 hover:bg-indigo-soft dark:hover:bg-indigo/10 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-ink dark:text-white">
                  {tool.label}
                </p>
                <p className="text-xs text-muted">{tool.description}</p>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wide text-muted border border-line dark:border-white/10 rounded-full px-2 py-0.5">
                {tool.type}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
