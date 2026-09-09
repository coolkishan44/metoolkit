import type { Metadata } from "next";
import UnitConverterClient from "./UnitConverterClient";

export const metadata: Metadata = {
  title: "Unit Converter — Length, Weight & Temperature Converter",
  description:
    "Free unit converter for length, weight, and temperature. Convert between metric and imperial units instantly.",
  alternates: { canonical: "/unit-converter" }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MeToolkit Unit Converter",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Convert between length, weight, and temperature units instantly."
};

export default function UnitConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <UnitConverterClient />
    </>
  );
}
