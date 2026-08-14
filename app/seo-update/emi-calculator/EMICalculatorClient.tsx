"use client";

import { useMemo, useState } from "react";

function formatINR(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export default function EMICalculatorClient() {
  const [principal, setPrincipal] = useState("1000000");
  const [rate, setRate] = useState("9");
  const [tenureYears, setTenureYears] = useState("20");

  const P = parseFloat(principal) || 0;
  const annualRate = parseFloat(rate) || 0;
  const years = parseFloat(tenureYears) || 0;

  const result = useMemo(() => {
    const n = years * 12;
    const r = annualRate / 12 / 100;

    if (P <= 0 || n <= 0) {
      return { emi: 0, totalPayment: 0, totalInterest: 0 };
    }

    let emi: number;
    if (r === 0) {
      emi = P / n;
    } else {
      const factor = Math.pow(1 + r, n);
      emi = (P * r * factor) / (factor - 1);
    }

    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return { emi, totalPayment, totalInterest };
  }, [P, annualRate, years]);

  const interestShare = result.totalPayment > 0 ? (result.totalInterest / result.totalPayment) * 100 : 0;

  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">Free tool</p>
      <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-3">
        EMI Calculator
      </h1>
      <p className="text-muted mb-10 max-w-xl">
        Calculate your monthly EMI for home, car, or personal loans — with total
        interest and payment breakdown.
      </p>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6 space-y-6">
          <div>
            <label htmlFor="principal" className="block text-sm text-ink/80 dark:text-white/80 mb-2">
              Loan amount (₹)
            </label>
            <input
              id="principal"
              type="text"
              inputMode="numeric"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#101118] text-ink dark:text-white px-4 py-3 text-lg font-mono focus-visible:outline-2 focus-visible:outline-indigo"
            />
          </div>

          <div>
            <label htmlFor="rate" className="block text-sm text-ink/80 dark:text-white/80 mb-2">
              Interest rate (% per year)
            </label>
            <input
              id="rate"
              type="text"
              inputMode="decimal"
              value={rate}
              onChange={(e) => setRate(e.target.value.replace(/[^0-9.]/g, ""))}
              className="w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#101118] text-ink dark:text-white px-4 py-3 text-lg font-mono focus-visible:outline-2 focus-visible:outline-indigo"
            />
          </div>

          <div>
            <label htmlFor="tenure" className="block text-sm text-ink/80 dark:text-white/80 mb-2">
              Loan tenure (years)
            </label>
            <input
              id="tenure"
              type="text"
              inputMode="numeric"
              value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#101118] text-ink dark:text-white px-4 py-3 text-lg font-mono focus-visible:outline-2 focus-visible:outline-indigo"
            />
          </div>

          {/* Simple interest-vs-principal share bar */}
          <div>
            <div className="flex justify-between text-xs text-muted mb-2">
              <span>Principal</span>
              <span>Interest</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden bg-paper dark:bg-[#101118] border border-line dark:border-white/10 flex">
              <div className="bg-indigo h-full" style={{ width: `${100 - interestShare}%` }} />
              <div className="bg-amber h-full" style={{ width: `${interestShare}%` }} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-ink dark:bg-white/[0.06] p-6">
            <p className="text-xs font-mono uppercase tracking-widest text-paper/60 dark:text-white/60 mb-2">
              Monthly EMI
            </p>
            <p className="font-mono text-3xl tabular text-paper dark:text-white">
              {formatINR(result.emi)}
            </p>
          </div>

          <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6 space-y-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted mb-1">
                Total interest
              </p>
              <p className="font-mono text-xl tabular text-ink dark:text-white">
                {formatINR(result.totalInterest)}
              </p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted mb-1">
                Total payment
              </p>
              <p className="font-mono text-xl tabular text-ink dark:text-white">
                {formatINR(result.totalPayment)}
              </p>
            </div>
          </div>

          <p className="text-xs text-muted leading-relaxed">
            Estimate only — actual EMI may vary slightly based on your lender's
            calculation method and processing fees. Calculation runs in your browser.
          </p>
        </div>
      </div>
    </div>
  );
}
