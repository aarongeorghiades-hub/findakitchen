import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--cream)] border-t border-[var(--border)] px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="font-serif text-xl text-[var(--charcoal)]">
        Find<em className="text-[var(--clay)] not-italic italic">A</em>Kitchen
      </div>
      <div className="flex flex-wrap justify-center gap-7">
        {[
          { label: "Providers", href: "/providers" },
          { label: "Kitchen Types", href: "/kitchen-types" },
          { label: "Blog", href: "/blog" },
          { label: "Privacy", href: "/privacy-policy" },
          { label: "Contact", href: "/contact" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-sm text-[var(--muted)] hover:text-[var(--charcoal)] transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>
      <p className="text-xs text-[var(--muted)]">
        &copy; 2026 FindAKitchen &middot; findakitchen.co.uk
      </p>
    </footer>
  );
}
