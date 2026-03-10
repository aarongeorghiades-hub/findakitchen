import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ProviderPreviewCard } from "@/components/home/ProviderPreviewCard";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const { data } = await supabase
    .from("providers")
    .select("slug")
    .eq("active", true);
  return data?.map((p) => ({ slug: p.slug })) ?? [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: provider } = await supabase
    .from("providers")
    .select("name, coverage, region_base, notable_differentiators")
    .eq("slug", params.slug)
    .eq("active", true)
    .single();

  if (!provider) return { title: "Provider Not Found" };

  return {
    title: `${provider.name} — Temporary Kitchen Hire`,
    description: `${provider.name} offers temporary kitchen hire covering ${provider.coverage ?? provider.region_base ?? "the UK"}. ${provider.notable_differentiators?.[0] ?? ""}`,
    alternates: {
      canonical: `https://findakitchen.co.uk/providers/${params.slug}`,
    },
  };
}

export const revalidate = 3600;

function formatSnakeCase(s: string): string {
  return s
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function marketBadge(market: string) {
  if (market === "domestic")
    return { label: "Domestic", cls: "bg-[#EBF5EF] text-[var(--sage)]" };
  if (market === "commercial")
    return { label: "Commercial", cls: "bg-[#EBF0F9] text-[#3B65C4]" };
  return { label: "Domestic + Commercial", cls: "bg-purple-50 text-purple-700" };
}

function formatKitchenType(t: string): string {
  const map: Record<string, string> = {
    driveway_pod: "Driveway Pod",
    driveway_suite: "Driveway Suite",
    indoor_capsule: "Indoor Capsule",
    container_cabin: "Container Cabin",
    modular_flatpack: "Modular Flatpack",
    trailer_kitchen: "Trailer Kitchen",
    modular_cabin: "Modular Cabin",
    container_kitchen: "Container Kitchen",
    marquee_kitchen: "Marquee Kitchen",
    lorry_kitchen: "Lorry Kitchen",
    open_plan_kitchen: "Open Plan Kitchen",
    catering_trailer: "Catering Trailer",
    mobile_kitchen: "Mobile Kitchen",
    portable_kitchen: "Portable Kitchen",
  };
  return map[t] || formatSnakeCase(t);
}

function formatPowerSource(s: string): string {
  const map: Record<string, string> = {
    electric: "\u26A1 All Electric",
    gas_and_electric: "Gas & Electric",
    gas: "Gas",
    lpg: "LPG",
    diesel_generator: "Diesel Generator",
  };
  return map[s] || formatSnakeCase(s);
}

export default async function ProviderProfilePage({ params }: Props) {
  const { data: provider } = await supabase
    .from("providers")
    .select("*")
    .eq("slug", params.slug)
    .eq("active", true)
    .single();

  if (!provider) notFound();

  const badge = marketBadge(provider.market);

  // Related providers
  const { data: related } = await supabase
    .from("providers")
    .select(
      "slug, name, market, region_base, coverage, notable_differentiators, insurance_friendly, power_source"
    )
    .eq("active", true)
    .eq("market", provider.market)
    .neq("slug", provider.slug)
    .limit(3);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://findakitchen.co.uk" },
      { "@type": "ListItem", position: 2, name: "Providers", item: "https://findakitchen.co.uk/providers" },
      { "@type": "ListItem", position: 3, name: provider.name, item: `https://findakitchen.co.uk/providers/${params.slug}` },
    ],
  };

  const aggregateRatingJsonLd = provider.trustpilot_rating && provider.trustpilot_reviews > 0 ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: provider.name,
    url: provider.website || `https://findakitchen.co.uk/providers/${params.slug}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(provider.trustpilot_rating),
      reviewCount: String(provider.trustpilot_reviews),
      bestRating: "5",
      worstRating: "1",
    },
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {aggregateRatingJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingJsonLd) }}
        />
      )}
      {/* HERO */}
      <section className="bg-[var(--charcoal)] pt-12 pb-16 px-6 lg:px-12">
        <nav className="text-xs text-white/40 mb-6">
          <Link href="/" className="hover:text-white/60 transition-colors">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/providers" className="hover:text-white/60 transition-colors">
            Providers
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-white/60">{provider.name}</span>
        </nav>

        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
          {provider.name}
        </h1>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${badge.cls}`}>
            {badge.label}
          </span>
          {provider.region_base && (
            <span className="text-sm text-white/50">
              {provider.region_base}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <Link
            href="/get-quotes"
            className="text-sm bg-[var(--clay)] text-white px-8 py-3 rounded-full hover:bg-[var(--clay-light)] transition-all duration-300 font-medium"
          >
            Get quotes &rarr;
          </Link>
          <span className="text-xs text-white/40">
            Free to use &middot; Matched quotes from verified providers &middot; No obligation
          </span>
        </div>
      </section>

      <div className="px-6 lg:px-12 py-12 space-y-12 max-w-5xl">
        {/* AT A GLANCE */}
        <section>
          <h2 className="font-serif text-2xl text-[var(--charcoal)] mb-6">
            At a glance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {provider.kitchen_types && provider.kitchen_types.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-[var(--border)]">
                <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2">
                  Kitchen types
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {provider.kitchen_types.map((t: string) => (
                    <span
                      key={t}
                      className="text-sm bg-[var(--cream)] text-[var(--charcoal)] px-3 py-1 rounded-full"
                    >
                      {formatKitchenType(t)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {provider.power_source && (
              <div className="bg-white rounded-2xl p-5 border border-[var(--border)]">
                <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2">
                  Power source
                </p>
                <p className="text-sm font-medium text-[var(--charcoal)]">
                  {formatPowerSource(provider.power_source)}
                  {provider.gas_type && (
                    <span className="text-[var(--muted)] font-normal">
                      {" "}
                      ({provider.gas_type})
                    </span>
                  )}
                </p>
              </div>
            )}

            <div className="bg-white rounded-2xl p-5 border border-[var(--border)]">
              <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2">
                Insurance
              </p>
              <p className="text-sm font-medium">
                {provider.insurance_friendly ? (
                  <span className="text-[var(--sage)]">&#10003; Insurance-ready</span>
                ) : (
                  <span className="text-[var(--muted)]">&#10007; Quote basis only</span>
                )}
              </p>
            </div>

            {(provider.pricing || provider.pricing_model) && (
              <div className="bg-white rounded-2xl p-5 border border-[var(--border)]">
                <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2">
                  Pricing
                </p>
                <p className="text-sm font-medium text-[var(--charcoal)]">
                  {provider.pricing
                    ? `From ${provider.pricing}`
                    : formatSnakeCase(provider.pricing_model || "")}
                </p>
              </div>
            )}

            {provider.min_hire && (
              <div className="bg-white rounded-2xl p-5 border border-[var(--border)]">
                <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2">
                  Min hire
                </p>
                <p className="text-sm font-medium text-[var(--charcoal)]">
                  {provider.min_hire}
                </p>
              </div>
            )}

            {provider.delivery_speed && (
              <div className="bg-white rounded-2xl p-5 border border-[var(--border)]">
                <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2">
                  Delivery speed
                </p>
                <p className="text-sm font-medium text-[var(--charcoal)]">
                  {provider.delivery_speed}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* APPLIANCES */}
        {provider.appliances && provider.appliances.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl text-[var(--charcoal)] mb-6">
              What&apos;s included
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {provider.appliances.map((a: string) => (
                <span
                  key={a}
                  className="text-sm bg-[#F2EDE5] text-[var(--warm-mid)] px-4 py-1.5 rounded-full"
                >
                  {formatSnakeCase(a)}
                </span>
              ))}
            </div>
            {provider.optional_appliances &&
              provider.optional_appliances.length > 0 && (
                <div>
                  <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2">
                    Optional extras
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {provider.optional_appliances.map((a: string) => (
                      <span
                        key={a}
                        className="text-sm border border-[var(--border)] text-[var(--muted)] px-4 py-1.5 rounded-full"
                      >
                        {formatSnakeCase(a)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </section>
        )}

        {/* POD / KITCHEN MODELS */}
        {(provider.pod_models || provider.kitchen_models) && (
          <section>
            <h2 className="font-serif text-2xl text-[var(--charcoal)] mb-6">
              Available models
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(provider.pod_models || provider.kitchen_models || []).map(
                (model: Record<string, unknown>, i: number) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-5 border border-[var(--border)]"
                  >
                    <h3 className="font-serif text-lg text-[var(--charcoal)] mb-2">
                      {(model.name as string) || `Model ${i + 1}`}
                    </h3>
                    <dl className="space-y-1.5 text-sm">
                      {typeof model.power === "string" && (
                        <div>
                          <dt className="text-[var(--muted)] inline">Power: </dt>
                          <dd className="text-[var(--charcoal)] inline">
                            {model.power}
                          </dd>
                        </div>
                      )}
                      {typeof model.choice === "string" && (
                        <div>
                          <dt className="text-[var(--muted)] inline">Options: </dt>
                          <dd className="text-[var(--charcoal)] inline">
                            {model.choice}
                          </dd>
                        </div>
                      )}
                      {typeof model.seating === "boolean" && (
                        <div>
                          <dt className="text-[var(--muted)] inline">Seating: </dt>
                          <dd className="text-[var(--charcoal)] inline">
                            {model.seating ? "Yes" : "No"}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* PRICING */}
        <section>
          <h2 className="font-serif text-2xl text-[var(--charcoal)] mb-6">
            Pricing
          </h2>
          {provider.pricing ? (
            <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
              <p className="font-serif text-4xl text-[var(--clay)] mb-2">
                {provider.pricing}
              </p>
              {provider.pricing_detail && (
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {provider.pricing_detail}
                </p>
              )}
            </div>
          ) : provider.pricing_tiers ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(
                provider.pricing_tiers as Record<string, unknown>
              ).map(([tier, detail]) => (
                <div
                  key={tier}
                  className="bg-white rounded-2xl p-5 border border-[var(--border)]"
                >
                  <h3 className="font-serif text-lg text-[var(--charcoal)] mb-1">
                    {formatSnakeCase(tier)}
                  </h3>
                  <p className="text-sm text-[var(--muted)]">
                    {String(detail)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 border border-[var(--border)] text-center">
              <p className="text-[var(--muted)] mb-4">
                Request a personalised quote through FindAKitchen
              </p>
              <Link
                href="/get-quotes"
                className="text-sm bg-[var(--clay)] text-white px-6 py-2.5 rounded-full hover:bg-[var(--clay-light)] transition-all duration-300 inline-block"
              >
                Get a quote &rarr;
              </Link>
            </div>
          )}
        </section>

        {/* COVERAGE & DELIVERY */}
        {(provider.coverage || provider.delivery_speed || provider.setup_time) && (
          <section>
            <h2 className="font-serif text-2xl text-[var(--charcoal)] mb-6">
              Coverage &amp; delivery
            </h2>
            {(provider.coverage || provider.coverage_detail) && (
              <p className="text-sm text-[var(--warm-mid)] leading-relaxed mb-4">
                {provider.coverage}
                {provider.coverage_detail && ` — ${provider.coverage_detail}`}
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              {provider.delivery_free_radius && (
                <span className="text-sm bg-white border border-[var(--border)] px-4 py-2 rounded-full">
                  Free delivery: {provider.delivery_free_radius}
                </span>
              )}
              {provider.delivery_speed && (
                <span className="text-sm bg-white border border-[var(--border)] px-4 py-2 rounded-full">
                  Delivery: {provider.delivery_speed}
                </span>
              )}
              {provider.setup_time && (
                <span className="text-sm bg-white border border-[var(--border)] px-4 py-2 rounded-full">
                  Setup: {provider.setup_time}
                </span>
              )}
            </div>
          </section>
        )}

        {/* SITE REQUIREMENTS */}
        {provider.utility_requirements && (
          <section>
            <h2 className="font-serif text-2xl text-[var(--charcoal)] mb-6">
              What you&apos;ll need on site
            </h2>
            <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
              {typeof provider.utility_requirements === "object" &&
              provider.utility_requirements.items ? (
                <ul className="space-y-2">
                  {(
                    provider.utility_requirements as { items: string[] }
                  ).items.map((item: string) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-[var(--warm-mid)]"
                    >
                      <span className="text-[var(--sage)]">&#10003;</span>
                      {formatSnakeCase(item)}
                    </li>
                  ))}
                </ul>
              ) : (
                <dl className="space-y-2">
                  {Object.entries(
                    provider.utility_requirements as Record<string, string>
                  ).map(([key, val]) => (
                    <div key={key} className="text-sm">
                      <dt className="text-[var(--muted)] inline capitalize">
                        {key}:{" "}
                      </dt>
                      <dd className="text-[var(--warm-mid)] inline">{val}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            {provider.surface_types && provider.surface_types.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2">
                  Surface types
                </p>
                <div className="flex flex-wrap gap-2">
                  {provider.surface_types.map((s: string) => (
                    <span
                      key={s}
                      className="text-sm bg-white border border-[var(--border)] px-3 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-4">
              {provider.driveway_min_length && (
                <span className="text-sm bg-white border border-[var(--border)] px-4 py-2 rounded-full">
                  Min driveway: {provider.driveway_min_length}
                </span>
              )}
              {provider.driveway_min_length_regular && (
                <span className="text-sm bg-white border border-[var(--border)] px-4 py-2 rounded-full">
                  Regular pod: {provider.driveway_min_length_regular}
                </span>
              )}
              {provider.driveway_min_length_large && (
                <span className="text-sm bg-white border border-[var(--border)] px-4 py-2 rounded-full">
                  Large pod: {provider.driveway_min_length_large}
                </span>
              )}
              {provider.internal_height && (
                <span className="text-sm bg-white border border-[var(--border)] px-4 py-2 rounded-full">
                  Internal height: {provider.internal_height}
                </span>
              )}
            </div>
          </section>
        )}

        {/* CERTIFICATIONS & FEATURES */}
        {((provider.certifications && provider.certifications.length > 0) ||
          (provider.features && provider.features.length > 0)) && (
          <section>
            <h2 className="font-serif text-2xl text-[var(--charcoal)] mb-6">
              Certifications &amp; features
            </h2>
            {provider.certifications && provider.certifications.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2">
                  Certifications
                </p>
                <div className="flex flex-wrap gap-2">
                  {provider.certifications.map((c: string) => (
                    <span
                      key={c}
                      className="text-sm bg-[#EBF5EF] text-[var(--sage)] px-4 py-1.5 rounded-full"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {provider.features && provider.features.length > 0 && (
              <div>
                <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-2">
                  Features
                </p>
                <div className="flex flex-wrap gap-2">
                  {provider.features.map((f: string) => (
                    <span
                      key={f}
                      className="text-sm bg-[var(--cream)] border border-[var(--border)] text-[var(--warm-mid)] px-4 py-1.5 rounded-full"
                    >
                      {formatSnakeCase(f)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* SOCIAL PROOF */}
        {(provider.trustpilot_rating ||
          provider.google_rating ||
          provider.instagram_followers ||
          (provider.testimonials && provider.testimonials.length > 0)) && (
          <section>
            <h2 className="font-serif text-2xl text-[var(--charcoal)] mb-6">
              Social proof
            </h2>

            <div className="flex flex-wrap gap-4 mb-6">
              {provider.trustpilot_rating && (
                <div className="bg-white rounded-2xl p-5 border border-[var(--border)] flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < Math.round(provider.trustpilot_rating!)
                              ? "text-amber-400"
                              : "text-slate-200"
                          }`}
                        >
                          &#9733;
                        </span>
                      ))}
                      <span className="text-sm font-medium text-[var(--charcoal)] ml-1">
                        {provider.trustpilot_rating}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--muted)]">
                      {provider.trustpilot_reviews} Trustpilot reviews
                    </p>
                  </div>
                  {provider.trustpilot_url && (
                    <a
                      href={provider.trustpilot_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--sage)] hover:underline"
                    >
                      View &rarr;
                    </a>
                  )}
                </div>
              )}

              {provider.google_rating && (
                <div className="bg-white rounded-2xl p-5 border border-[var(--border)]">
                  <p className="text-sm font-medium text-[var(--charcoal)]">
                    Google: {provider.google_rating}/5
                  </p>
                </div>
              )}

              {provider.instagram_followers && (
                <div className="bg-white rounded-2xl p-5 border border-[var(--border)]">
                  <p className="text-sm font-medium text-[var(--charcoal)]">
                    {provider.instagram_followers} Instagram followers
                  </p>
                </div>
              )}
            </div>

            {provider.testimonials && provider.testimonials.length > 0 && (
              <div className="space-y-4">
                {provider.testimonials.slice(0, 3).map(
                  (t: string, i: number) => (
                    <blockquote
                      key={i}
                      className="bg-white rounded-2xl p-6 border border-[var(--border)]"
                    >
                      <p className="font-serif italic text-[var(--warm-mid)] leading-relaxed">
                        &ldquo;{t}&rdquo;
                      </p>
                      <p className="text-xs text-[var(--muted)] mt-3">
                        — {provider.name} customer
                      </p>
                    </blockquote>
                  )
                )}
              </div>
            )}
          </section>
        )}

        {/* ABOUT */}
        {(provider.year_established ||
          provider.owner_names ||
          provider.companies_house ||
          provider.parent_company ||
          (provider.notable_differentiators &&
            provider.notable_differentiators.length > 0)) && (
          <section>
            <h2 className="font-serif text-2xl text-[var(--charcoal)] mb-6">
              About {provider.name}
            </h2>

            <div className="flex flex-wrap gap-3 mb-4">
              {provider.year_established && (
                <span className="text-sm bg-white border border-[var(--border)] px-4 py-2 rounded-full">
                  Est. {provider.year_established}
                </span>
              )}
              {provider.owner_names && (
                <span className="text-sm bg-white border border-[var(--border)] px-4 py-2 rounded-full">
                  {provider.owner_names}
                </span>
              )}
              {provider.companies_house && (
                <a
                  href={`https://find-and-update.company-information.service.gov.uk/company/${provider.companies_house}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-white border border-[var(--border)] px-4 py-2 rounded-full text-[var(--sage)] hover:border-[var(--sage)] transition-colors"
                >
                  Companies House &rarr;
                </a>
              )}
            </div>

            {provider.parent_company && (
              <p className="text-sm text-[var(--muted)] mb-4">
                Part of {provider.parent_company}
                {provider.parent_detail && ` — ${provider.parent_detail}`}
              </p>
            )}

            {provider.notable_differentiators &&
              provider.notable_differentiators.length > 0 && (
                <ul className="space-y-2">
                  {provider.notable_differentiators.map(
                    (d: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[var(--warm-mid)]"
                      >
                        <span className="text-[var(--clay)] mt-0.5">•</span>
                        {d}
                      </li>
                    )
                  )}
                </ul>
              )}
          </section>
        )}

        {/* RELATED PROVIDERS */}
        {related && related.length > 0 && (
          <section className="pt-8 border-t border-[var(--border)]">
            <h2 className="font-serif text-2xl text-[var(--charcoal)] mb-6">
              Other{" "}
              {provider.market === "domestic" ? "domestic" : "commercial"}{" "}
              providers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((r) => (
                <ProviderPreviewCard key={r.slug} provider={r} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--border)] p-3 md:hidden">
        <Link
          href="/get-quotes"
          className="block w-full bg-[var(--charcoal)] text-white text-center px-8 py-4 rounded-full font-medium"
        >
          Get quotes &rarr;
        </Link>
        <p className="text-[10px] text-[var(--muted)] text-center mt-1.5">
          Free &middot; Verified providers &middot; No obligation
        </p>
      </div>
    </>
  );
}
