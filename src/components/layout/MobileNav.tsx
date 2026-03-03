"use client";

import Link from "next/link";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileNav({ open, onClose, links }: MobileNavProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-72 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <span className="text-lg font-bold text-slate-800">Menu</span>
          <button onClick={onClose} className="p-2 text-slate-500" aria-label="Close menu">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="px-4 py-6">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                onClick={onClose}
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-700"
              >
                Contact
              </Link>
            </li>
          </ul>
          <div className="mt-6 px-3">
            <Link
              href="/get-quotes"
              onClick={onClose}
              className="btn-primary w-full text-center"
            >
              Get Free Quotes
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
