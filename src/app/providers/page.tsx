import { Metadata } from "next";
import Link from "next/link";
import { getActiveProviders } from "@/lib/providers";
import { ProvidersDirectoryClient } from "./ProvidersDirectoryClient";
import { WhyRequestThroughUs } from "@/components/providers/WhyRequestThroughUs";

// Both the meta description and the on-page subhead below read the same count
// from src/data/providers.json, so they can never drift apart.
export const metadata: Metadata = {
  title: "UK Temporary Kitchen Providers",
  description: `Browse ${getActiveProviders().length} specialist temporary kitchen hire providers across the UK. Filter by domestic, commercial, insurance-ready, and electric-only. Compare and get free quotes.`,
  alternates: { canonical: "https://findakitchen.co.uk/providers" },
};

export default async function ProvidersPage() {
  const allProviders = getActiveProviders();

  return (
    <>
      {/* Hero strip */}
      <section className="bg-[var(--charcoal)] pt-12 pb-16 px-6 lg:px-12">
        <nav className="text-xs text-white/40 mb-6">
          <Link href="/" className="hover:text-white/60 transition-colors">
            Home
          </Link>{" "}
          <span className="mx-1.5">/</span>
          <span className="text-white/60">Providers</span>
        </nav>
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-3">
          Temporary Kitchen Providers
        </h1>
        <p className="text-lg text-white/50 font-light">
          {allProviders.length} specialist UK suppliers — domestic pods and
          commercial hire
        </p>
        <p className="text-sm text-white/40 mt-3 max-w-xl">
          Browse by capability below, then enter your postcode to see which
          providers cover your area.
        </p>
        <div className="mt-6">
          <Link
            href="/get-quotes"
            className="inline-block text-sm bg-[var(--clay)] text-white px-7 py-3 rounded-full hover:bg-[var(--clay-light)] transition-all duration-300 font-medium"
          >
            Get matched with providers — request free quotes &rarr;
          </Link>
        </div>
      </section>

      {/* Why request through us */}
      <section className="pt-12 px-6 lg:px-12">
        <WhyRequestThroughUs />
      </section>

      {/* Provider grid with filters */}
      <section className="pt-8 pb-12 px-6 lg:px-12">
        <ProvidersDirectoryClient providers={allProviders} />
      </section>
    </>
  );
}
