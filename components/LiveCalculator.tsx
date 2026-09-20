"use client";

import Link from "next/link";
import { useState } from "react";

type Op = "+" | "−" | "×" | "÷" | null;

const KEYS = ["C", "←", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", ".", "="];

function fmt(n: number): string {
  if (!isFinite(n)) return "Error";
  const [i, d] = String(Math.round(n * 1e8) / 1e8).split(".");
  return Number(i).toLocaleString("en-IN") + (d ? "." + d : "");
}

export default function LiveCalculator() {
  const [cur, setCur] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<Op>(null);
  const [fresh, setFresh] = useState(false);

  function apply(a: number, b: number, o: Op): number {
    if (o === "+") return a + b;
    if (o === "−") return a - b;
    if (o === "×") return a * b;
    if (o === "÷") return b === 0 ? NaN : a / b;
    return b;
  }

  function press(k: string) {
    if (/[0-9]/.test(k)) {
      setCur(cur === "0" || fresh ? k : cur + k);
      setFresh(false);
    } else if (k === ".") {
      if (fresh) { setCur("0."); setFresh(false); }
      else if (!cur.includes(".")) setCur(cur + ".");
    } else if (k === "C") {
      setCur("0"); setPrev(null); setOp(null); setFresh(false);
    } else if (k === "←") {
      setCur(cur.length > 1 ? cur.slice(0, -1) : "0");
    } else if (k === "%") {
      setCur(String(Number(cur) / 100)); setFresh(true);
    } else if (k === "=") {
      if (op !== null && prev !== null) {
        setCur(String(apply(prev, Number(cur), op)));
        setPrev(null); setOp(null); setFresh(true);
      }
    } else {
      const next = op !== null && prev !== null && !fresh ? apply(prev, Number(cur), op) : Number(cur);
      setCur(String(next));
      setPrev(next);
      setOp(k as Op);
      setFresh(true);
    }
  }

  const display = cur === "" ? "0" : isNaN(Number(cur)) ? cur : fmt(Number(cur));

  return (
    <div className="group relative overflow-hidden rounded-[22px] bg-ink p-7 border border-white/5 shadow-lg shadow-black/10 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo/25">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-display text-lg text-white mb-1">Try it here</h3>
          <p className="text-sm text-white/45">The full calculator, running in this card.</p>
        </div>
        <Link
          href="/calculator"
          className="shrink-0 rounded-full bg-indigo px-3.5 py-1.5 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Open
        </Link>
      </div>

      <div className="rounded-2xl border border-white/8 bg-black/40 px-5 py-4 mb-3 text-right">
        <p className="font-mono text-xs tabular text-white/35 h-4">
          {op && prev !== null ? `${fmt(prev)} ${op}` : "\u00A0"}
        </p>
        <p className="font-mono font-bold text-[2.2rem] leading-tight tabular text-indigo">
          {display}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {KEYS.map((k) => {
          const isOp = ["÷", "×", "−", "+", "="].includes(k);
          return (
            <button
              key={k}
              onClick={() => press(k)}
              aria-label={k}
              className={`rounded-xl py-2.5 text-sm font-medium transition-all duration-150 active:scale-95 ${
                k === "0" ? "col-span-2" : ""
              } ${
                isOp
                  ? "bg-indigo text-white hover:brightness-110"
                  : "border border-white/8 bg-white/5 text-white/80 hover:border-indigo/40 hover:bg-indigo/15 hover:text-white"
              }`}
            >
              {k}
            </button>
          );
        })}
      </div>
    </div>
  );
}
