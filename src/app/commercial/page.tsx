import { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ProviderPreviewCard } from "@/components/home/ProviderPreviewCard";

export const metadata: Metadata = {
  title: "Commercial Temporary Kitchen Hire UK | FindAKitchen",
  description:
    "Hire a temporary commercial kitchen for your restaurant, school, hospital or care home. Compare verified UK providers. Fast deployment, nationwide coverage.",
  alternates: {
    canonical: "https://findakitchen.co.uk/commercial",
  },
};

export const revalidate = 3600;

const faqs = [
  {
    question: "How quickly can a temporary commercial kitchen be deployed?",
    answer:
      "Most UK providers can deliver and install a temporary commercial kitchen within 48\u201372 hours of order confirmation for urgent situations. Same-day site assessments are often available. Complex installations with mains plumbing connections may take 3\u20135 days.",
  },
  {
    question: "How much does it cost to hire a temporary commercial kitchen?",
    answer:
      "Commercial kitchen hire typically costs \u00A3500\u2013\u00A31,500 per week for a standard unit, depending on size, specification and hire duration. Delivery, installation and collection are usually charged separately. Longer hire periods attract lower weekly rates.",
  },
  {
    question: "Do temporary commercial kitchens meet food hygiene regulations?",
    answer:
      "Yes \u2014 reputable providers supply units that comply with UK food hygiene regulations (EC 852/2004) and are suitable for Environmental Health Officer inspection. Always confirm compliance documentation with your provider before hire.",
  },
  {
    question:
      "Can a temporary kitchen connect to my existing gas and electricity supply?",
    answer:
      "Yes. Most units are designed to connect to standard commercial gas and electrical supplies. Your provider will carry out a site survey to confirm connection requirements. Generator-powered options are available where mains connection isn\u2019t possible.",
  },
  {
    question: "How long can I hire a temporary commercial kitchen for?",
    answer:
      "Hire periods range from a few days to 12+ months. Many providers offer rolling monthly contracts with notice periods, giving flexibility for longer refurbishment projects.",
  },
];

export default async function CommercialPage() {
  const { data: providers } = await supabase
    .from("providers")
    .select(
      "slug, name, market, region_base, coverage, notable_differentiators, insurance_friendly, power_source"
    )
    .eq("active", true)
    .in("market", ["commercial", "commercial_and_domestic"])
    .order("name");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://findakitchen.co.uk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Commercial Kitchen Hire",
        item: "https://findakitchen.co.uk/commercial",
      },
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

      {/* ===== SECTION 1: HERO ===== */}
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
            <Link
              href="/"
              className="hover:text-white/60 transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-white/60">Commercial Kitchen Hire</span>
          </nav>

          <p className="text-xs uppercase tracking-widest text-[var(--clay-light)] mb-4">
            For Businesses
          </p>

          <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-5">
            Commercial Temporary Kitchen Hire
          </h1>

          <p className="text-lg text-white/50 font-light leading-relaxed max-w-2xl mb-8">
            When your kitchen goes down, your business doesn&apos;t have to.
            Compare temporary commercial kitchen providers across the UK &mdash;
            fast deployment, fully equipped, mains or generator connected.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#providers"
              className="text-sm bg-[var(--clay)] text-white px-6 py-2.5 rounded-full hover:bg-[var(--clay-light)] transition-all duration-300"
            >
              Compare providers &rarr;
            </a>
            <a
              href="#who-we-help"
              className="text-sm border border-white/20 text-white px-6 py-2.5 rounded-full hover:border-white/40 transition-all duration-300"
            >
              Who we help
            </a>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: WHO WE HELP ===== */}
      <section id="who-we-help" className="py-16 md:py-24 px-6 lg:px-12">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          Who hires a temporary commercial kitchen?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a9 9 0 11-3.22-6.88M12 2a10 10 0 00-7.07 2.93" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 3h4v4" />
                </svg>
              ),
              title: "Restaurants & caf\u00E9s",
              description:
                "Fire damage, flood, refurbishment or a sudden surge in capacity. Keep serving while your permanent kitchen is restored.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-4-3l4 3 4-3" />
                </svg>
              ),
              title: "Schools & universities",
              description:
                "Term-time refurbishments, equipment failure or unexpected closures. Keep feeding staff and students without disruption.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ),
              title: "Care homes & hospitals",
              description:
                "Regulatory compliance requires uninterrupted catering. Temporary kitchens meet NHS and CQC standards for continuity of care.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-16 0H3m2 0v-2m14 2v-2M9 7h6m-6 4h6" />
                </svg>
              ),
              title: "Hotels & venues",
              description:
                "Major refits, seasonal overflow capacity or event catering beyond your permanent kitchen\u2019s output.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7l4-4h10l4 4" />
                </svg>
              ),
              title: "Construction canteens",
              description:
                "Welfare compliance on large sites requires a proper catering facility. Temporary kitchens deliver full canteen capability anywhere.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h18v18H3V3zm3 6h12M6 15h12M6 9v6" />
                </svg>
              ),
              title: "Food manufacturers",
              description:
                "Production line maintenance, expansion projects or unexpected downtime \u2014 keep output flowing with a temporary production kitchen.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="group bg-white rounded-2xl p-8 border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="font-serif text-xl text-[var(--charcoal)] mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 3: PROVIDER GRID ===== */}
      <section id="providers" className="py-16 md:py-24 px-6 lg:px-12 bg-gray-50">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-3">
          Commercial kitchen hire providers
        </h2>
        <p className="text-[var(--muted)] mb-12 max-w-2xl">
          Verified UK providers supplying temporary commercial kitchens for
          businesses, institutions and public sector organisations.
        </p>

        {providers && providers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {providers.map((provider) => (
              <ProviderPreviewCard key={provider.slug} provider={provider} />
            ))}
          </div>
        ) : (
          <p className="text-[var(--muted)]">
            No providers found. Please check back soon.
          </p>
        )}
      </section>

      {/* ===== SECTION 4: WHAT'S INCLUDED ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          What does a temporary commercial kitchen include?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl">
          {[
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: "Commercial cooking equipment",
              description:
                "Ranges, ovens, fryers, griddles and induction hobs. All equipment is commercial-grade and suitable for high-volume catering.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m-8-9H3m18 0h-1m-2.636-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ),
              title: "Refrigeration",
              description:
                "Walk-in cold rooms, under-counter fridges and freezer units. Temperature logging available for food safety compliance.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2m0 14v2m-5-5H5m14 0h-2M7.05 7.05L5.636 5.636m12.728 12.728L16.95 16.95M7.05 16.95l-1.414 1.414M18.364 5.636L16.95 7.05" />
                  <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
                </svg>
              ),
              title: "Hot and cold water",
              description:
                "Full plumbing connections including sinks, dishwasher connections and handwash stations to meet environmental health standards.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Compliance-ready",
              description:
                "Units supplied with gas safety certificates, electrical testing and food-grade surfaces. Suitable for EHO inspection from day one.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group bg-white rounded-2xl p-8 border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-serif text-xl text-[var(--charcoal)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 5: HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-16 md:py-24 px-6 lg:px-12 bg-gray-50">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          How to hire a temporary commercial kitchen
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-[var(--border)] rounded-2xl overflow-hidden">
          {[
            {
              num: "01",
              title: "Tell us what you need",
              body: "Use FindAKitchen to compare providers by unit size, specification and coverage area. Most commercial units are available from 20ft to 40ft+.",
            },
            {
              num: "02",
              title: "Get a quote within 24 hours",
              body: "Contact providers directly. For urgent situations, many providers offer same-day or next-day site assessments and can deploy within 48\u201372 hours.",
            },
            {
              num: "03",
              title: "We deliver and connect",
              body: "Providers handle delivery, positioning, plumbing, electrical connection and commissioning. Your team can start using the kitchen the same day in most cases.",
            },
          ].map((step) => (
            <div
              key={step.num}
              className="group bg-white p-8 md:p-10 relative transition-all duration-300 hover:bg-[var(--charcoal)] cursor-default min-h-[260px]"
            >
              <span className="absolute top-4 right-6 font-serif text-[88px] leading-none text-[var(--border)] group-hover:text-white/10 transition-colors duration-300 select-none">
                {step.num}
              </span>
              <h3 className="font-serif text-xl text-[var(--charcoal)] group-hover:text-white transition-colors duration-300 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--muted)] group-hover:text-white/60 transition-colors duration-300 leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 6: FAQ ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          Common questions about commercial kitchen hire
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

      {/* ===== SECTION 7: URGENCY CTA STRIP ===== */}
      <section className="bg-[var(--charcoal)] py-16 md:py-24 px-6 lg:px-12 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
          Kitchen down? We can help today.
        </h2>
        <p className="text-white/50 mb-8 max-w-lg mx-auto">
          FindAKitchen connects you with verified commercial kitchen hire
          providers across the UK. Most can carry out a site assessment within
          24 hours.
        </p>
        <Link
          href="/providers"
          className="inline-block text-sm bg-[var(--sage)] text-white px-8 py-3.5 rounded-full hover:bg-[var(--sage)]/90 transition-all duration-300 font-medium"
        >
          Browse all providers &rarr;
        </Link>
      </section>
    </>
  );
}
