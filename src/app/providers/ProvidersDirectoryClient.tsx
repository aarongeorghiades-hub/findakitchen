"use client";
import { useState } from "react";
import { FilterBar } from "@/components/home/FilterBar";
import { ProviderPreviewCard } from "@/components/home/ProviderPreviewCard";

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

export function ProvidersDirectoryClient({
  providers,
}: {
  providers: Provider[];
}) {
  const [filter, setFilter] = useState("all");

  const filtered = providers.filter((p) => {
    if (filter === "all") return true;
    if (filter === "domestic") return p.market === "domestic";
    if (filter === "commercial")
      return p.market === "commercial" || p.market === "commercial_and_domestic";
    if (filter === "insurance") return p.insurance_friendly;
    if (filter === "electric") return p.power_source === "electric";
    return true;
  });

  return (
    <div>
      <div className="sticky top-[72px] z-40 py-3 -mx-6 px-6 lg:-mx-12 lg:px-12">
        <FilterBar activeFilter={filter} onFilter={setFilter} sticky={false} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {filtered.map((p, i) => (
          <ProviderPreviewCard key={p.id} provider={p} index={i} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-[var(--muted)] text-lg">
              No providers match this filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
