import Link from "next/link";
import { KitchenType } from "@/types";

export default function KitchenTypeCard({ kitchenType }: { kitchenType: KitchenType }) {
  return (
    <Link
      href={`/kitchen-types/${kitchenType.slug}`}
      className="group rounded-xl border border-slate-200 border-l-4 border-l-primary-600 bg-white p-6 shadow-sm transition-all hover:border-primary-500 hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-slate-800 group-hover:text-primary-700 transition-colors">
          {kitchenType.name}
        </h3>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
          {kitchenType.market_segment === "commercial" ? "Commercial" : "Domestic"}
        </span>
      </div>

      <p className="text-slate-500 text-sm leading-relaxed mb-4">
        {kitchenType.short_description}
      </p>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
        {kitchenType.typical_price_from && (
          <span>From {kitchenType.typical_price_from}</span>
        )}
        {kitchenType.capacity_range && <span>{kitchenType.capacity_range}</span>}
        {kitchenType.typical_setup_time && (
          <span>Setup: {kitchenType.typical_setup_time}</span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {kitchenType.self_contained && (
          <span className="rounded bg-green-50 px-2 py-0.5 text-xs text-green-700">
            Self-contained
          </span>
        )}
        {kitchenType.towable && (
          <span className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
            Towable
          </span>
        )}
        {kitchenType.indoor_capable && (
          <span className="rounded bg-purple-50 px-2 py-0.5 text-xs text-purple-700">
            Indoor
          </span>
        )}
      </div>
    </Link>
  );
}
