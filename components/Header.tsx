"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="border-b border-line dark:border-white/10 bg-paper/90 dark:bg-[#0F1712]/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-xl tracking-tight">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo to-indigo-dark text-white flex items-center justify-center text-xs font-sans font-bold">M</span>
          MeToolkit
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-ink/80 dark:text-white/80 hover:text-indigo transition-colors">{item.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={menuOpen}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-line dark:border-white/10">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="md:hidden border-t border-line dark:border-white/10 px-6 py-4 flex flex-col gap-4 bg-paper dark:bg-[#0F1712]">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="text-sm text-ink/80 dark:text-white/80 hover:text-indigo transition-colors">{item.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
