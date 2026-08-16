import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const siteUrl = "https://metoolkit.vercel.app";

// Fonts are loaded via Google Fonts <link> tags in <head> below instead of
// next/font/google. next/font/google fetches font files at BUILD time — if
// the build server can't reach fonts.googleapis.com, the entire build fails.
// Link tags load in the browser instead, so the build never depends on
// that network call.

export const metadata: Metadata = {
  verification: { google: ["OJRQ8rIaLUAol4bCgviFVpSFCVroza2efg4Lk727pqE", "jz9d-qt2n-CdhTKCvMAURgPtopZV2uEwQLc6D5yMfTo"] },
  metadataBase: new URL(siteUrl),
  title: {
    default: "MeToolkit — Free Online Calculators & Everyday Tools",
    template: "%s — MeToolkit"
  },
  description:
    "Free, fast calculators for everyday use — EMI, income tax, cash counting, percentage, and age. No sign-up, runs entirely in your browser.",
  keywords: [
    "EMI calculator",
    "income tax calculator India",
    "cash denomination counter",
    "percentage calculator",
    "age calculator",
    "MeToolkit"
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "MeToolkit",
    title: "MeToolkit — Free Online Calculators & Everyday Tools",
    description:
      "Free, fast calculators for everyday use — EMI, income tax, cash counting, percentage, and age."
  },
  twitter: {
    card: "summary_large_image",
    title: "MeToolkit — Free Online Calculators & Everyday Tools",
    description:
      "Free, fast calculators for everyday use — EMI, income tax, cash counting, percentage, and age."
  },
  alternates: {
    canonical: siteUrl
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MeToolkit",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/tools?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased flex min-h-screen flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
