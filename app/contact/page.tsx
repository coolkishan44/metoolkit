"use client";

import { useState } from "react";

// NOTE: form is UI-only for now — no email/backend service is connected.
// Wire this to an email service or form endpoint (e.g. Resend, Formspree) later.
export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;
    setSubmitted(true);
  }

  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">Contact</p>
      <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-4 max-w-2xl">
        Flag a tool, suggest a listing, or just say hi
      </h1>
      <p className="text-muted mb-10 max-w-xl">
        We read every message. For outdated listings, include the tool name so we can
        check it faster.
      </p>

      {submitted ? (
        <div className="max-w-md rounded-xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] p-6">
          <p className="font-display text-lg text-ink dark:text-white mb-1">Message sent</p>
          <p className="text-sm text-muted">We'll get back to you if a reply is needed.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-ink/80 dark:text-white/80 mb-1.5">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] text-ink dark:text-white px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-indigo"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-ink/80 dark:text-white/80 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] text-ink dark:text-white px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-indigo"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm text-ink/80 dark:text-white/80 mb-1.5">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-line dark:border-white/10 bg-surface dark:bg-white/[0.03] text-ink dark:text-white px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-indigo resize-none"
            />
          </div>

          <button
            type="submit"
            className="rounded-full bg-ink text-paper dark:bg-white dark:text-ink px-6 py-3 text-sm font-medium hover:bg-indigo dark:hover:bg-indigo dark:hover:text-white transition-colors"
          >
            Send message
          </button>
        </form>
      )}
    </div>
  );
}
