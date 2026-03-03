import Link from "next/link";
import { ProviderWithRelations } from "@/types";

export default function ProviderProfile({ provider }: { provider: ProviderWithRelations }) {
  return (
    <div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {provider.logo_url && (
            <img
              src={provider.logo_url}
              alt={`${provider.name} logo`}
              className="h-20 w-20 rounded-xl object-contain border border-slate-100"
            />
          )}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                {provider.name}
              </h1>
              {provider.verified && (
                <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">
                  Verified Provider
                </span>
              )}
            </div>
            <p className="text-slate-500 text-lg leading-relaxed">
              {provider.description || "Temporary kitchen hire provider."}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/get-quotes?provider=${encodeURIComponent(provider.slug)}`}
            className="btn-primary"
          >
            Request a Quote
          </Link>
          {provider.website_url && (
            <a
              href={provider.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Visit Website
            </a>
          )}
          {provider.phone && (
            <a href={`tel:${provider.phone}`} className="btn-secondary">
              Call {provider.phone}
            </a>
          )}
        </div>
      </div>

      {provider.long_description && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">About {provider.name}</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
              {provider.long_description}
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Details</h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm text-slate-500">Market Segment</dt>
              <dd className="text-sm font-medium text-slate-800">
                {provider.market_segment === "both"
                  ? "Commercial & Domestic"
                  : provider.market_segment === "commercial"
                  ? "Commercial"
                  : "Domestic"}
              </dd>
            </div>
            {provider.min_hire_period && (
              <div>
                <dt className="text-sm text-slate-500">Minimum Hire Period</dt>
                <dd className="text-sm font-medium text-slate-800">
                  {provider.min_hire_period}
                </dd>
              </div>
            )}
            {provider.delivery_timeframe && (
              <div>
                <dt className="text-sm text-slate-500">Delivery Timeframe</dt>
                <dd className="text-sm font-medium text-slate-800">
                  {provider.delivery_timeframe}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-sm text-slate-500">Insurance Claim Support</dt>
              <dd className="text-sm font-medium text-slate-800">
                {provider.insurance_claim_support ? "Yes" : "No"}
              </dd>
            </div>
          </dl>
        </div>

        <div className="space-y-6">
          {provider.regions && provider.regions.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-3">Coverage Areas</h2>
              <div className="flex flex-wrap gap-2">
                {provider.regions.map((region) => (
                  <Link
                    key={region.id}
                    href={`/temporary-kitchen-hire/${region.slug}`}
                    className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                  >
                    {region.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {provider.kitchen_types && provider.kitchen_types.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-3">Kitchen Types</h2>
              <div className="flex flex-wrap gap-2">
                {provider.kitchen_types.map((kt) => (
                  <Link
                    key={kt.id}
                    href={`/kitchen-types/${kt.slug}`}
                    className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                  >
                    {kt.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
