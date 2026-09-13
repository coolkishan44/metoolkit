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

const INTERVAL = 3600;

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

  const active = slides[index];

  return (
    <>
      <style>{`
        @keyframes ts-led {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes ts-in {
          from { opacity: 0; transform: translateY(14px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ts-bar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes ts-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        .ts-led {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 190%;
          aspect-ratio: 1;
          transform: translate(-50%, -50%);
          animation: ts-led 6s linear infinite;
          opacity: 0.75;
          transition: opacity 400ms ease;
        }
        .ts-shell:hover .ts-led { opacity: 1; animation-duration: 2.6s; }
        .ts-led-a { background: conic-gradient(from 0deg, transparent 0deg, currentColor 55deg, transparent 130deg); }
        .ts-led-b { background: conic-gradient(from 180deg, transparent 0deg, currentColor 45deg, transparent 110deg); animation-duration: 8s; animation-direction: reverse; }
        .ts-shell:hover .ts-led-b { animation-duration: 3.4s; }
        .ts-slide { animation: ts-in 520ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        .ts-icon { animation: ts-float 4s ease-in-out infinite; }
        .ts-bar {
          transform-origin: left;
          animation: ts-bar linear forwards;
          animation-duration: ${INTERVAL}ms;
        }
        @media (prefers-reduced-motion: reduce) {
          .ts-led, .ts-icon, .ts-bar { animation: none; }
          .ts-slide { animation-duration: 1ms; }
        }
      `}</style>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="ts-shell group relative rounded-[26px] p-[2px] overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo/25 dark:hover:shadow-black/50"
      >
        <span aria-hidden="true" className="ts-led ts-led-a text-indigo" />
        <span aria-hidden="true" className="ts-led ts-led-b text-amber" />

        <div className="relative rounded-[24px] bg-paper dark:bg-[#0F1712] p-7 overflow-hidden">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-indigo/10 blur-3xl transition-all duration-700 group-hover:bg-indigo/25 group-hover:scale-125"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-20 w-56 h-56 rounded-full bg-amber/5 blur-3xl transition-all duration-700 group-hover:bg-amber/20"
          />

          <div className="relative flex items-center justify-between mb-6">
            <p className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-indigo animate-ping" />
                <span className="relative w-2 h-2 rounded-full bg-indigo" />
              </span>
              9 free tools
            </p>
            <span
              key={active.category + index}
              className="ts-slide text-[11px] font-mono uppercase tracking-wide text-muted border border-line dark:border-white/10 rounded-full px-2 py-0.5"
            >
              {active.category}
            </span>
          </div>

          <div className="relative h-[176px]">
            {slides.map((slide, i) =>
              i === index ? (
                <div key={slide.href} className="ts-slide absolute inset-0">
                  <span className="ts-icon w-14 h-14 rounded-2xl bg-indigo-soft dark:bg-indigo/15 flex items-center justify-center text-2xl mb-4 shadow-lg shadow-indigo/10 transition-transform duration-300 group-hover:scale-110">
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
              ) : null
            )}
          </div>

          <div className="relative mt-6 h-px bg-line dark:bg-white/10 overflow-hidden">
            <span
              key={index}
              aria-hidden="true"
              className="ts-bar absolute inset-0 bg-gradient-to-r from-indigo to-amber"
              style={{ animationPlayState: paused ? "paused" : "running" }}
            />
          </div>

          <div className="relative flex items-center justify-between mt-5">
            <div className="flex gap-1.5">
              {slides.map((slide, i) => (
                <button
                  key={slide.href}
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${slide.name}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                    i === index
                      ? "w-7 bg-indigo shadow-[0_0_10px_2px] shadow-indigo/50"
                      : "w-1.5 bg-line dark:bg-white/20 hover:w-3 hover:bg-indigo/60"
                  }`}
                />
              ))}
            </div>

            <Link
              href={active.href}
              className="group/btn inline-flex items-center gap-1.5 rounded-full border border-indigo/30 px-4 py-1.5 text-sm font-medium text-indigo transition-all duration-300 hover:border-indigo hover:bg-indigo hover:text-white hover:shadow-lg hover:shadow-indigo/30"
            >
              Open
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
