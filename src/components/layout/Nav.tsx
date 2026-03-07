"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 border-b border-[var(--border)] backdrop-blur-md bg-[rgba(250,247,242,0.88)] ${
        scrolled ? "px-6 lg:px-12 py-3" : "px-6 lg:px-12 py-5"
      }`}
    >
      <Link
        href="/"
        className="font-serif text-2xl text-[var(--charcoal)] tracking-tight"
      >
        Find<em className="text-[var(--clay)] not-italic italic">A</em>Kitchen
      </Link>
      <div className="hidden md:flex items-center gap-9">
        <Link
          href="/providers"
          className="text-sm text-[var(--warm-mid)] hover:text-[var(--clay)] transition-colors"
        >
          Providers
        </Link>
        <Link
          href="/kitchen-types"
          className="text-sm text-[var(--warm-mid)] hover:text-[var(--clay)] transition-colors"
        >
          Kitchen Types
        </Link>
        <Link
          href="/blog"
          className="text-sm text-[var(--warm-mid)] hover:text-[var(--clay)] transition-colors"
        >
          Blog
        </Link>
        <Link
          href="/about"
          className="text-sm text-[var(--warm-mid)] hover:text-[var(--clay)] transition-colors"
        >
          About
        </Link>
        <Link
          href="/get-quotes"
          className="text-sm bg-[var(--charcoal)] text-white px-6 py-2.5 rounded-full hover:bg-[var(--clay)] transition-all duration-300"
        >
          Get quotes &rarr;
        </Link>
      </div>

      <button
        className="md:hidden p-2 text-[var(--charcoal)]"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-[var(--cream)] border-b border-[var(--border)] md:hidden">
          <div className="flex flex-col px-6 py-4 gap-3">
            {[
              { href: "/providers", label: "Providers" },
              { href: "/kitchen-types", label: "Kitchen Types" },
              { href: "/blog", label: "Blog" },
              { href: "/about", label: "About" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-[var(--warm-mid)] py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/get-quotes"
              onClick={() => setMobileOpen(false)}
              className="text-sm bg-[var(--charcoal)] text-white px-6 py-2.5 rounded-full text-center hover:bg-[var(--clay)] transition-all duration-300"
            >
              Get quotes &rarr;
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
