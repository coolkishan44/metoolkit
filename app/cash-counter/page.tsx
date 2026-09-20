"use client";

import { useEffect, useMemo, useState } from "react";

const NOTES = [2000, 500, 200, 100, 50, 20, 10];
const COINS = [20, 10, 5, 2, 1];

const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
  "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function twoDigit(n: number): string {
  if (n < 20) return ONES[n];
  return TENS[Math.floor(n / 10)] + (n % 10 ? " " + ONES[n % 10] : "");
}

function inWords(num: number): string {
  if (num === 0) return "Zero";
  let n = num;
  const out: string[] = [];
  const crore = Math.floor(n / 10000000); n %= 10000000;
  const lakh = Math.floor(n / 100000); n %= 100000;
  const thousand = Math.floor(n / 1000); n %= 1000;
  const hundred = Math.floor(n / 100); n %= 100;
  if (crore) out.push(twoDigit(crore) + " Crore");
  if (lakh) out.push(twoDigit(lakh) + " Lakh");
  if (thousand) out.push(twoDigit(thousand) + " Thousand");
  if (hundred) out.push(ONES[hundred] + " Hundred");
  if (n) out.push(twoDigit(n));
  return out.join(" ");
}

function formatINR(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

type Counts = Record<number, string>;
type Entry = { id: number; total: number; at: string };

const STORAGE_KEY = "metoolkit-cash-history";

export default function CashCounterClient() {
  const [notes, setNotes] = useState<Counts>({});
  const [coins, setCoins] = useState<Counts>({});
  const [expected, setExpected] = useState("");
  const [history, setHistory] = useState<Entry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      // ignore unreadable storage
    }
  }, []);

  function rowTotal(map: Counts, value: number): number {
    return (parseInt(map[value] || "0", 10) || 0) * value;
  }

  const total = useMemo(() => {
    const n = NOTES.reduce((sum, v) => sum + rowTotal(notes, v), 0);
    const c = COINS.reduce((sum, v) => sum + rowTotal(coins, v), 0);
    return n + c;
  }, [notes, coins]);

  const pieces = useMemo(() => {
    const n = NOTES.reduce((s, v) => s + (parseInt(notes[v] || "0", 10) || 0), 0);
    const c = COINS.reduce((s, v) => s + (parseInt(coins[v] || "0", 10) || 0), 0);
    return { notes: n, coins: c };
  }, [notes, coins]);

  const target = parseFloat(expected) || 0;
  const diff = target - total;
  const pct = target > 0 ? Math.min((total / target) * 100, 100) : 0;
  const state = target <= 0 ? "idle" : diff > 0 ? "short" : diff < 0 ? "over" : "exact";

  function update(kind: "note" | "coin", value: number, raw: string) {
    const clean = raw.replace(/[^0-9]/g, "");
    const setter = kind === "note" ? setNotes : setCoins;
    setter((prev) => ({ ...prev, [value]: clean }));
  }

  function reset() {
    setNotes({});
    setCoins({});
    setExpected("");
  }

  function save() {
    if (total <= 0) return;
    const entry: Entry = {
      id: Date.now(),
      total,
      at: new Date().toLocaleString("en-IN", {
        day: "numeric", month: "short", hour: "numeric", minute: "2-digit",
      }),
    };
    const next = [entry, ...history].slice(0, 8);
    setHistory(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage full or blocked — the count still shows on screen
    }
  }

  function clearHistory() {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // nothing to do
    }
  }

  function renderRows(list: number[], map: Counts, kind: "note" | "coin") {
    return list.map((value) => {
      const count = parseInt(map[value] || "0", 10) || 0;
      return (
        <div
          key={value}
          className="grid grid-cols-[4.5rem_1fr_6.5rem] items-center gap-3 py-2"
        >
          <span className="font-mono text-sm tabular text-ink dark:text-white">
            ₹{value}
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={map[value] || ""}
            onChange={(e) => update(kind, value, e.target.value)}
            placeholder="0"
            aria-label={`Number of ₹${value} ${kind}s`}
            className="w-full rounded-lg border border-line dark:border-white/10 bg-paper dark:bg-[#0F1712] text-ink dark:text-white px-3 py-2 text-sm font-mono tabular focus-visible:outline-2 focus-visible:outline-indigo"
          />
          <span
            className={`text-right font-mono text-sm tabular transition-colors ${
              count > 0 ? "text-ink dark:text-white" : "text-muted/50"
            }`}
          >
            {formatINR(count * value)}
          </span>
        </div>
      );
    });
  }

  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">Free tool</p>
      <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-3">
        Cash Counter
      </h1>
      <p className="text-muted mb-10 max-w-xl">
        Count Indian notes and coins, and check the drawer against the total it
        should hold.
      </p>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
        {/* ── counting ── */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6">
            <div className="grid grid-cols-[4.5rem_1fr_6.5rem] gap-3 pb-3 mb-1 border-b border-line dark:border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-muted">Note</span>
              <span className="text-xs font-mono uppercase tracking-widest text-muted">Count</span>
              <span className="text-xs font-mono uppercase tracking-widest text-muted text-right">Value</span>
            </div>
            {renderRows(NOTES, notes, "note")}
            <div className="flex justify-between pt-3 mt-2 border-t border-line dark:border-white/10 text-sm">
              <span className="text-muted">{pieces.notes} notes</span>
              <span className="font-mono tabular text-ink dark:text-white">
                {formatINR(NOTES.reduce((s, v) => s + rowTotal(notes, v), 0))}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6">
            <div className="grid grid-cols-[4.5rem_1fr_6.5rem] gap-3 pb-3 mb-1 border-b border-line dark:border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-muted">Coin</span>
              <span className="text-xs font-mono uppercase tracking-widest text-muted">Count</span>
              <span className="text-xs font-mono uppercase tracking-widest text-muted text-right">Value</span>
            </div>
            {renderRows(COINS, coins, "coin")}
            <div className="flex justify-between pt-3 mt-2 border-t border-line dark:border-white/10 text-sm">
              <span className="text-muted">{pieces.coins} coins</span>
              <span className="font-mono tabular text-ink dark:text-white">
                {formatINR(COINS.reduce((s, v) => s + rowTotal(coins, v), 0))}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={save}
              disabled={total <= 0}
              className="rounded-full bg-indigo px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
            >
              Save this count
            </button>
            <button
              onClick={reset}
              className="rounded-full border border-line dark:border-white/10 px-5 py-2.5 text-sm font-medium text-ink dark:text-white transition-colors hover:border-indigo"
            >
              Clear all
            </button>
          </div>
        </div>

        {/* ── totals ── */}
        <div className="space-y-6 lg:sticky lg:top-6">
          <div className="rounded-2xl bg-ink dark:bg-white/[0.06] p-6">
            <p className="text-xs font-mono uppercase tracking-widest text-paper/60 dark:text-white/60 mb-2">
              Total counted
            </p>
            <p className="font-mono text-3xl tabular text-paper dark:text-white mb-2">
              {formatINR(total)}
            </p>
            <p className="text-sm text-paper/60 dark:text-white/60 leading-relaxed">
              {inWords(total)} rupees
            </p>
          </div>

          {/* ── expected total ── */}
          <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6">
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
              className="w-full rounded-xl border border-line dark:border-white/10 bg-paper dark:bg-[#0F1712] text-ink dark:text-white px-4 py-3 text-lg font-mono tabular focus-visible:outline-2 focus-visible:outline-indigo mb-5"
            />

            <div className="h-1.5 rounded-full bg-line dark:bg-white/10 overflow-hidden mb-5">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  state === "exact" ? "bg-indigo" : "bg-amber"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>

            {state === "idle" && (
              <p className="text-sm text-muted">
                Enter what the drawer should hold to see what is still pending.
              </p>
            )}

            {state === "short" && (
              <>
                <p className="text-xs font-mono uppercase tracking-widest text-muted mb-1.5">
                  Still pending
                </p>
                <p className="font-mono text-3xl tabular text-amber-dark">
                  {formatINR(diff)}
                </p>
                <p className="text-sm text-muted mt-1.5">
                  {formatINR(total)} counted of {formatINR(target)}.
                </p>
              </>
            )}

            {state === "over" && (
              <>
                <p className="text-xs font-mono uppercase tracking-widest text-muted mb-1.5">
                  Extra in the drawer
                </p>
                <p className="font-mono text-3xl tabular text-amber-dark">
                  {formatINR(Math.abs(diff))}
                </p>
                <p className="text-sm text-muted mt-1.5">
                  More than the expected {formatINR(target)}.
                </p>
              </>
            )}

            {state === "exact" && (
              <>
                <p className="text-xs font-mono uppercase tracking-widest text-muted mb-1.5">
                  Tallies exactly
                </p>
                <p className="font-mono text-3xl tabular text-indigo">
                  {formatINR(target)}
                </p>
                <p className="text-sm text-muted mt-1.5">
                  The count matches the expected total.
                </p>
              </>
            )}
          </div>

          {history.length > 0 && (
            <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-mono uppercase tracking-widest text-muted">
                  Saved counts
                </p>
                <button
                  onClick={clearHistory}
                  className="text-xs text-muted hover:text-indigo transition-colors"
                >
                  Clear
                </button>
              </div>
              <ul className="space-y-2">
                {history.map((h) => (
                  <li key={h.id} className="flex justify-between text-sm">
                    <span className="text-muted">{h.at}</span>
                    <span className="font-mono tabular text-ink dark:text-white">
                      {formatINR(h.total)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-xs text-muted leading-relaxed">
            Counting runs in your browser. Saved counts stay in this device's
            storage and are never uploaded.
          </p>
        </div>
      </div>
    </div>
  );
}
