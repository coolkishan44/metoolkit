"use client";

import { useMemo, useState } from "react";

type Slab = { upto: number; rate: number };

// FY 2025-26 / FY 2026-27 (AY 2026-27 / 2027-28) — Income Tax Act 2025.
// New regime rebate is now Section 156 (renumbered from old 87A); slabs
// unchanged from Budget 2025 into FY 2026-27 as per Budget 2026.
const NEW_REGIME_SLABS: Slab[] = [
  { upto: 400000, rate: 0 },
  { upto: 800000, rate: 5 },
  { upto: 1200000, rate: 10 },
  { upto: 1600000, rate: 15 },
  { upto: 2000000, rate: 20 },
  { upto: 2400000, rate: 25 },
  { upto: Infinity, rate: 30 }
];
const NEW_REGIME_STANDARD_DEDUCTION = 75000;
const NEW_REGIME_REBATE_THRESHOLD = 1200000;
const NEW_REGIME_REBATE_MAX = 60000;

const OLD_REGIME_SLABS: Slab[] = [
  { upto: 250000, rate: 0 },
  { upto: 500000, rate: 5 },
  { upto: 1000000, rate: 20 },
  { upto: Infinity, rate: 30 }
];
const OLD_REGIME_STANDARD_DEDUCTION = 50000;
const OLD_REGIME_REBATE_THRESHOLD = 500000;
const OLD_REGIME_REBATE_MAX = 12500;

const CESS_RATE = 4;

function calculateSlabTax(taxableIncome: number, slabs: Slab[]): number {
  let tax = 0;
  let prevLimit = 0;
  for (const slab of slabs) {
    if (taxableIncome <= prevLimit) break;
    const taxableInSlab = Math.min(taxableIncome, slab.upto) - prevLimit;
    tax += (taxableInSlab * slab.rate) / 100;
    prevLimit = slab.upto;
  }
  return tax;
}

function formatINR(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export default function TaxCalculatorPage() {
  const [regime, setRegime] = useState<"new" | "old">("new");
  const [grossIncome, setGrossIncome] = useState("");
  const [otherDeductions, setOtherDeductions] = useState("");

  const gross = parseFloat(grossIncome) || 0;
  const deductions = parseFloat(otherDeductions) || 0;

  const result = useMemo(() => {
    const standardDeduction =
      regime === "new" ? NEW_REGIME_STANDARD_DEDUCTION : OLD_REGIME_STANDARD_DEDUCTION;
    const slabs = regime === "new" ? NEW_REGIME_SLABS : OLD_REGIME_SLABS;
    const rebateThreshold =
      regime === "new" ? NEW_REGIME_REBATE_THRESHOLD : OLD_REGIME_REBATE_THRESHOLD;
    const rebateMax = regime === "new" ? NEW_REGIME_REBATE_MAX : OLD_REGIME_REBATE_MAX;

    const extraDeductions = regime === "old" ? deductions : 0;
    const taxableIncome = Math.max(0, gross - standardDeduction - extraDeductions);

    const taxBeforeRebate = calculateSlabTax(taxableIncome, slabs);
    const rebate = taxableIncome <= rebateThreshold ? Math.min(taxBeforeRebate, rebateMax) : 0;
    const taxAfterRebate = taxBeforeRebate - rebate;
    const cess = (taxAfterRebate * CESS_RATE) / 100;
    const totalTax = taxAfterRebate + cess;
    const takeHome = gross - totalTax;
    const effectiveRate = gross > 0 ? (totalTax / gross) * 100 : 0;

    return {
      standardDeduction,
      taxableIncome,
      taxBeforeRebate,
      rebate,
      taxAfterRebate,
      cess,
      totalTax,
      takeHome,
      effectiveRate
    };
  }, [regime, gross, deductions]);

  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">Free tool</p>
      <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-3">
        Income Tax Calculator (India)
      </h1>
      <p className="text-muted mb-2 max-w-xl">
        Estimate your tax for FY 2025-26 / FY 2026-27 under the old or new regime.
      </p>
      <p className="text-xs text-muted mb-10 max-w-xl">
        This is an estimate for salaried individuals under 60, not tax advice. It excludes
        surcharge (applies above ₹50L) and assumes no other special-rate income. Confirm
        with a CA or the official e-filing calculator before filing.
      </p>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        {/* Inputs */}
        <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setRegime("new")}
              className={`flex-1 rounded-xl py-3 text-sm font-medium transition-colors ${
                regime === "new"
                  ? "bg-indigo text-white"
                  : "border border-line dark:border-white/10 text-ink dark:text-white hover:border-indigo"
              }`}
            >
              New Regime
            </button>
            <button
              onClick={() => setRegime("old")}
              className={`flex-1 rounded-xl py-3 text-sm font-medium transition-colors ${
                regime === "old"
                  ? "bg-indigo text-white"
                  : "border border-line dark:border-white/10 text-ink dark:text-white hover:border-indigo"
              }`}
            >
              Old Regime
            </button>
          </div>

          <label htmlFor="gross-income" className="block text-sm text-ink/80 dark:text-white/80 mb-2">
            Annual gross income (₹)
          </label>
          <input
            id="gross-income"
            type="text"
            inputMode="numeric"
            value={grossIncome}
            onChange={(e) => setGrossIncome(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="e.g. 1200000"
            className="w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#101118] text-ink dark:text-white px-4 py-3 text-lg font-mono focus-visible:outline-2 focus-visible:outline-indigo mb-6"
          />

          {regime === "old" && (
            <>
              <label
                htmlFor="other-deductions"
                className="block text-sm text-ink/80 dark:text-white/80 mb-2"
              >
                Other deductions — 80C, 80D, HRA, home loan interest, etc. (₹)
              </label>
              <input
                id="other-deductions"
                type="text"
                inputMode="numeric"
                value={otherDeductions}
                onChange={(e) => setOtherDeductions(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="e.g. 150000"
                className="w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#101118] text-ink dark:text-white px-4 py-3 text-lg font-mono focus-visible:outline-2 focus-visible:outline-indigo mb-6"
              />
            </>
          )}

          <div className="rounded-xl bg-paper dark:bg-[#101118] border border-line dark:border-white/10 p-5 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Standard deduction</span>
              <span className="font-mono tabular text-ink dark:text-white">
                {formatINR(result.standardDeduction)}
              </span>
            </div>
            {regime === "old" && deductions > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted">Other deductions</span>
                <span className="font-mono tabular text-ink dark:text-white">
                  {formatINR(deductions)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm pt-2 border-t border-line dark:border-white/10">
              <span className="text-muted">Taxable income</span>
              <span className="font-mono tabular text-ink dark:text-white">
                {formatINR(result.taxableIncome)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Tax before rebate</span>
              <span className="font-mono tabular text-ink dark:text-white">
                {formatINR(result.taxBeforeRebate)}
              </span>
            </div>
            {result.rebate > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted">Rebate (Sec 87A)</span>
                <span className="font-mono tabular text-indigo">
                  − {formatINR(result.rebate)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted">Health &amp; Education Cess (4%)</span>
              <span className="font-mono tabular text-ink dark:text-white">
                {formatINR(result.cess)}
              </span>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-ink dark:bg-white/[0.06] p-6">
            <p className="text-xs font-mono uppercase tracking-widest text-paper/60 dark:text-white/60 mb-2">
              Total tax payable
            </p>
            <p className="font-mono text-3xl tabular text-paper dark:text-white mb-1">
              {formatINR(result.totalTax)}
            </p>
            <p className="text-sm text-paper/60 dark:text-white/60">
              {result.effectiveRate.toFixed(1)}% effective rate
            </p>
          </div>

          <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6">
            <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">
              Take-home (annual)
            </p>
            <p className="font-mono text-2xl tabular text-ink dark:text-white">
              {formatINR(Math.max(0, result.takeHome))}
            </p>
            <p className="text-sm text-muted mt-1">
              ≈ {formatINR(Math.max(0, result.takeHome) / 12)} / month
            </p>
          </div>

          <p className="text-xs text-muted leading-relaxed">
            Calculation runs entirely in your browser — nothing you enter is sent anywhere.
          </p>
        </div>
      </div>
    </div>
  );
}
