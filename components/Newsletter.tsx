"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

// NOTE: form is UI-only for now — no email service is connected yet.
// Wire this up to your provider of choice (Resend, Mailchimp, etc.) in a
// later phase; submitting currently just shows a local confirmation state.
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <section className="max-w-content mx-auto px-6 py-14 hairline">
      <Reveal>
        <div className="rounded-2xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] px-8 py-12 flex flex-col items-center text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-muted mb-3">
            Stay current
          </p>
          <h2 className="font-display text-2xl md:text-3xl italic text-ink dark:text-white mb-3 max-w-lg">
            One email a week. New tools, dropped tools, nothing else.
          </h2>
          <p className="text-sm text-muted mb-8 max-w-md">
            No growth-hack drip sequence — just the changelog of what's new in the index.
          </p>

          {submitted ? (
            <p className="text-sm font-medium text-indigo">
              You're on the list. Check your inbox to confirm.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 rounded-full border border-line dark:border-white/10 bg-paper dark:bg-[#101118] text-ink dark:text-white px-5 py-3 text-sm placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-indigo"
              />
              <button
                type="submit"
                className="rounded-full bg-ink text-paper dark:bg-white dark:text-ink px-6 py-3 text-sm font-medium hover:bg-indigo dark:hover:bg-indigo dark:hover:text-white transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
