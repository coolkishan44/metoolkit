import type { Metadata } from "next";
import PercentageCalculatorClient from "./PercentageCalculatorClient";

export const metadata: Metadata = {
  title: "Percentage Calculator — X% of Y, % Change, and More",
  description:
    "Free percentage calculator for three common calculations: X% of Y, X is what percent of Y, and percentage change — with instant results.",
  alternates: { canonical: "/percentage-calculator" }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MeToolkit Percentage Calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Calculate percentage of a value, what percent one number is of another, or percentage change between two values."
};

export default function PercentageCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PercentageCalculatorClient />
    </>
  );
}
