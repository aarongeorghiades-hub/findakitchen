// Named provider card. Renders provider identity + capability summary and links
// to the named detail page (/providers/<slug>). It deliberately renders NO
// contact path — no phone, email, website, address, or external link. The only
// forward action from a provider is the detail page, which itself funnels to
// /get-quotes.
import Link from "next/link";

interface Provider {
  slug: string;
  name: string;
  market: string;
  region_base: string | null;
  notable_differentiators: string[] | null;
  insurance_friendly: boolean;
  power_source: string | null;
}

function marketBadge(market: string) {
  if (market === "domestic")
    return { label: "Domestic", cls: "bg-[#EBF5EF] text-[var(--sage)]" };
  if (market === "commercial")
    return { label: "Commercial", cls: "bg-[#EBF0F9] text-[#3B65C4]" };
  return { label: "Domestic + Commercial", cls: "bg-purple-50 text-purple-700" };
}

// Consistent region label across every provider surface: show the base region
// unless it is missing or the literal "Unknown", in which case fall back to
// "UK-wide" rather than printing a placeholder.
function regionLabel(region: string | null): string {
  if (region && region !== "Unknown") return region;
  return "UK-wide";
}

export function ProviderPreviewCard({ provider }: { provider: Provider }) {
  const badge = marketBadge(provider.market);

  return (
    <Link
      href={`/providers/${provider.slug}`}
      data-market={provider.market}
      data-insurance={provider.insurance_friendly ? "true" : "false"}
      data-electric={provider.power_source === "electric" ? "true" : "false"}
      className="group relative bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden block"
    >
      <div className="absolute inset-0 bg-[var(--charcoal)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-2xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${badge.cls} group-hover:bg-white/15 group-hover:text-white transition-colors duration-300`}>
              {badge.label}
            </span>
            {provider.insurance_friendly && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#EBF5EF] text-[var(--sage)] group-hover:bg-white/15 group-hover:text-white transition-colors duration-300">
                Insurance-ready
              </span>
            )}
            {provider.power_source === "electric" && (
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-50 text-amber-700 group-hover:bg-white/15 group-hover:text-white transition-colors duration-300">
                &#9889; Electric
              </span>
            )}
          </div>
          <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:border-white/30 group-hover:text-white text-[var(--muted)] transition-all duration-300">
            &rarr;
          </div>
        </div>

        <h3 className="font-serif text-xl text-[var(--charcoal)] group-hover:text-white transition-colors duration-300 mb-1">
          {provider.name}
        </h3>
        <p className="text-sm text-[var(--muted)] group-hover:text-white/60 transition-colors duration-300 mb-3">
          {regionLabel(provider.region_base)}
        </p>
        {provider.notable_differentiators && provider.notable_differentiators[0] && (
          <p className="text-sm text-[var(--warm-mid)] group-hover:text-white/80 transition-colors duration-300 line-clamp-2">
            {provider.notable_differentiators[0]}
          </p>
        )}
      </div>
    </Link>
  );
}
