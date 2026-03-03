"use client";

import { useState, useMemo } from "react";
import { Provider, Region, KitchenType } from "@/types";
import ProviderCard from "@/components/providers/ProviderCard";
import ProviderFilters from "@/components/providers/ProviderFilters";
import Link from "next/link";

interface Props {
  initialProviders: Provider[];
  regions: Region[];
  kitchenTypes: KitchenType[];
}

export default function ProviderDirectoryClient({
  initialProviders,
  regions,
  kitchenTypes,
}: Props) {
  const [segment, setSegment] = useState("all");
  const [region, setRegion] = useState("all");
  const [kitchenType, setKitchenType] = useState("all");

  const filtered = useMemo(() => {
    let result = initialProviders;
    if (segment !== "all") {
      result = result.filter(
        (p) => p.market_segment === segment || p.market_segment === "both"
      );
    }
    return result;
  }, [initialProviders, segment]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <ProviderFilters
          regions={regions}
          kitchenTypes={kitchenTypes}
          selectedSegment={segment}
          selectedRegion={region}
          selectedKitchenType={kitchenType}
          onSegmentChange={setSegment}
          onRegionChange={setRegion}
          onKitchenTypeChange={setKitchenType}
        />
      </div>

      <div className="lg:col-span-3">
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              No providers listed yet
            </h3>
            <p className="text-slate-500 mb-6">
              We&apos;re building our provider directory. In the meantime, submit
              an enquiry and we&apos;ll connect you with the right providers
              directly.
            </p>
            <Link href="/get-quotes" className="btn-primary">
              Get Free Quotes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
