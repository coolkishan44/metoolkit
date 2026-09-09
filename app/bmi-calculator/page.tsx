import type { Metadata } from "next";
import BMICalculatorClient from "./BMICalculatorClient";

export const metadata: Metadata = {
  title: "BMI Calculator — Body Mass Index Calculator (Metric & Imperial)",
  description:
    "Free BMI calculator using standard WHO categories. Supports cm/kg and ft-in/lbs. Not a diagnosis — for general reference only.",
  alternates: { canonical: "/bmi-calculator" }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MeToolkit BMI Calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any (web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Calculate Body Mass Index using standard WHO categories, in metric or imperial units."
};

export default function BMICalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BMICalculatorClient />
    </>
  );
}
