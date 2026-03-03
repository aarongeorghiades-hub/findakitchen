import Link from "next/link";
import { KitchenType } from "@/types";

const bestForLabels: Record<string, string> = {
  school_refurb: "School Refurbishment",
  hospital_refurb: "Hospital Refurbishment",
  care_home: "Care Homes",
  restaurant_refurb: "Restaurant Refurbishment",
  construction: "Construction Sites",
  events: "Events",
  festivals: "Festivals",
  multi_site: "Multi-site Operations",
  catering_companies: "Catering Companies",
  remote_sites: "Remote Sites",
  emergency: "Emergency Deployments",
  dark_kitchen: "Dark Kitchens",
  off_grid: "Off-grid Locations",
  renovation: "Home Renovations",
  insurance_claim: "Insurance Claims",
  domestic_emergency: "Domestic Emergencies",
  small_renovation: "Small Renovations",
  temporary_living: "Temporary Living",
  flood_damage: "Flood Damage",
  pop_up: "Pop-up Venues",
  outdoor_event: "Outdoor Events",
  food_truck: "Food Truck Operations",
};

export default function KitchenTypeDetail({
  kitchenType,
}: {
  kitchenType: KitchenType;
}) {
  return (
    <div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
            {kitchenType.market_segment === "commercial"
              ? "Commercial"
              : "Domestic"}
          </span>
          {kitchenType.self_contained && (
            <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm text-green-700">
              Self-contained
            </span>
          )}
          {kitchenType.towable && (
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
              Towable
            </span>
          )}
          {kitchenType.indoor_capable && (
            <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-sm text-purple-700">
              Indoor capable
            </span>
          )}
          {kitchenType.requires_crane && (
            <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700">
              Requires crane access
            </span>
          )}
        </div>

        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          {kitchenType.short_description}
        </p>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 leading-relaxed whitespace-pre-line">
            {kitchenType.long_description}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kitchenType.typical_price_from && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-center">
            <p className="text-sm text-slate-500 mb-1">Price Range</p>
            <p className="text-lg font-semibold text-slate-800">
              {kitchenType.typical_price_from}
              {kitchenType.typical_price_to &&
                ` – ${kitchenType.typical_price_to}`}
            </p>
          </div>
        )}
        {kitchenType.capacity_range && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-center">
            <p className="text-sm text-slate-500 mb-1">Capacity</p>
            <p className="text-lg font-semibold text-slate-800">
              {kitchenType.capacity_range}
            </p>
          </div>
        )}
        {kitchenType.typical_setup_time && (
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-center">
            <p className="text-sm text-slate-500 mb-1">Setup Time</p>
            <p className="text-lg font-semibold text-slate-800">
              {kitchenType.typical_setup_time}
            </p>
          </div>
        )}
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-center">
          <p className="text-sm text-slate-500 mb-1">Segment</p>
          <p className="text-lg font-semibold text-slate-800 capitalize">
            {kitchenType.market_segment}
          </p>
        </div>
      </div>

      {kitchenType.best_for && kitchenType.best_for.length > 0 && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Best for
          </h2>
          <div className="flex flex-wrap gap-2">
            {kitchenType.best_for.map((use) => (
              <span
                key={use}
                className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-700"
              >
                {bestForLabels[use] || use.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl bg-primary-50 border border-primary-100 p-6 sm:p-8 text-center">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Need a {kitchenType.name.toLowerCase()}?
        </h2>
        <p className="text-slate-600 mb-5">
          Tell us about your requirements and we&apos;ll match you with providers
          who offer {kitchenType.name.toLowerCase()} hire.
        </p>
        <Link href="/get-quotes" className="btn-primary">
          Get Free Quotes
        </Link>
      </div>
    </div>
  );
}
