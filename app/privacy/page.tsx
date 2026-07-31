import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How MeToolkit collects, uses, and protects your information."
};

const sections = [
  {
    title: "1. Information we collect",
    body: "We collect information you provide directly, such as your name and email address when you subscribe to the newsletter, submit a tool, or contact us. We also collect standard technical data automatically — IP address, browser type, device information, and pages visited — through cookies and similar technologies, including for analytics and, where applicable, advertising."
  },
  {
    title: "2. How we use information",
    body: "We use collected information to operate and improve the site, respond to inquiries, send newsletter updates to subscribers who opt in, and, where advertising is enabled, to support ad delivery and measurement."
  },
  {
    title: "3. Cookies and advertising",
    body: "This site may use cookies and similar technologies for analytics and advertising purposes, including third-party advertising services such as Google AdSense. These services may use cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalized advertising through your browser settings or via industry opt-out tools."
  },
  {
    title: "4. Data sharing",
    body: "We do not sell personal information. We may share data with service providers who help operate the site (such as hosting and analytics providers) under obligations to protect it, or where required by law."
  },
  {
    title: "5. Data retention",
    body: "We retain personal information only as long as necessary for the purposes described in this policy, or as required by law."
  },
  {
    title: "6. Your rights",
    body: "Depending on your location, you may have rights to access, correct, or delete your personal information. To make a request, use the contact page."
  },
  {
    title: "7. Changes to this policy",
    body: "We may update this policy from time to time. Material changes will be reflected by updating the date below."
  }
];

export default function PrivacyPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-14">
      <p className="text-xs font-mono uppercase tracking-widest text-muted mb-2">Legal</p>
      <h1 className="font-display text-3xl md:text-4xl text-ink dark:text-white mb-3">
        Privacy Policy
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
