"use client";

import { useMemo, useState } from "react";

const GST_RATES = [5, 12, 18, 28];

function formatINR(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  return "₹" + rounded.toLocaleString("en-IN");
}

export default function GSTCalculatorClient() {
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(18);

  const amt = parseFloat(amount) || 0;

  const result = useMemo(() => {
    if (mode === "add") {
      const gstAmount = (amt * rate) / 100;
      const total = amt + gstAmount;
      return {
        baseAmount: amt,
        gstAmount,
        cgst: gstAmount / 2,
        sgst: gstAmount / 2,
        total
      };
    } else {
      const baseAmount = (amt * 100) / (100 + rate);
      const gstAmount = amt - baseAmount;
      return {
        baseAmount,
        gstAmount,
        cgst: gstAmount / 2,
        sgst: gstAmount / 2,
        total: amt
      };
    }
  }, [amt, rate, mode]);

  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">Free tool</p>
      <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-3">
        GST Calculator
      </h1>
      <p className="text-muted mb-10 max-w-xl">
        Add or remove GST from an amount, with the CGST/SGST split for intra-state
        supply — India's standard GST rates.
      </p>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode("add")}
              className={`flex-1 rounded-xl py-3 text-sm font-medium transition-colors ${
                mode === "add"
                  ? "bg-indigo text-white"
                  : "border border-line dark:border-white/10 text-ink dark:text-white hover:border-indigo"
              }`}
            >
              Add GST
            </button>
            <button
              onClick={() => setMode("remove")}
              className={`flex-1 rounded-xl py-3 text-sm font-medium transition-colors ${
                mode === "remove"
                  ? "bg-indigo text-white"
                  : "border border-line dark:border-white/10 text-ink dark:text-white hover:border-indigo"
              }`}
            >
              Remove GST
            </button>
          </div>

          <label htmlFor="amount" className="block text-sm text-ink/80 dark:text-white/80 mb-2">
            {mode === "add" ? "Amount before GST (₹)" : "Amount including GST (₹)"}
          </label>
          <input
            id="amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            placeholder="e.g. 10000"
            className="w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#0F1712] text-ink dark:text-white px-4 py-3 text-lg font-mono focus-visible:outline-2 focus-visible:outline-indigo mb-6"
          />

          <p className="text-sm text-ink/80 dark:text-white/80 mb-2">GST rate</p>
          <div className="flex flex-wrap gap-2">
            {GST_RATES.map((r) => (
              <button
                key={r}
                onClick={() => setRate(r)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  rate === r
                    ? "bg-amber text-white"
                    : "border border-line dark:border-white/10 text-ink dark:text-white hover:border-amber"
                }`}
              >
                {r}%
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-ink dark:bg-white/[0.06] p-6">
            <p className="text-xs font-mono uppercase tracking-widest text-paper/60 dark:text-white/60 mb-2">
              {mode === "add" ? "Total (incl. GST)" : "Base amount (excl. GST)"}
            </p>
            <p className="font-mono text-3xl tabular text-paper dark:text-white">
              {formatINR(mode === "add" ? result.total : result.baseAmount)}
            </p>
          </div>

          <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted">GST amount ({rate}%)</span>
              <span className="font-mono tabular text-ink dark:text-white">
                {formatINR(result.gstAmount)}
              </span>
            </div>
            <div className="flex justify-between text-sm pt-3 border-t border-line dark:border-white/10">
              <span className="text-muted">CGST ({rate / 2}%)</span>
              <span className="font-mono tabular text-ink dark:text-white">
                {formatINR(result.cgst)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">SGST ({rate / 2}%)</span>
              <span className="font-mono tabular text-ink dark:text-white">
                {formatINR(result.sgst)}
              </span>
            </div>
          </div>

          <p className="text-xs text-muted leading-relaxed">
            CGST/SGST split applies to intra-state supply. For inter-state supply, the
            full amount is charged as IGST instead. Calculation runs in your browser.
          </p>
        </div>
      </div>
    </div>
  );
}
