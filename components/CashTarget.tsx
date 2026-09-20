"use client";

import { useState } from "react";

function formatINR(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export default function CashTarget({ counted }: { counted: number }) {
  const [expected, setExpected] = useState("");

  const target = parseFloat(expected) || 0;
  const diff = target - counted;
  const pct = target > 0 ? Math.min((counted / target) * 100, 100) : 0;

  const state =
    target <= 0 ? "idle" : diff > 0 ? "short" : diff < 0 ? "over" : "exact";

  const tone = {
    idle: { text: "text-muted", bar: "bg-line dark:bg-white/20" },
    short: { text: "text-amber-dark", bar: "bg-amber" },
    over: { text: "text-amber-dark", bar: "bg-amber" },
    exact: { text: "text-indigo", bar: "bg-indigo" },
  }[state];

  return (
    <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6">
      <h3 className="font-display text-lg text-ink dark:text-white mb-1">
        Check against an expected total
      </h3>
      <p className="text-sm text-muted mb-5">
        Enter what the till should hold. The difference updates as you count.
      </p>

      <label
        htmlFor="expected"
        className="block text-sm text-ink/80 dark:text-white/80 mb-2"
      >
        Expected total (₹)
      </label>
      <input
        id="expected"
        type="text"
        inputMode="decimal"
        value={expected}
        onChange={(e) => setExpected(e.target.value.replace(/[^0-9.]/g, ""))}
        placeholder="e.g. 25000"
        className="w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#0F1712] text-ink dark:text-white px-4 py-3 text-lg font-mono tabular focus-visible:outline-2 focus-visible:outline-indigo mb-6"
      />

      <div className="h-1.5 rounded-full bg-line dark:bg-white/10 overflow-hidden mb-6">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${tone.bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <dl className="space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Expected</dt>
          <dd className="font-mono tabular text-ink dark:text-white">
            {target > 0 ? formatINR(target) : "—"}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Counted</dt>
          <dd className="font-mono tabular text-ink dark:text-white">
            {formatINR(counted)}
          </dd>
        </div>
      </dl>

      <div className="mt-5 pt-5 border-t border-line dark:border-white/10">
        {state === "idle" && (
          <p className="text-sm text-muted">
            Enter an expected total to see what is still pending.
          </p>
        )}

        {state === "short" && (
          <>
            <p className="text-xs font-mono uppercase tracking-widest text-muted mb-1.5">
              Still pending
            </p>
            <p className={`font-mono font-bold text-3xl tabular ${tone.text}`}>
              {formatINR(diff)}
            </p>
            <p className="text-sm text-muted mt-1.5">
              {formatINR(counted)} counted of {formatINR(target)}.
            </p>
          </>
        )}

        {state === "over" && (
          <>
            <p className="text-xs font-mono uppercase tracking-widest text-muted mb-1.5">
              Extra in the drawer
            </p>
            <p className={`font-mono font-bold text-3xl tabular ${tone.text}`}>
              {formatINR(Math.abs(diff))}
            </p>
            <p className="text-sm text-muted mt-1.5">
              You counted more than the expected {formatINR(target)}.
            </p>
          </>
        )}

        {state === "exact" && (
          <>
            <p className="text-xs font-mono uppercase tracking-widest text-muted mb-1.5">
              Tallies exactly
            </p>
            <p className={`font-mono font-bold text-3xl tabular ${tone.text}`}>
              {formatINR(target)}
            </p>
            <p className="text-sm text-muted mt-1.5">
              The count matches the expected total.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
