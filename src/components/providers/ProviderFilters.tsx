"use client";

import { Region, KitchenType } from "@/types";

interface ProviderFiltersProps {
  regions: Region[];
  kitchenTypes: KitchenType[];
  selectedSegment: string;
  selectedRegion: string;
  selectedKitchenType: string;
  onSegmentChange: (v: string) => void;
  onRegionChange: (v: string) => void;
  onKitchenTypeChange: (v: string) => void;
}

export default function ProviderFilters({
  regions,
  kitchenTypes,
  selectedSegment,
  selectedRegion,
  selectedKitchenType,
  onSegmentChange,
  onRegionChange,
  onKitchenTypeChange,
}: ProviderFiltersProps) {
  const selectClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="font-semibold text-slate-800 mb-4">Filter Providers</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Market Segment
          </label>
          <select
            value={selectedSegment}
            onChange={(e) => onSegmentChange(e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="commercial">Commercial</option>
            <option value="domestic">Domestic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Region
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className={selectClass}
          >
            <option value="all">All Regions</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Kitchen Type
          </label>
          <select
            value={selectedKitchenType}
            onChange={(e) => onKitchenTypeChange(e.target.value)}
            className={selectClass}
          >
            <option value="all">All Types</option>
            {kitchenTypes.map((kt) => (
              <option key={kt.id} value={kt.id}>
                {kt.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
