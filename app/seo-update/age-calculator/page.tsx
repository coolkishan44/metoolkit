import type { Metadata } from "next";
import AgeCalculatorClient from "./AgeCalculatorClient";

export const metadata: Metadata = {
  title: "Age Calculator — Calculate Exact Age in Years, Months & Days",
  description:
    "Free age calculator. Enter your date of birth to get your exact age in years, months, and days, plus total days lived and days to your next birthday.",
  alternates: { canonical: "/age-calculator" }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MeToolkit Age Calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Calculate exact age in years, months, and days from a date of birth, plus total days lived and days until the next birthday."
};

export default function AgeCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AgeCalculatorClient />
    </>
  );
}
