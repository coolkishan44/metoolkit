"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  { href: "/calculator", icon: "🧮", name: "Calculator", tagline: "Everyday math", detail: "Add, subtract, multiply, divide — clean and fast.", category: "Utility" },
  { href: "/cash-counter", icon: "💵", name: "Cash Counter", tagline: "Notes & coins", detail: "Count Indian currency with Lakh/Crore totals.", category: "Finance" },
  { href: "/tax-calculator", icon: "🧾", name: "Tax Calculator", tagline: "Old vs new regime", detail: "Compare both regimes for FY 2025-26.", category: "Finance" },
  { href: "/emi-calculator", icon: "🏠", name: "EMI Calculator", tagline: "Loan planning", detail: "Monthly EMI, total interest, total payment.", category: "Finance" },
  { href: "/gst-calculator", icon: "🧮", name: "GST Calculator", tagline: "Add or remove GST", detail: "5% to 28%, with CGST/SGST split.", category: "Finance" },
  { href: "/percentage-calculator", icon: "％", name: "Percentage Calculator", tagline: "3 calculations", detail: "X% of Y, share, and percentage change.", category: "Utility" },
  { href: "/age-calculator", icon: "🎂", name: "Age Calculator", tagline: "Exact age", detail: "Years, months, days — and next birthday.", category: "Utility" },
  { href: "/bmi-calculator", icon: "⚖️", name: "BMI Calculator", tagline: "WHO categories", detail: "Metric or imperial, instant result.", category: "Health" },
  { href: "/unit-converter", icon: "🔁", name: "Unit Converter", tagline: "Length, weight, temp", detail: "Metric and imperial, both directions.", category: "Utility" },
];

const INTERVAL = 3200;

export default function ToolShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative rounded-3xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-7 shadow-xl shadow-black/5 dark:shadow-black/30 overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-indigo/10 blur-3xl"
      />

      <div className="relative flex items-center justify-between mb-6">
        <p className="text-xs font-mono uppercase tracking-widest text-muted">
          9 free tools
        </p>
        <span className="text-[11px] font-mono uppercase tracking-wide text-muted border border-line dark:border-white/10 rounded-full px-2 py-0.5">
          {slides[index].category}
        </span>
      </div>

      <div className="relative h-[168px]">
        {slides.map((slide, i) => (
          <div
            key={slide.href}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-all duration-500 ease-out ${
              i === index
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-6 pointer-events-none"
            }`}
          >
            <span className="w-14 h-14 rounded-2xl bg-indigo-soft dark:bg-indigo/15 flex items-center justify-center text-2xl mb-4">
              {slide.icon}
            </span>
            <p className="text-xs font-mono uppercase tracking-widest text-indigo mb-1">
              {slide.tagline}
            </p>
            <h2 className="font-display text-2xl text-ink dark:text-white mb-2">
              {slide.name}
            </h2>
            <p className="text-sm text-muted leading-relaxed">{slide.detail}</p>
          </div>
        ))}
      </div>

      <div className="relative flex items-center justify-between mt-6 pt-5 border-t border-line dark:border-white/10">
        <div className="flex gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide.href}
              onClick={() => setIndex(i)}
              aria-label={`Show ${slide.name}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-indigo"
                  : "w-1.5 bg-line dark:bg-white/20 hover:bg-indigo/50"
              }`}
            />
          ))}
        </div>

        <Link
          href={slides[index].href}
          className="group inline-flex items-center gap-1 text-sm font-medium text-indigo hover:gap-2 transition-all"
        >
          Open
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
