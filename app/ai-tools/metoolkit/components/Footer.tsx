import Link from "next/link";

const footerLinks = {
  Product: [
    { href: "/tools", label: "Browse tools" },
    { href: "/ai-tools", label: "AI tools" },
    { href: "/tools/submit", label: "Submit a tool" }
  ],
  Company: [
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ],
  Legal: [
    { href: "/privacy", label: "Privacy policy" },
    { href: "/terms", label: "Terms of service" }
  ]
};

export default function Footer() {
  return (
    <footer className="hairline mt-24 bg-paper dark:bg-[#101118]">
      <div className="max-w-content mx-auto px-6 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2 font-display text-xl mb-3">
            <span className="w-7 h-7 rounded-lg bg-indigo text-white flex items-center justify-center text-xs font-sans font-bold">
              M
            </span>
            MeToolkit
          </Link>
          <p className="text-sm text-muted max-w-xs leading-relaxed">
            A searchable index of AI and business tools — kept current, organized by what each tool actually does.
          </p>
        </div>

        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <p className="text-xs font-mono uppercase tracking-widest text-muted mb-4">
              {heading}
            </p>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink/80 dark:text-white/70 hover:text-indigo transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="hairline">
        <div className="max-w-content mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} MeToolkit. All rights reserved.
          </p>
          <p className="text-xs text-muted">Built for people who'd rather compare than guess.</p>
        </div>
      </div>
    </footer>
  );
}
