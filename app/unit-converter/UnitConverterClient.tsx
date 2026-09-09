"use client";

import { useMemo, useState } from "react";

type Category = "length" | "weight" | "temperature";

const LENGTH_UNITS: Record<string, number> = {
  Millimeter: 0.001,
  Centimeter: 0.01,
  Meter: 1,
  Kilometer: 1000,
  Inch: 0.0254,
  Foot: 0.3048,
  Yard: 0.9144,
  Mile: 1609.34
};

const WEIGHT_UNITS: Record<string, number> = {
  Milligram: 0.000001,
  Gram: 0.001,
  Kilogram: 1,
  Tonne: 1000,
  Ounce: 0.0283495,
  Pound: 0.453592
};

const TEMP_UNITS = ["Celsius", "Fahrenheit", "Kelvin"];

function convertTemp(value: number, from: string, to: string): number {
  if (from === to) return value;
  let celsius: number;
  if (from === "Celsius") celsius = value;
  else if (from === "Fahrenheit") celsius = ((value - 32) * 5) / 9;
  else celsius = value - 273.15;

  if (to === "Celsius") return celsius;
  if (to === "Fahrenheit") return (celsius * 9) / 5 + 32;
  return celsius + 273.15;
}

export default function UnitConverterClient() {
  const [category, setCategory] = useState<Category>("length");
  const [value, setValue] = useState("1");

  const units =
    category === "length"
      ? Object.keys(LENGTH_UNITS)
      : category === "weight"
      ? Object.keys(WEIGHT_UNITS)
      : TEMP_UNITS;

  const [from, setFrom] = useState(units[0]);
  const [to, setTo] = useState(units[1]);

  function switchCategory(c: Category) {
    setCategory(c);
    const newUnits = c === "length" ? Object.keys(LENGTH_UNITS) : c === "weight" ? Object.keys(WEIGHT_UNITS) : TEMP_UNITS;
    setFrom(newUnits[0]);
    setTo(newUnits[1]);
  }

  const result = useMemo(() => {
    const v = parseFloat(value) || 0;
    if (category === "temperature") return convertTemp(v, from, to);
    const factors = category === "length" ? LENGTH_UNITS : WEIGHT_UNITS;
    const base = v * (factors[from] ?? 1);
    return base / (factors[to] ?? 1);
  }, [value, from, to, category]);

  const currentUnits =
    category === "length" ? Object.keys(LENGTH_UNITS) : category === "weight" ? Object.keys(WEIGHT_UNITS) : TEMP_UNITS;

  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">Free tool</p>
      <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-3">
        Unit Converter
      </h1>
      <p className="text-muted mb-10 max-w-xl">
        Convert length, weight, and temperature instantly.
      </p>

      <div className="max-w-lg">
        <div className="flex gap-2 mb-6">
          {(["length", "weight", "temperature"] as Category[]).map((c) => (
            <button
              key={c}
              onClick={() => switchCategory(c)}
              className={`flex-1 rounded-xl py-3 text-sm font-medium capitalize transition-colors ${
                category === c
                  ? "bg-indigo text-white"
                  : "border border-line dark:border-white/10 text-ink dark:text-white hover:border-indigo"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6 space-y-5">
          <div>
            <label className="block text-sm text-ink/80 dark:text-white/80 mb-2">Value</label>
            <input
              type="text"
              inputMode="decimal"
              value={value}
              onChange={(e) => setValue(e.target.value.replace(/[^0-9.-]/g, ""))}
              className="w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#0F1712] text-ink dark:text-white px-4 py-3 text-lg font-mono focus-visible:outline-2 focus-visible:outline-indigo"
            />
          </div>

          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-sm text-ink/80 dark:text-white/80 mb-2">From</label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#0F1712] text-ink dark:text-white px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-indigo"
              >
                {currentUnits.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                setFrom(to);
                setTo(from);
              }}
              aria-label="Swap units"
              className="mb-1 w-10 h-10 shrink-0 rounded-full border border-line dark:border-white/10 flex items-center justify-center hover:border-indigo hover:text-indigo transition-colors"
            >
              ⇄
            </button>
            <div className="flex-1">
              <label className="block text-sm text-ink/80 dark:text-white/80 mb-2">To</label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#0F1712] text-ink dark:text-white px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-indigo"
              >
                {currentUnits.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-xl bg-ink dark:bg-white/[0.06] p-5">
            <p className="text-xs font-mono uppercase tracking-widest text-paper/60 dark:text-white/60 mb-2">
              Result
            </p>
            <p className="font-mono text-2xl tabular text-paper dark:text-white">
              {Number.isFinite(result) ? result.toLocaleString("en-IN", { maximumFractionDigits: 6 }) : "—"}
              <span className="text-base text-paper/60 dark:text-white/60 ml-2">{to}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
