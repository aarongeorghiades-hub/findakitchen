// Named provider card. Renders provider identity + capability summary and links
// to the named detail page (/providers/<slug>).
//
// With `showContact`, the directory index also surfaces the provider's own
// website and phone so a visitor can act without a second click. The card body
// is covered by a stretched link rather than wrapped in one, so those contact
// links are real, clickable anchors and not illegal nested <a> elements.
// Address, postcode, Companies House identifiers and social links are never
// rendered here.
import Link from "next/link";

interface Provider {
  slug: string;
  name: string;
  market: string;
  region_base: string | null;
  notable_differentiators: string[] | null;
  insurance_friendly: boolean;
  power_source: string | null;
  website?: string | null;
  phone?: string | null;
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

function telHref(phone: string): string {
  return `tel:${phone.trim().replace(/(?!^\+)[^\d]/g, "")}`;
}

function websiteLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
  }
}

export function ProviderPreviewCard({
  provider,
  showContact = false,
}: {
  provider: Provider;
  showContact?: boolean;
}) {
  const badge = marketBadge(provider.market);
  // Only render the contact row when there is something real to put in it.
  const contact = showContact && (provider.website || provider.phone);

  return (
    <div
      data-market={provider.market}
      data-insurance={provider.insurance_friendly ? "true" : "false"}
      data-electric={provider.power_source === "electric" ? "true" : "false"}
      className="group relative bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--charcoal)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-2xl" />

      {/* Stretched link: covers the card so the whole thing stays clickable,
          while the contact links below sit above it. */}
      <Link
        href={`/providers/${provider.slug}`}
        aria-label={`${provider.name} — full profile`}
        className="absolute inset-0 z-10 rounded-2xl"
      />

      <div className="relative z-10 pointer-events-none">
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

      {contact && (
        <div className="relative z-20 mt-4 pt-3 border-t border-[var(--border)] group-hover:border-white/15 transition-colors duration-300 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {provider.phone && (
            <a
              href={telHref(provider.phone)}
              className="text-xs text-[var(--muted)] group-hover:text-white/70 hover:!text-[var(--clay)] transition-colors duration-300"
            >
              <span aria-hidden="true">&#9742;</span> {provider.phone}
            </a>
          )}
          {provider.website && (
            <a
              href={provider.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--muted)] group-hover:text-white/70 hover:!text-[var(--clay)] transition-colors duration-300"
            >
              {websiteLabel(provider.website)} <span aria-hidden="true">&#8599;</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
