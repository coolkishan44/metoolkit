import type { Metadata } from "next";
import CashCounterClient from "./CashCounterClient";

export const metadata: Metadata = {
  title: "Cash Counter — Count Indian Notes and Coins",
  description:
    "Free cash counter for Indian currency. Count notes and coins, see the total in Lakh and Crore, and check the drawer against an expected total.",
  alternates: { canonical: "/cash-counter" }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MeToolkit Cash Counter",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any (web browser)",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Count Indian notes and coins with running totals, and compare the count against an expected drawer total."
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
