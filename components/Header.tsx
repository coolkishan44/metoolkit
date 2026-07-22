import Link from "next/link";

const navItems = [
  { href: "/tools", label: "Tools" },
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/blog", label: "Blog" }
];

export default function Header() {
  return (
    <header className="border-b border-line bg-paper/95 backdrop-blur sticky top-0 z-40">
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display italic text-xl tracking-tight">
          Index
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink/80 hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/tools/submit"
          className="text-sm font-medium bg-ink text-paper px-4 py-2 rounded-full hover:bg-indigo transition-colors"
        >
          Submit a tool
        </Link>
      </div>
    </header>
  );
}
