"use client";

import { useEffect, useState, useCallback, useRef } from "react";

type Denom = {
  value: number;
  label: string;
  kind: "Note" | "Coin" | "Note / Coin";
};

const DENOMINATIONS: Denom[] = [
  { value: 500, label: "₹500", kind: "Note" },
  { value: 200, label: "₹200", kind: "Note" },
  { value: 100, label: "₹100", kind: "Note" },
  { value: 50, label: "₹50", kind: "Note" },
  { value: 20, label: "₹20", kind: "Note" },
  { value: 10, label: "₹10", kind: "Note / Coin" },
  { value: 5, label: "₹5", kind: "Coin" },
  { value: 2, label: "₹2", kind: "Coin" },
  { value: 1, label: "₹1", kind: "Coin" }
];

type Counts = Record<number, number>;
const emptyCounts: Counts = Object.fromEntries(DENOMINATIONS.map((d) => [d.value, 0]));

type HistoryEntry = { id: string; timestamp: number; counts: Counts; total: number };
const HISTORY_KEY = "metoolkit-cash-counter-history";

function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function twoDigitWords(n: number): string {
  if (n < 20) return ONES[n];
  const t = Math.floor(n / 10);
  const o = n % 10;
  return TENS[t] + (o ? " " + ONES[o] : "");
}

function threeDigitWords(n: number): string {
  let str = "";
  if (n >= 100) {
    str += ONES[Math.floor(n / 100)] + " Hundred";
    n %= 100;
    if (n) str += " ";
  }
  str += twoDigitWords(n);
  return str.trim();
}

function amountInWords(total: number): string {
  if (total === 0) return "Zero Rupees Only";
  let n = total;
  const crore = Math.floor(n / 10000000);
  n %= 10000000;
  const lakh = Math.floor(n / 100000);
  n %= 100000;
  const thousand = Math.floor(n / 1000);
  n %= 1000;
  const hundred = n;

  const parts: string[] = [];
  if (crore) parts.push(threeDigitWords(crore) + " Crore");
  if (lakh) parts.push(threeDigitWords(lakh) + " Lakh");
  if (thousand) parts.push(threeDigitWords(thousand) + " Thousand");
  if (hundred) parts.push(threeDigitWords(hundred));

  return (parts.join(" ") || "Zero") + " Rupees Only";
}

export default function CashCounterClient() {
  const [counts, setCounts] = useState<Counts>(emptyCounts);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const grandTotal = DENOMINATIONS.reduce((sum, d) => sum + d.value * (counts[d.value] || 0), 0);
  const totalNotes = DENOMINATIONS.filter((d) => d.kind !== "Coin").reduce((sum, d) => sum + (counts[d.value] || 0), 0);
  const totalCoins = DENOMINATIONS.filter((d) => d.kind === "Coin").reduce((sum, d) => sum + (counts[d.value] || 0), 0);

  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    if (grandTotal === 0) return;

    saveTimer.current = setTimeout(() => {
      setHistory((prev) => {
        if (prev[0]?.total === grandTotal) return prev;
        const entry: HistoryEntry = { id: `${Date.now()}`, timestamp: Date.now(), counts: { ...counts }, total: grandTotal };
        const next = [entry, ...prev].slice(0, 8);
        try {
          localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    }, 1500);

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grandTotal]);

  function updateCount(value: number, raw: string) {
    const cleaned = raw.replace(/[^0-9]/g, "");
    const n = cleaned === "" ? 0 : parseInt(cleaned, 10);
    setCounts((prev) => ({ ...prev, [value]: n }));
  }

  function reset() {
    setCounts(emptyCounts);
  }

  function restoreFromHistory(entry: HistoryEntry) {
    setCounts(entry.counts);
  }

  function clearHistory() {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {
      // ignore
    }
  }

  const buildSummary = useCallback(() => {
    const lines = DENOMINATIONS.filter((d) => (counts[d.value] || 0) > 0).map(
      (d) => `${d.label} x ${counts[d.value]} = ${formatINR(d.value * counts[d.value])}`
    );
    lines.push("");
    lines.push(`Grand Total: ${formatINR(grandTotal)}`);
    lines.push(`(${amountInWords(grandTotal)})`);
    lines.push(`Notes: ${totalNotes} · Coins: ${totalCoins}`);
    return lines.join("\n");
  }, [counts, grandTotal, totalNotes, totalCoins]);

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(buildSummary());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  function shareOnWhatsApp() {
    const text = encodeURIComponent(buildSummary());
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  function printSheet() {
    window.print();
  }

  async function downloadPDF() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const marginX = 20;
    let y = 22;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Cash Denomination Sheet", marginX, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(new Date().toLocaleString("en-IN"), marginX, y);
    y += 12;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Denomination", marginX, y);
    doc.text("Count", marginX + 70, y);
    doc.text("Subtotal", marginX + 110, y);
    y += 2;
    doc.line(marginX, y, marginX + 160, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    DENOMINATIONS.forEach((d) => {
      const c = counts[d.value] || 0;
      if (c === 0) return;
      doc.text(d.label, marginX, y);
      doc.text(String(c), marginX + 70, y);
      doc.text(formatINR(d.value * c), marginX + 110, y);
      y += 8;
    });

    y += 4;
    doc.line(marginX, y, marginX + 160, y);
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`Grand Total: ${formatINR(grandTotal)}`, marginX, y);
    y += 8;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    const wordsLines = doc.splitTextToSize(amountInWords(grandTotal), 160);
    doc.text(wordsLines, marginX, y);
    y += wordsLines.length * 5 + 6;

    doc.setFont("helvetica", "normal");
    doc.text(`Total Notes: ${totalNotes}   Total Coins: ${totalCoins}`, marginX, y);

    doc.save(`cash-denomination-${Date.now()}.pdf`);
  }

  return (
    <div className="max-w-content mx-auto px-6 py-14 print:py-0">
      <div className="print:hidden">
        <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">Free tool</p>
        <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-3">
          Cash Denomination Counter
        </h1>
        <p className="text-muted mb-10 max-w-xl">
          Count Indian currency notes and coins with automatic subtotals, Lakh/Crore
          formatting, and amount in words — everything runs in your browser, nothing
          is uploaded anywhere.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] overflow-hidden print:border-black print:rounded-none animate-fade-up transition-shadow duration-300 hover:shadow-xl hover:shadow-indigo/5">
          <div className="grid grid-cols-[1fr_100px_120px] gap-2 px-5 py-3 border-b border-line dark:border-white/10 text-xs font-mono uppercase tracking-widest text-muted print:text-black">
            <span>Denomination</span>
            <span className="text-right">Count</span>
            <span className="text-right">Subtotal</span>
          </div>

          {DENOMINATIONS.map((d) => (
            <div key={d.value} className="grid grid-cols-[1fr_100px_120px] gap-2 items-center px-5 py-3 border-b border-line dark:border-white/10 last:border-0">
              <div>
                <span className="font-display text-lg text-ink dark:text-white print:text-black">{d.label}</span>
                <span className="text-xs text-muted ml-2 print:text-black">{d.kind}</span>
              </div>
              <input
                type="text"
                inputMode="numeric"
                value={counts[d.value] === 0 ? "" : counts[d.value]}
                onChange={(e) => updateCount(d.value, e.target.value)}
                placeholder="0"
                className="print:hidden w-full text-right rounded-lg border border-line dark:border-white/10 bg-paper dark:bg-[#101118] text-ink dark:text-white px-3 py-2 text-sm font-mono transition-all duration-200 focus-visible:outline-2 focus-visible:outline-indigo focus:shadow-[0_0_0_3px_rgba(45,91,255,0.15)]"
              />
              <span className="hidden print:inline text-right font-mono">{counts[d.value] || 0}</span>
              <span className="text-right font-mono tabular text-ink dark:text-white print:text-black">
                {formatINR(d.value * (counts[d.value] || 0))}
              </span>
            </div>
          ))}

          <div className="grid grid-cols-[1fr_100px_120px] gap-2 items-center px-5 py-4 bg-ink dark:bg-white/[0.06] print:bg-transparent">
            <span className="font-display text-lg text-paper dark:text-white print:text-black">Grand Total</span>
            <span />
            <span className="text-right font-mono text-lg tabular text-paper dark:text-white print:text-black">
              {formatINR(grandTotal)}
            </span>
          </div>

          <div className="px-5 py-4 border-t border-line dark:border-white/10">
            <p className="text-sm text-ink/80 dark:text-white/80 italic print:text-black">
              {amountInWords(grandTotal)}
            </p>
            <p className="text-xs text-muted mt-2 print:text-black">
              Total Notes: <span className="font-mono tabular">{totalNotes}</span> · Total
              Coins: <span className="font-mono tabular">{totalCoins}</span>
            </p>
          </div>
        </div>

        <div className="print:hidden space-y-6">
          <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-5">
            <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">Actions</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={reset} className="rounded-lg border border-line dark:border-white/10 text-ink dark:text-white text-sm py-2.5 hover:border-indigo hover:text-indigo hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-95 transition-all duration-150">Reset</button>
              <button onClick={printSheet} className="rounded-lg border border-line dark:border-white/10 text-ink dark:text-white text-sm py-2.5 hover:border-indigo hover:text-indigo hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-95 transition-all duration-150">Print</button>
              <button onClick={downloadPDF} className="rounded-lg border border-line dark:border-white/10 text-ink dark:text-white text-sm py-2.5 hover:border-indigo hover:text-indigo hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-95 transition-all duration-150">Download PDF</button>
              <button onClick={copySummary} className="rounded-lg border border-line dark:border-white/10 text-ink dark:text-white text-sm py-2.5 hover:border-indigo hover:text-indigo hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-95 transition-all duration-150">
                {copied ? "Copied!" : "Copy Summary"}
              </button>
              <button onClick={shareOnWhatsApp} className="col-span-2 rounded-lg bg-indigo text-white text-sm py-2.5 hover:bg-indigo-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo/40 active:translate-y-0 active:scale-95 transition-all duration-150">
                Share on WhatsApp
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-mono uppercase tracking-widest text-muted">Recent counts</p>
              {history.length > 0 && (
                <button onClick={clearHistory} className="text-xs text-muted hover:text-indigo transition-colors">Clear</button>
              )}
            </div>
            {history.length === 0 ? (
              <p className="text-sm text-muted">Nothing saved yet.</p>
            ) : (
              <ul className="space-y-2">
                {history.map((entry) => (
                  <li key={entry.id}>
                    <button onClick={() => restoreFromHistory(entry)} className="w-full flex items-center justify-between rounded-lg border border-line dark:border-white/10 px-3 py-2 text-left hover:border-indigo transition-colors">
                      <span className="text-xs text-muted">
                        {new Date(entry.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <span className="font-mono text-sm tabular text-ink dark:text-white">{formatINR(entry.total)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="text-xs text-muted leading-relaxed">
            Everything on this page runs locally in your browser. Nothing you enter is
            sent to a server — history is saved only in this browser via localStorage.
          </p>
        </div>
      </div>
    </div>
  );
}
