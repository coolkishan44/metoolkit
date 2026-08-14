import type { Metadata } from "next";
import TaxCalculatorClient from "./TaxCalculatorClient";

export const metadata: Metadata = {
  title: "Income Tax Calculator India (FY 2025-26 / 2026-27) — Old vs New Regime",
  description:
    "Free India income tax calculator comparing old vs new regime for FY 2025-26/2026-27. Includes Section 87A rebate, standard deduction, and cess.",
  alternates: { canonical: "/tax-calculator" }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MeToolkit Income Tax Calculator (India)",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any (web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Estimate income tax for FY 2025-26/2026-27 under India's old or new tax regime, including standard deduction, Section 87A rebate, and Health & Education Cess."
};

export default function TaxCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TaxCalculatorClient />
    </>
  );
}
