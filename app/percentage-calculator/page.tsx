"use client";

import { useMemo, useState } from "react";

type Mode = "percentOf" | "whatPercent" | "change";

const modes: { id: Mode; label: string }[] = [
  { id: "percentOf", label: "X% of Y" },
  { id: "whatPercent", label: "X is what % of Y" },
  { id: "change", label: "% change" }
];

function formatNum(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState<Mode>("percentOf");
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  const xNum = parseFloat(x);
  const yNum = parseFloat(y);

  const result = useMemo(() => {
    if (Number.isNaN(xNum) || Number.isNaN(yNum)) return null;

    if (mode === "percentOf") {
      return { value: (xNum / 100) * yNum, suffix: "" };
    }
    if (mode === "whatPercent") {
      if (yNum === 0) return null;
      return { value: (xNum / yNum) * 100, suffix: "%" };
    }
    // change: from X to Y
    if (xNum === 0) return null;
    return { value: ((yNum - xNum) / Math.abs(xNum)) * 100, suffix: "%" };
  }, [mode, xNum, yNum]);

  const labels: Record<Mode, { x: string; y: string; sentence: (r: string) => string }> = {
    percentOf: {
      x: "Percentage (%)",
      y: "Of value",
      sentence: (r) => `${x || "X"}% of ${y || "Y"} is ${r}`
    },
    whatPercent: {
      x: "Value",
      y: "Out of",
      sentence: (r) => `${x || "X"} is ${r} of ${y || "Y"}`
    },
    change: {
      x: "From value",
      y: "To value",
      sentence: (r) => `Change from ${x || "X"} to ${y || "Y"} is ${r}`
    }
  };

  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">Free tool</p>
      <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-3">
        Percentage Calculator
      </h1>
      <p className="text-muted mb-10 max-w-xl">
        Three common percentage calculations in one place — no need to remember the formula.
      </p>

      <div className="max-w-lg">
        <div className="flex gap-2 mb-6">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex-1 rounded-xl py-3 text-sm font-medium transition-colors ${
                mode === m.id
                  ? "bg-indigo text-white"
                  : "border border-line dark:border-white/10 text-ink dark:text-white hover:border-indigo"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6 space-y-4">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label htmlFor="x-value" className="block text-sm text-ink/80 dark:text-white/80 mb-2">
                {labels[mode].x}
              </label>
              <input
                id="x-value"
                type="text"
                inputMode="decimal"
                value={x}
                onChange={(e) => setX(e.target.value.replace(/[^0-9.-]/g, ""))}
                placeholder="0"
                className="w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#101118] text-ink dark:text-white px-4 py-3 text-lg font-mono focus-visible:outline-2 focus-visible:outline-indigo"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="y-value" className="block text-sm text-ink/80 dark:text-white/80 mb-2">
                {labels[mode].y}
              </label>
              <input
                id="y-value"
                type="text"
                inputMode="decimal"
                value={y}
                onChange={(e) => setY(e.target.value.replace(/[^0-9.-]/g, ""))}
                placeholder="0"
                className="w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#101118] text-ink dark:text-white px-4 py-3 text-lg font-mono focus-visible:outline-2 focus-visible:outline-indigo"
              />
            </div>
          </div>

          <div className="rounded-xl bg-ink dark:bg-white/[0.06] p-5">
            <p className="text-xs font-mono uppercase tracking-widest text-paper/60 dark:text-white/60 mb-2">
              Result
            </p>
            <p className="font-mono text-2xl tabular text-paper dark:text-white mb-2">
              {result ? `${formatNum(result.value)}${result.suffix}` : "—"}
            </p>
            {result && (
              <p className="text-sm text-paper/70 dark:text-white/70">
                {labels[mode].sentence(`${formatNum(result.value)}${result.suffix}`)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
