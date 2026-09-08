import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hairline mt-24 bg-paper dark:bg-[#0F1712]">
      <div className="max-w-content mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted">© {new Date().getFullYear()} MeToolkit. All rights reserved.</p>
        <div className="flex gap-6 text-xs text-muted">
          <Link href="/tools" className="hover:text-indigo transition-colors">Tools</Link>
          <Link href="/blog" className="hover:text-indigo transition-colors">Blog</Link>
          <Link href="/about" className="hover:text-indigo transition-colors">About</Link>
          <Link href="/contact" className="hover:text-indigo transition-colors">Contact</Link>
          <Link href="/privacy" className="hover:text-indigo transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-indigo transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
