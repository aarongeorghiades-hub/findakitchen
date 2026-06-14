"use client";
import { useState } from "react";
import Link from "next/link";
import { FilterBar } from "./FilterBar";
import { ProviderPreviewCard } from "./ProviderPreviewCard";

interface Provider {
  id: number;
  market: string;
  kitchen_types: string[] | null;
  power_source: string | null;
  insurance_friendly: boolean;
  insurance_ready_quotes?: boolean | null;
  min_hire?: string | null;
  max_hire?: string | null;
  hire_cycle?: string | null;
  delivery_speed?: string | null;
  setup_time?: string | null;
  sectors?: string[] | null;
  capacity?: string | null;
}

export function HomeProviderPreview({
  providers,
  totalCount,
}: {
  providers: Provider[];
  totalCount: number;
}) {
  const [filter, setFilter] = useState("all");

  const filtered = providers.filter((p) => {
    if (filter === "all") return true;
    if (filter === "domestic") return p.market === "domestic";
    if (filter === "commercial") return p.market === "commercial" || p.market === "commercial_and_domestic";
    if (filter === "insurance") return p.insurance_friendly;
    if (filter === "electric") return p.power_source === "electric";
    return true;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-3">
            Provider directory
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)]">
            {totalCount} specialist suppliers,{" "}
            <em className="text-[var(--clay)]">zero</em> guesswork.
          </h2>
          <p className="text-sm text-[var(--muted)] mt-3 max-w-lg">
            Filter by capability, then enter your postcode to see which providers
            cover your area.
          </p>
        </div>
        <Link
          href="/get-quotes"
          className="text-sm bg-[var(--clay)] text-white px-6 py-3 rounded-full hover:bg-[var(--clay-light)] transition-all duration-300 whitespace-nowrap self-start font-medium"
        >
          Get matched with providers &rarr;
        </Link>
      </div>

      <div className="mb-8">
        <FilterBar activeFilter={filter} onFilter={setFilter} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <ProviderPreviewCard key={p.id} provider={p} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-[var(--muted)]">No providers match this filter.</p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/providers"
          className="text-sm border border-[var(--border)] text-[var(--warm-mid)] px-6 py-3 rounded-full hover:border-[var(--charcoal)] hover:text-[var(--charcoal)] transition-all duration-300"
        >
          Browse the full directory &rarr;
        </Link>
      </div>
    </div>
  );
}
