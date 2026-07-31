import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing your use of MeToolkit."
};

const sections = [
  {
    title: "1. Acceptance of terms",
    body: "By accessing or using MeToolkit, you agree to these Terms of Service. If you do not agree, please do not use the site."
  },
  {
    title: "2. Description of service",
    body: "MeToolkit is a directory of third-party AI and business tools. We do not build, own, or control the tools listed, and listing a tool does not constitute an endorsement or guarantee of its quality, security, or fitness for any purpose."
  },
  {
    title: "3. Third-party tools and links",
    body: "Links to third-party tools and websites are provided for convenience. We are not responsible for the content, pricing, availability, or practices of any third-party site, and your use of any linked tool is governed by that tool's own terms and privacy policy."
  },
  {
    title: "4. Tool submissions",
    body: "If you submit a tool for listing, you confirm you have the right to share the information provided and that it is accurate to the best of your knowledge. We reserve the right to edit, decline, or remove any submission or listing at our discretion."
  },
  {
    title: "5. Acceptable use",
    body: "You agree not to misuse the site — including attempting unauthorized access, scraping in violation of posted limits, or using the site to distribute harmful content."
  },
  {
    title: "6. Disclaimer of warranties",
    body: "The site and its content are provided \"as is\" without warranties of any kind, express or implied, including accuracy, completeness, or uninterrupted availability."
  },
  {
    title: "7. Limitation of liability",
    body: "To the fullest extent permitted by law, MeToolkit is not liable for any indirect, incidental, or consequential damages arising from your use of the site or reliance on any listed tool."
  },
  {
    title: "8. Changes to these terms",
    body: "We may update these terms from time to time. Continued use of the site after changes take effect constitutes acceptance of the revised terms."
  }
];

export default function TermsPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">Legal</p>
      <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-3">
        Terms of Service
      </h1>
      <p className="text-sm font-mono text-muted tabular mb-10">Last updated: July 2026</p>

      <div className="max-w-2xl space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-lg text-ink dark:text-white mb-2">{s.title}</h2>
            <p className="text-sm text-ink/80 dark:text-white/80 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
