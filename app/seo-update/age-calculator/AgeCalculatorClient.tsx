"use client";

import { useMemo, useState } from "react";

function todayISO(): string {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().slice(0, 10);
}

function daysBetween(a: Date, b: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((b.getTime() - a.getTime()) / msPerDay);
}

export default function AgeCalculatorClient() {
  const [dob, setDob] = useState("");
  const [asOf, setAsOf] = useState("");

  const result = useMemo(() => {
    if (!dob) return null;

    const dobDate = new Date(dob + "T00:00:00");
    const asOfDate = new Date((asOf || todayISO()) + "T00:00:00");

    if (Number.isNaN(dobDate.getTime()) || dobDate > asOfDate) return null;

    let years = asOfDate.getFullYear() - dobDate.getFullYear();
    let months = asOfDate.getMonth() - dobDate.getMonth();
    let days = asOfDate.getDate() - dobDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(asOfDate.getFullYear(), asOfDate.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = daysBetween(dobDate, asOfDate);

    // Next birthday from asOfDate
    let nextBirthday = new Date(asOfDate.getFullYear(), dobDate.getMonth(), dobDate.getDate());
    if (nextBirthday < asOfDate) {
      nextBirthday = new Date(asOfDate.getFullYear() + 1, dobDate.getMonth(), dobDate.getDate());
    }
    const daysToNextBirthday = daysBetween(asOfDate, nextBirthday);

    return { years, months, days, totalDays, daysToNextBirthday };
  }, [dob, asOf]);

  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">Free tool</p>
      <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-3">
        Age Calculator
      </h1>
      <p className="text-muted mb-10 max-w-xl">
        Find your exact age in years, months, and days — plus how long until your next birthday.
      </p>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6 space-y-6">
          <div>
            <label htmlFor="dob" className="block text-sm text-ink/80 dark:text-white/80 mb-2">
              Date of birth
            </label>
            <input
              id="dob"
              type="date"
              value={dob}
              max={todayISO()}
              onChange={(e) => setDob(e.target.value)}
              className="w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#101118] text-ink dark:text-white px-4 py-3 text-base font-mono focus-visible:outline-2 focus-visible:outline-indigo [color-scheme:light] dark:[color-scheme:dark]"
            />
          </div>

          <div>
            <label htmlFor="as-of" className="block text-sm text-ink/80 dark:text-white/80 mb-2">
              Calculate age as of (optional — defaults to today)
            </label>
            <input
              id="as-of"
              type="date"
              value={asOf}
              onChange={(e) => setAsOf(e.target.value)}
              placeholder={todayISO()}
              className="w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#101118] text-ink dark:text-white px-4 py-3 text-base font-mono focus-visible:outline-2 focus-visible:outline-indigo [color-scheme:light] dark:[color-scheme:dark]"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-ink dark:bg-white/[0.06] p-6">
            <p className="text-xs font-mono uppercase tracking-widest text-paper/60 dark:text-white/60 mb-2">
              Your age
            </p>
            {result ? (
              <p className="font-mono text-2xl tabular text-paper dark:text-white">
                {result.years}y {result.months}m {result.days}d
              </p>
            ) : (
              <p className="font-mono text-2xl tabular text-paper/40 dark:text-white/40">—</p>
            )}
          </div>

          <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6 space-y-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted mb-1">
                Total days lived
              </p>
              <p className="font-mono text-xl tabular text-ink dark:text-white">
                {result ? result.totalDays.toLocaleString("en-IN") : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted mb-1">
                Days to next birthday
              </p>
              <p className="font-mono text-xl tabular text-ink dark:text-white">
                {result ? result.daysToNextBirthday : "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
