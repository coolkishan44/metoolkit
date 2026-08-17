"use client";

import { useState } from "react";

const buttons = [
  ["C", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "="]
];

function calculate(a: number, b: number, op: string): number {
  switch (op) {
    case "+":
      return a + b;
    case "−":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? NaN : a / b;
    default:
      return b;
  }
}

export default function CalculatorClient() {
  const [display, setDisplay] = useState("0");
  const [stored, setStored] = useState<number | null>(null);
  const [pendingOp, setPendingOp] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(true);

  function pressDigit(d: string) {
    if (overwrite) {
      setDisplay(d === "." ? "0." : d);
      setOverwrite(false);
      return;
    }
    if (d === "." && display.includes(".")) return;
    setDisplay(display === "0" && d !== "." ? d : display + d);
  }

  function pressOperator(op: string) {
    const current = parseFloat(display);

    if (op === "C") {
      setDisplay("0");
      setStored(null);
      setPendingOp(null);
      setOverwrite(true);
      return;
    }
    if (op === "±") {
      setDisplay((current * -1).toString());
      return;
    }
    if (op === "%") {
      setDisplay((current / 100).toString());
      return;
    }
    if (op === "=") {
      if (stored !== null && pendingOp) {
        const result = calculate(stored, current, pendingOp);
        setDisplay(Number.isNaN(result) ? "Error" : trimResult(result));
        setStored(null);
        setPendingOp(null);
        setOverwrite(true);
      }
      return;
    }
    if (stored !== null && pendingOp && !overwrite) {
      const result = calculate(stored, current, pendingOp);
      setStored(result);
      setDisplay(trimResult(result));
    } else {
      setStored(current);
    }
    setPendingOp(op);
    setOverwrite(true);
  }

  function trimResult(n: number): string {
    if (!Number.isFinite(n)) return "Error";
    const rounded = Math.round(n * 1e10) / 1e10;
    return rounded.toString();
  }

  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">Free tool</p>
      <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-3">
        Calculator
      </h1>
      <p className="text-muted mb-10 max-w-xl">
        A straightforward calculator for everyday math — no ads, no sign-up.
      </p>

      <div className="max-w-sm rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-5 shadow-sm dark:shadow-none animate-fade-up transition-shadow duration-300 hover:shadow-xl hover:shadow-indigo/5">
        <div className="mb-4 rounded-xl bg-paper dark:bg-[#101118] border border-line dark:border-white/10 px-4 py-6 text-right transition-shadow duration-300 focus-within:shadow-[0_0_0_3px_rgba(45,91,255,0.15)]">
          <p className="font-mono text-3xl tabular text-ink dark:text-white break-all">
            {display}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {buttons.flat().map((btn, i) => {
            const isDigit = /[0-9.]/.test(btn);
            const isEquals = btn === "=";
            const isZero = btn === "0";
            return (
              <button
                key={`${btn}-${i}`}
                onClick={() => (isDigit ? pressDigit(btn) : pressOperator(btn))}
                className={`h-14 rounded-xl font-mono text-lg transition-all duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
                  isZero ? "col-span-2" : ""
                } ${
                  isEquals
                    ? "bg-indigo text-white hover:bg-indigo-dark hover:shadow-lg hover:shadow-indigo/40"
                    : isDigit
                    ? "bg-paper dark:bg-white/[0.06] text-ink dark:text-white hover:bg-line dark:hover:bg-white/[0.12] hover:shadow-md"
                    : "bg-ink/5 dark:bg-white/[0.08] text-ink dark:text-white hover:bg-ink/10 dark:hover:bg-white/[0.15] hover:shadow-md"
                }`}
              >
                {btn}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
