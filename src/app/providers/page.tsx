import { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ProvidersDirectoryClient } from "./ProvidersDirectoryClient";

export const metadata: Metadata = {
  title: "UK Temporary Kitchen Providers",
  description:
    "Browse 26 vetted temporary kitchen hire providers across the UK. Filter by domestic, commercial, insurance-ready, and electric-only. Compare and get free quotes.",
  alternates: { canonical: "https://findakitchen.co.uk/providers" },
};

export const revalidate = 3600;

export default async function ProvidersPage() {
  const { data: providers } = await supabase
    .from("providers")
    .select(
      "id, slug, name, market, region_base, coverage, kitchen_types, power_source, insurance_friendly, pricing_model, pricing, trustpilot_reviews, trustpilot_rating, notable_differentiators"
    )
    .eq("active", true)
    .order("id");

  const allProviders = providers || [];

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
          {allProviders.length} vetted UK suppliers — domestic pods and
          commercial hire
        </p>
      </section>

      {/* Provider grid with filters */}
      <section className="py-12 px-6 lg:px-12">
        <ProvidersDirectoryClient providers={allProviders} />
      </section>
    </>
  );
}
