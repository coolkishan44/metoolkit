import type { Metadata } from "next";
import GSTCalculatorClient from "./GSTCalculatorClient";

export const metadata: Metadata = {
  title: "GST Calculator (India) — Add or Remove GST, CGST/SGST Split",
  description:
    "Free GST calculator for India. Add or remove GST at 5%, 12%, 18%, or 28%, with the CGST/SGST breakdown for intra-state supply.",
  alternates: { canonical: "/gst-calculator" }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MeToolkit GST Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any (web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Add or remove GST from an amount at standard India GST rates, with CGST/SGST split for intra-state supply."
};

export default function GSTCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GSTCalculatorClient />
    </>
  );
}
