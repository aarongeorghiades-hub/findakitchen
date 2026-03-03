import Link from "next/link";
import { Provider } from "@/types";

export default function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-slate-800">
              {provider.name}
            </h3>
            {provider.verified && (
              <span className="inline-flex items-center rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">
                Verified
              </span>
            )}
            {provider.featured && (
              <span className="inline-flex items-center rounded-full bg-accent-50 px-2 py-0.5 text-xs font-medium text-accent-700">
                Featured
              </span>
            )}
          </div>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
            {provider.description || "Temporary kitchen hire provider."}
          </p>
        </div>
        {provider.logo_url && (
          <img
            src={provider.logo_url}
            alt={`${provider.name} logo`}
            className="h-12 w-12 rounded-lg object-contain"
          />
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
          {provider.market_segment === "both"
            ? "Commercial & Domestic"
            : provider.market_segment === "commercial"
            ? "Commercial"
            : "Domestic"}
        </span>
        {provider.insurance_claim_support && (
          <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs text-green-700">
            Insurance claim support
          </span>
        )}
        {provider.delivery_timeframe && (
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs text-blue-700">
            {provider.delivery_timeframe}
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <Link
          href={`/providers/${provider.slug}`}
          className="btn-primary text-sm px-4 py-2"
        >
          View Profile
        </Link>
        <Link
          href={`/get-quotes?provider=${encodeURIComponent(provider.slug)}`}
          className="btn-secondary text-sm px-4 py-2"
        >
          Get Quote
        </Link>
      </div>
    </div>
  );
}
