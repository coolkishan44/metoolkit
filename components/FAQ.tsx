"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { faqs } from "@/lib/data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="max-w-content mx-auto px-6 py-14 hairline">
      <Reveal>
        <SectionHeading eyebrow="Questions" title="Frequently asked" />
      </Reveal>

      <div className="max-w-3xl divide-y divide-line dark:divide-white/10 border-t border-b border-line dark:border-white/10">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={faq.question}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-display text-lg text-ink dark:text-white">
                  {faq.question}
                </span>
                <span
                  className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-line dark:border-white/10 text-ink dark:text-white transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-all duration-200 ease-out ${
                  isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                }`}
                style={{ display: "grid" }}
              >
                <div className="overflow-hidden">
                  <p className="text-sm text-muted leading-relaxed max-w-2xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
