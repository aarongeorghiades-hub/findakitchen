"use client";
import { useState } from "react";
import Link from "next/link";
import { FilterBar } from "./FilterBar";
import { ProviderPreviewCard } from "./ProviderPreviewCard";

interface Provider {
  slug: string;
  name: string;
  market: string;
  region_base: string | null;
  coverage: string | null;
  notable_differentiators: string[] | null;
  insurance_friendly: boolean;
  power_source: string | null;
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
            {totalCount} vetted suppliers,{" "}
            <em className="text-[var(--clay)]">zero</em> guesswork.
          </h2>
        </div>
        <Link
          href="/providers"
          className="text-sm border border-[var(--border)] text-[var(--warm-mid)] px-5 py-2.5 rounded-full hover:border-[var(--charcoal)] hover:text-[var(--charcoal)] transition-all duration-300 whitespace-nowrap self-start"
        >
          View all {totalCount} providers &rarr;
        </Link>
      </div>

      <div className="mb-8">
        <FilterBar activeFilter={filter} onFilter={setFilter} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <div
            key={p.slug}
            className="transition-all duration-300"
            style={{
              opacity: 1,
              transform: "scale(1)",
            }}
          >
            <ProviderPreviewCard provider={p} />
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-[var(--muted)]">No providers match this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
