"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function PostcodeSearch() {
  const [postcode, setPostcode] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postcode.trim()) {
      router.push(`/providers?postcode=${encodeURIComponent(postcode.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="flex items-center bg-white rounded-full border border-[var(--border)] focus-within:border-[var(--clay)] transition-colors overflow-hidden max-w-md">
        <input
          type="text"
          placeholder="Enter your postcode…"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className="flex-1 px-6 py-3.5 text-sm uppercase tracking-wider text-[var(--charcoal)] placeholder:text-[var(--muted)] placeholder:normal-case placeholder:tracking-normal bg-transparent outline-none"
        />
        <button
          type="submit"
          className="bg-[var(--clay)] text-white text-sm font-medium px-5 py-3.5 mr-1 rounded-full hover:bg-[var(--clay-light)] transition-all duration-300 whitespace-nowrap"
        >
          Find providers &rarr;
        </button>
      </div>
      <p className="text-xs text-[var(--muted)] mt-2.5 ml-1">
        e.g. SW1A 1AA &middot; Works for domestic &amp; commercial
      </p>
    </form>
  );
}
