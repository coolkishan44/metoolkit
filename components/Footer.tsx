import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hairline mt-24">
      <div className="max-w-content mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-sm text-muted">
          Index — a directory of tools, kept current by hand.
        </p>
        <div className="flex gap-6 text-sm text-muted">
          <Link href="/tools" className="hover:text-ink transition-colors">Tools</Link>
          <Link href="/ai-tools" className="hover:text-ink transition-colors">AI Tools</Link>
          <Link href="/blog" className="hover:text-ink transition-colors">Blog</Link>
          <Link href="/admin" className="hover:text-ink transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
