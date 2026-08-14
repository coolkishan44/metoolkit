import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Free Online Calculator — Add, Subtract, Multiply, Divide",
  description:
    "A free, fast online calculator for everyday math. No ads, no sign-up, works instantly in your browser.",
  alternates: { canonical: "/calculator" }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MeToolkit Calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "A free online calculator for everyday math — addition, subtraction, multiplication, division."
};

export default function CalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorClient />
    </>
  );
}
