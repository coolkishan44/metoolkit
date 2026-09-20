import Link from "next/link";
import LiveCalculator from "./LiveCalculator";

const arrow = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M7 17L17 7M17 7H9M17 7v8" />
  </svg>
);

const cellBase =
  "group relative overflow-hidden rounded-[22px] border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-indigo/40 hover:shadow-2xl hover:shadow-indigo/20 dark:hover:shadow-black/40";

const goBadge =
  "absolute top-4 right-4 w-[30px] h-[30px] rounded-full grid place-items-center bg-ink dark:bg-indigo text-white opacity-0 translate-x-1 translate-y-1 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0";

const small = [
  { href: "/gst-calculator", icon: "🧾", name: "GST Calculator", desc: "Add or remove, with the CGST/SGST split.", eg: "₹10,000 + 18% → ₹11,800", tint: "bg-indigo-soft dark:bg-indigo/10" },
  { href: "/tax-calculator", icon: "📊", name: "Income Tax", desc: "Old and new regime, side by side.", eg: "₹12L → new ₹0", tint: "bg-amber/10" },
  { href: "/percentage-calculator", icon: "％", name: "Percentage", desc: "Percent of, share, and change.", eg: "18% of 2,450 → 441", tint: "" },
  { href: "/age-calculator", icon: "🎂", name: "Age Calculator", desc: "To the day, plus next birthday.", eg: "12 Apr 1998 → 28y 5m", tint: "" },
  { href: "/unit-converter", icon: "🔁", name: "Unit Converter", desc: "Length, weight, temperature.", eg: "5 ft 9 in → 175.26 cm", tint: "bg-indigo-soft dark:bg-indigo/10" },
  { href: "/bmi-calculator", icon: "⚖️", name: "BMI Calculator", desc: "WHO categories, either unit.", eg: "170 cm · 65 kg → 22.5", tint: "" },
];

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* EMI — big dark cell, 2×2 */}
      <Link
        href="/emi-calculator"
        className="group relative overflow-hidden rounded-[22px] bg-ink border border-white/5 p-7 md:col-span-2 md:row-span-2 shadow-lg shadow-black/10 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo/30"
      >
        <span className={goBadge}>{arrow}</span>
        <p className="font-mono text-[10px] tracking-[.18em] text-indigo mb-2">MOST USED</p>
        <h2 className="font-display text-2xl text-white mb-1.5">EMI Calculator</h2>
        <p className="text-sm text-white/55 mb-7 max-w-[34ch]">
          Monthly instalment, total interest and the full repayment, for any loan.
        </p>

        <div className="rounded-2xl border border-white/8 bg-black/30 p-5 mb-5">
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-xs text-white/40">₹25,00,000 · 8.5% · 20 yr</span>
            <span className="font-mono text-[10px] text-indigo">LIVE</span>
          </div>
          <p className="font-mono font-bold text-[2.6rem] leading-none tabular text-indigo mb-1">₹21,694</p>
          <p className="text-xs text-white/45">per month · ₹27,06,560 total interest</p>

          <div className="flex items-end gap-1.5 h-14 mt-5">
            {[22, 34, 46, 58, 70, 84, 100].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-sm bg-indigo"
                style={{ height: `${h}%`, opacity: 0.25 + i * 0.12 }}
              />
            ))}
          </div>
          <p className="text-[10px] text-white/30 mt-2">Interest paid, year 1 → year 20</p>
        </div>

        <p className="font-mono text-[11px] text-white/35">EMI = P×r×(1+r)ⁿ ÷ ((1+r)ⁿ−1)</p>
      </Link>

      {/* GST + Tax */}
      {small.slice(0, 2).map((t) => (
        <Link key={t.href} href={t.href} className={`${cellBase} ${t.tint}`}>
          <span className={goBadge}>{arrow}</span>
          <span className="text-xl block mb-3">{t.icon}</span>
          <h3 className="font-display text-base text-ink dark:text-white mb-1">{t.name}</h3>
          <p className="text-sm text-muted leading-snug mb-4">{t.desc}</p>
          <p className="font-mono text-xs tabular text-indigo">{t.eg}</p>
        </Link>
      ))}

      {/* Cash counter — wide 2×1 */}
      <Link href="/cash-counter" className={`${cellBase} md:col-span-2`}>
        <span className={goBadge}>{arrow}</span>
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <span className="text-xl block mb-3">💵</span>
            <h3 className="font-display text-base text-ink dark:text-white mb-1">Cash Counter</h3>
            <p className="text-sm text-muted leading-snug">Count notes and coins, totalled in Lakh and Crore.</p>
          </div>
          <div className="shrink-0 text-right">
            <div className="space-y-1 font-mono text-[11px] tabular text-muted mb-2">
              <p>12 × ₹500 <span className="text-ink dark:text-white">6,000</span></p>
              <p>8 × ₹200 <span className="text-ink dark:text-white">1,600</span></p>
              <p>5 × ₹20 <span className="text-ink dark:text-white">100</span></p>
            </div>
            <p className="font-mono font-bold text-2xl tabular text-indigo border-t border-line dark:border-white/10 pt-2">₹7,700</p>
          </div>
        </div>
      </Link>

      {/* Live calculator — 2×2 */}
      <div className="md:col-span-2 md:row-span-2">
        <LiveCalculator />
      </div>

      {/* remaining four */}
      {small.slice(2).map((t) => (
        <Link key={t.href} href={t.href} className={`${cellBase} ${t.tint}`}>
          <span className={goBadge}>{arrow}</span>
          <span className="text-xl block mb-3">{t.icon}</span>
          <h3 className="font-display text-base text-ink dark:text-white mb-1">{t.name}</h3>
          <p className="text-sm text-muted leading-snug mb-4">{t.desc}</p>
          <p className="font-mono text-xs tabular text-indigo">{t.eg}</p>
        </Link>
      ))}
    </div>
  );
}
