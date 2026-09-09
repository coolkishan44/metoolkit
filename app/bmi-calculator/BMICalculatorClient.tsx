"use client";

import { useMemo, useState } from "react";

type HeightUnit = "cm" | "ftin";
type WeightUnit = "kg" | "lbs";

const CATEGORIES = [
  { max: 18.5, label: "Underweight", color: "text-amber-dark" },
  { max: 25, label: "Normal", color: "text-indigo" },
  { max: 30, label: "Overweight", color: "text-amber-dark" },
  { max: Infinity, label: "Obese", color: "text-amber-dark" }
];

export default function BMICalculatorClient() {
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [cm, setCm] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");

  const result = useMemo(() => {
    let heightM = 0;
    if (heightUnit === "cm") {
      heightM = (parseFloat(cm) || 0) / 100;
    } else {
      const ft = parseFloat(feet) || 0;
      const inch = parseFloat(inches) || 0;
      heightM = (ft * 12 + inch) * 0.0254;
    }

    let weightKg = parseFloat(weight) || 0;
    if (weightUnit === "lbs") weightKg = weightKg * 0.453592;

    if (heightM <= 0 || weightKg <= 0) return null;

    const bmi = weightKg / (heightM * heightM);
    const category = CATEGORIES.find((c) => bmi < c.max) ?? CATEGORIES[CATEGORIES.length - 1];

    return { bmi, category };
  }, [heightUnit, weightUnit, cm, feet, inches, weight]);

  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">Free tool</p>
      <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-3">
        BMI Calculator
      </h1>
      <p className="text-muted mb-2 max-w-xl">
        Calculate your Body Mass Index using the standard WHO categories.
      </p>
      <p className="text-xs text-muted mb-10 max-w-xl">
        BMI is a general screening measure, not a diagnosis — it doesn't account for
        muscle mass, bone density, or body composition. Talk to a healthcare
        professional for a full picture of your health.
      </p>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-ink/80 dark:text-white/80">Height</label>
              <div className="flex gap-1 text-xs">
                <button
                  onClick={() => setHeightUnit("cm")}
                  className={`px-3 py-1 rounded-full ${heightUnit === "cm" ? "bg-indigo text-white" : "border border-line dark:border-white/10 text-muted"}`}
                >
                  cm
                </button>
                <button
                  onClick={() => setHeightUnit("ftin")}
                  className={`px-3 py-1 rounded-full ${heightUnit === "ftin" ? "bg-indigo text-white" : "border border-line dark:border-white/10 text-muted"}`}
                >
                  ft/in
                </button>
              </div>
            </div>
            {heightUnit === "cm" ? (
              <input
                type="text"
                inputMode="decimal"
                value={cm}
                onChange={(e) => setCm(e.target.value.replace(/[^0-9.]/g, ""))}
                placeholder="e.g. 170"
                className="w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#0F1712] text-ink dark:text-white px-4 py-3 text-lg font-mono focus-visible:outline-2 focus-visible:outline-indigo"
              />
            ) : (
              <div className="flex gap-3">
                <input
                  type="text"
                  inputMode="numeric"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="ft"
                  className="w-1/2 rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#0F1712] text-ink dark:text-white px-4 py-3 text-lg font-mono focus-visible:outline-2 focus-visible:outline-indigo"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  value={inches}
                  onChange={(e) => setInches(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="in"
                  className="w-1/2 rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#0F1712] text-ink dark:text-white px-4 py-3 text-lg font-mono focus-visible:outline-2 focus-visible:outline-indigo"
                />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-ink/80 dark:text-white/80">Weight</label>
              <div className="flex gap-1 text-xs">
                <button
                  onClick={() => setWeightUnit("kg")}
                  className={`px-3 py-1 rounded-full ${weightUnit === "kg" ? "bg-indigo text-white" : "border border-line dark:border-white/10 text-muted"}`}
                >
                  kg
                </button>
                <button
                  onClick={() => setWeightUnit("lbs")}
                  className={`px-3 py-1 rounded-full ${weightUnit === "lbs" ? "bg-indigo text-white" : "border border-line dark:border-white/10 text-muted"}`}
                >
                  lbs
                </button>
              </div>
            </div>
            <input
              type="text"
              inputMode="decimal"
              value={weight}
              onChange={(e) => setWeight(e.target.value.replace(/[^0-9.]/g, ""))}
              placeholder={weightUnit === "kg" ? "e.g. 65" : "e.g. 143"}
              className="w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#0F1712] text-ink dark:text-white px-4 py-3 text-lg font-mono focus-visible:outline-2 focus-visible:outline-indigo"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-ink dark:bg-white/[0.06] p-6">
            <p className="text-xs font-mono uppercase tracking-widest text-paper/60 dark:text-white/60 mb-2">
              Your BMI
            </p>
            <p className="font-mono text-3xl tabular text-paper dark:text-white mb-1">
              {result ? result.bmi.toFixed(1) : "—"}
            </p>
            {result && (
              <p className={`text-sm font-medium ${result.category.color}`}>
                {result.category.label}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6">
            <p className="text-xs font-mono uppercase tracking-widest text-muted mb-3">
              WHO categories
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span className="text-muted">Underweight</span><span className="font-mono">&lt; 18.5</span></li>
              <li className="flex justify-between"><span className="text-muted">Normal</span><span className="font-mono">18.5 – 24.9</span></li>
              <li className="flex justify-between"><span className="text-muted">Overweight</span><span className="font-mono">25 – 29.9</span></li>
              <li className="flex justify-between"><span className="text-muted">Obese</span><span className="font-mono">30+</span></li>
            </ul>
          </div>

          <p className="text-xs text-muted leading-relaxed">
            Calculation runs entirely in your browser — nothing you enter is sent anywhere.
          </p>
        </div>
      </div>
    </div>
  );
}
