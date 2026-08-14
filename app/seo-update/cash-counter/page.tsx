import type { Metadata } from "next";
import CashCounterClient from "./CashCounterClient";

export const metadata: Metadata = {
  title: "Cash Denomination Counter (India) — ₹500 to ₹1, Notes & Coins",
  description:
    "Free Indian cash denomination counter. Enter note and coin counts to get an instant total in Lakh/Crore format, amount in words, PDF export, and WhatsApp sharing.",
  alternates: { canonical: "/cash-counter" }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MeToolkit Cash Denomination Counter",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any (web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Count Indian currency notes and coins with automatic subtotals, Indian numbering format, amount in words, PDF export, and WhatsApp sharing."
};

export default function CashCounterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CashCounterClient />
    </>
  );
}
