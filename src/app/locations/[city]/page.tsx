import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ProviderPreviewCard } from "@/components/home/ProviderPreviewCard";

const CITIES: Record<string, { name: string; region: string; description: string }> = {
  london: { name: "London", region: "Greater London", description: "the UK's largest city" },
  manchester: { name: "Manchester", region: "Greater Manchester", description: "the North West's largest city" },
  birmingham: { name: "Birmingham", region: "West Midlands", description: "the UK's second largest city" },
  leeds: { name: "Leeds", region: "West Yorkshire", description: "Yorkshire's largest city" },
  bristol: { name: "Bristol", region: "South West England", description: "the South West's largest city" },
  sheffield: { name: "Sheffield", region: "South Yorkshire", description: "a major South Yorkshire city" },
  edinburgh: { name: "Edinburgh", region: "Scotland", description: "the Scottish capital" },
  glasgow: { name: "Glasgow", region: "Scotland", description: "Scotland's largest city" },
  liverpool: { name: "Liverpool", region: "Merseyside", description: "a major North West city" },
  nottingham: { name: "Nottingham", region: "East Midlands", description: "a major East Midlands city" },
  cardiff: { name: "Cardiff", region: "Wales", description: "the Welsh capital" },
  leicester: { name: "Leicester", region: "East Midlands", description: "a major East Midlands city" },
  coventry: { name: "Coventry", region: "West Midlands", description: "a major West Midlands city" },
  newcastle: { name: "Newcastle", region: "North East England", description: "the North East's largest city" },
  brighton: { name: "Brighton", region: "East Sussex", description: "a major South Coast city" },
};

interface Props {
  params: { city: string };
}

export async function generateStaticParams() {
  return Object.keys(CITIES).map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = CITIES[params.city];
  if (!city) return {};
  return {
    title: `Temporary Kitchen Hire ${city.name} | FindAKitchen`,
    description: `Compare temporary kitchen hire providers covering ${city.name}. Domestic pods for renovations and insurance claims. Commercial units for businesses. Fast UK delivery.`,
    alternates: {
      canonical: `https://findakitchen.co.uk/locations/${params.city}`,
    },
  };
}

export const revalidate = 3600;

export default async function LocationPage({ params }: Props) {
  const city = CITIES[params.city];
  if (!city) notFound();

  const { data: providers } = await supabase
    .from("providers")
    .select(
      "slug, name, market, region_base, coverage, notable_differentiators, insurance_friendly, power_source"
    )
    .eq("active", true)
    .order("name");

  const providerCount = providers?.length ?? 0;

  const faqs = [
    {
      question: `How much does temporary kitchen hire cost in ${city.name}?`,
      answer: `Temporary kitchen hire in ${city.name} typically costs \u00A370\u2013\u00A3150 per day or \u00A3350\u2013\u00A3800 per week including delivery and collection. Prices vary by provider, pod size, and distance from their depot.`,
    },
    {
      question: `How quickly can a temporary kitchen be delivered to ${city.name}?`,
      answer: `Most providers covering ${city.name} can deliver and install a temporary kitchen pod within 24\u201348 hours of booking. Emergency same-day delivery may be available depending on availability.`,
    },
    {
      question: `Can I use insurance to pay for temporary kitchen hire in ${city.name}?`,
      answer: `Yes \u2014 if your kitchen in ${city.name} has been damaged by flood, fire, or water damage, your home insurance policy may cover the cost of a temporary kitchen pod. Request an insurer-formatted quote from any provider below.`,
    },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://findakitchen.co.uk" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://findakitchen.co.uk/locations" },
      { "@type": "ListItem", position: 3, name: city.name, item: `https://findakitchen.co.uk/locations/${params.city}` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="bg-[var(--charcoal)] pt-12 pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-3xl relative z-10">
          <nav className="text-xs text-white/40 mb-6 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white/60 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-white/60 transition-colors">
              Locations
            </Link>
            <span>/</span>
            <span className="text-white/60">{city.name}</span>
          </nav>

          <p className="text-xs uppercase tracking-widest text-[var(--clay-light)] mb-4">
            {city.region}
          </p>

          <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-5">
            Temporary Kitchen Hire in {city.name}
          </h1>

          <p className="text-lg text-white/50 font-light leading-relaxed max-w-2xl">
            Compare {providerCount} providers covering {city.name}. Domestic
            pods for home renovations and insurance claims, plus commercial
            units for businesses.
          </p>
        </div>
      </section>

      {/* ===== PROVIDER GRID ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-gray-50">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          Providers covering {city.name}
        </h2>

        {providers && providers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {providers.map((provider) => (
              <ProviderPreviewCard key={provider.slug} provider={provider} />
            ))}
          </div>
        ) : (
          <p className="text-[var(--muted)]">
            No providers found for {city.name}. Please check back soon.
          </p>
        )}
      </section>

      {/* ===== SEO CONTENT ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-8">
            Temporary kitchen hire in {city.name}: what you need to know
          </h2>

          <div className="space-y-6 text-[var(--warm-mid)] leading-relaxed">
            <p>
              Whether you&apos;re renovating your home in {city.name} or
              dealing with unexpected kitchen damage, a temporary kitchen pod
              lets you stay in your property while work is completed. All
              providers listed here offer delivery and installation across{" "}
              {city.region}.
            </p>
            <p>
              Domestic kitchen pods are typically installed on your driveway
              within 24&ndash;48 hours and include a full oven, hob, sink, and
              fridge-freezer. Most {city.name} providers work directly with
              insurers if your kitchen has been damaged by flood or fire.
            </p>
            <p>
              For commercial temporary kitchen hire in {city.name} &mdash;
              including schools, restaurants, hospitals and construction sites
              &mdash; modular and trailer kitchen units are available from
              specialist commercial providers covering {city.region}.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-gray-50">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          Frequently asked questions
        </h2>

        <div className="max-w-3xl space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="bg-white rounded-2xl p-6 border border-[var(--border)]"
            >
              <h3 className="font-serif text-lg text-[var(--charcoal)] mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== RELATED GUIDES ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          Useful guides for {city.name} temporary kitchen hire
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
          {[
            {
              href: "/blog/how-much-does-temporary-kitchen-hire-cost",
              title: "How much does temporary kitchen hire cost?",
              description: "UK pricing guide covering daily and weekly rates, what affects cost, and how to get the best value.",
            },
            {
              href: "/blog/does-home-insurance-cover-temporary-kitchen-hire",
              title: "Does home insurance cover temporary kitchen hire?",
              description: "How to check if your policy covers a temporary pod and what to say to your insurer.",
            },
            {
              href: "/blog/how-long-does-temporary-kitchen-installation-take",
              title: "How long does installation take?",
              description: "What happens on delivery day, how long setup takes, and what you need to prepare.",
            },
            {
              href: "/tools/driveway-fit-checker",
              title: "Driveway Fit Checker",
              description: "Enter your driveway dimensions and find out which pod sizes will fit your space.",
            },
          ].map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group bg-white rounded-2xl p-6 border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl block"
            >
              <h3 className="font-serif text-lg text-[var(--charcoal)] group-hover:text-[var(--clay)] transition-colors duration-300 mb-2">
                {guide.title}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 max-w-4xl space-y-3">
          <p className="text-sm text-[var(--warm-mid)] leading-relaxed">
            Are you a tradesperson in {city.name}?{" "}
            <Link href="/trade-partners" className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--charcoal)] transition-colors">
              Join our trade partner programme &rarr;
            </Link>
          </p>
          <p className="text-sm text-[var(--warm-mid)] leading-relaxed">
            Need a{" "}
            <Link href="/commercial" className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--charcoal)] transition-colors">
              commercial temporary kitchen
            </Link>{" "}
            rather than a domestic pod?
          </p>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-[var(--charcoal)] py-16 md:py-24 px-6 lg:px-12 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
          Need a temporary kitchen in {city.name}?
        </h2>
        <p className="text-white/50 mb-8 max-w-lg mx-auto">
          Compare all providers, check pricing, and get free quotes — all in
          one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/get-quotes"
            className="bg-[var(--clay)] text-white px-8 py-3.5 rounded-full hover:bg-[var(--clay-light)] transition-all duration-300 text-sm font-medium"
          >
            Get free quotes &rarr;
          </Link>
          <Link
            href="/providers"
            className="border border-white/20 text-white px-8 py-3.5 rounded-full hover:border-white/40 transition-all duration-300 text-sm font-medium"
          >
            Browse all providers
          </Link>
        </div>
      </section>
    </>
  );
}
