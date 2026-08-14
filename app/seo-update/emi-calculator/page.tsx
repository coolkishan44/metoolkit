import type { Metadata } from "next";
import EMICalculatorClient from "./EMICalculatorClient";

export const metadata: Metadata = {
  title: "EMI Calculator — Home, Car & Personal Loan EMI Calculator",
  description:
    "Free EMI calculator for home, car, and personal loans. See your monthly EMI, total interest, and total payment instantly, with the exact formula lenders use.",
  alternates: { canonical: "/emi-calculator" }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MeToolkit EMI Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any (web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Calculate monthly EMI, total interest, and total payment for home, car, or personal loans."
};

export default function EMICalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EMICalculatorClient />
    </>
  );
}
