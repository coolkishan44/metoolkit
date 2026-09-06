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

export default function MiniCalculatorPreview() {
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
    return (Math.round(n * 1e8) / 1e8).toString();
  }

  return (
    <div className="w-full max-w-[320px] rounded-[26px] border border-white/60 dark:border-white/10 glass-panel p-5 shadow-[0_2px_8px_rgba(22,35,29,0.06),0_30px_60px_-20px_rgba(22,35,29,0.35)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3),0_30px_60px_-20px_rgba(0,0,0,0.5)]">
      <div className="mb-3.5 rounded-2xl bg-ink dark:bg-black/40 px-4 py-4 text-right">
        <p className="font-mono text-3xl tabular text-paper break-all">{display}</p>
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
              className={`h-[46px] rounded-xl font-mono text-base transition-all duration-150 ease-out hover:-translate-y-0.5 active:scale-95 ${
                isZero ? "col-span-2" : ""
              } ${
                isEquals
                  ? "bg-gradient-to-br from-indigo to-indigo-dark text-white hover:shadow-lg hover:shadow-indigo/40"
                  : isDigit
                  ? "bg-ink/5 dark:bg-white/10 text-ink dark:text-white hover:shadow-md"
                  : "bg-amber-soft dark:bg-amber/15 text-amber-dark dark:text-amber hover:shadow-md"
              }`}
            >
              {btn}
            </button>
          );
        })}
      </div>
      <p className="text-center text-xs font-mono text-muted mt-3.5">move your mouse over this card</p>
    </div>
  );
}
