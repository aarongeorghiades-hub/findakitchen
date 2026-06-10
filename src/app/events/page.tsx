import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Festival & Event Kitchen Hire UK | FindAKitchen",
  description:
    "A guide to catering trailer hire, mobile kitchen units and food truck hire for UK festivals and events — the unit types, typical costs, and how to find and contact suppliers directly.",
  alternates: {
    canonical: "https://findakitchen.co.uk/events",
  },
};

export const revalidate = 3600;

const faqs = [
  {
    question: "How far in advance should I book a festival kitchen?",
    answer:
      "For peak festival season (June\u2013August), book at least 8\u201312 weeks in advance. Popular units sell out fast. For spring and autumn events, 4\u20136 weeks is usually sufficient. Contact providers early to secure your preferred dates.",
  },
  {
    question: "What power supply do event kitchens need?",
    answer:
      "Most mobile kitchen units and catering trailers run on LPG gas for cooking and a standard 13A or 32A electrical supply for fridges and lighting. Many providers offer generator packages if your event site has no mains power.",
  },
  {
    question: "Can I hire a catering trailer for just one day?",
    answer:
      "Yes \u2014 most providers offer single-day hire for one-off events such as weddings, corporate events, and private parties. Minimum hire periods vary by provider, so check when requesting a quote.",
  },
  {
    question: "Do I need any permits or licences to use a mobile kitchen at an event?",
    answer:
      "You may need a temporary event notice (TEN), food hygiene certification, and public liability insurance depending on your event type and local authority. Your provider can advise on requirements, but responsibility for permits typically sits with the event organiser.",
  },
  {
    question: "How much does festival kitchen hire cost?",
    answer:
      "Costs vary widely depending on unit type, hire duration, and delivery distance. Catering trailers typically start from \u00A3200\u2013\u00A3500 per day, while larger modular kitchen units can cost \u00A31,000+ per week. Contact several event catering suppliers directly to compare quotes.",
  },
];

export default function EventsPage() {
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
        name: "Events & Festivals",
        item: "https://findakitchen.co.uk/events",
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
            <span className="text-white/60">Events &amp; Festivals</span>
          </nav>

          <p className="text-xs uppercase tracking-widest text-[var(--clay-light)] mb-4">
            Events &amp; Festivals
          </p>

          <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-5">
            Festival &amp; Event Kitchen Hire
          </h1>

          <p className="text-lg text-white/50 font-light leading-relaxed max-w-2xl mb-8">
            Catering trailer hire, mobile kitchen units and food truck hire for
            UK festivals and events. This guide explains the different unit
            types, what they typically cost, and how to find and contact
            suppliers for your event.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#unit-types"
              className="text-sm bg-[var(--clay)] text-white px-6 py-2.5 rounded-full hover:bg-[var(--clay-light)] transition-all duration-300"
            >
              See what you can hire &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: UNIT TYPES ===== */}
      <section id="unit-types" className="py-16 md:py-24 px-6 lg:px-12">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          What can you hire for your event?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl">
          {[
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8m-8 4h4m-6 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm0 0v2a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              ),
              title: "Catering Trailers",
              description:
                "Towable, self-contained kitchen units with cooking, prep, and serving areas. Ideal for festivals, markets, and outdoor events.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-16 0H3m2 0v-2m14 2v-2M9 7h6m-6 4h6" />
                </svg>
              ),
              title: "Mobile Kitchen Units",
              description:
                "Larger modular kitchens for high-volume catering. Fully equipped with industrial ovens, fryers, and cold storage.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0H3m10 0l4-4m0 0l2 2m-2-2v6m-8-6h.01" />
                </svg>
              ),
              title: "Food Trucks",
              description:
                "Branded or unbranded food trucks available for hire. Great for street food events, corporate days, and weddings.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
                </svg>
              ),
              title: "Pop-Up Kitchens",
              description:
                "Temporary kitchen setups for short-term events, private parties, and one-off occasions. Quick to install and remove.",
            },
          ].map((unit) => (
            <div
              key={unit.title}
              className="group bg-white rounded-2xl p-8 border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4">{unit.icon}</div>
              <h3 className="font-serif text-xl text-[var(--charcoal)] mb-2">
                {unit.title}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {unit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 3: FINDING SUPPLIERS ===== */}
      <section id="finding-suppliers" className="py-16 md:py-24 px-6 lg:px-12 bg-gray-50">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-3">
          Finding event &amp; festival catering
        </h2>
        <div className="max-w-2xl space-y-4 text-[var(--muted)] leading-relaxed">
          <p>
            FindAKitchen helps people who&apos;ve lost their kitchen to a
            renovation, flood or fire, and businesses that need to keep cooking
            through a refit. We don&apos;t arrange one-off event catering.
          </p>
          <p>
            For a festival, party, wedding or corporate event, the quickest route
            is to search directly for &ldquo;event or festival catering kitchen
            hire&rdquo; or &ldquo;catering trailer hire&rdquo; in your area, then
            contact those suppliers yourself to check availability, capacity and
            pricing for your dates.
          </p>
          <p>
            If instead you run a business that needs a temporary commercial
            kitchen during a refurbishment, see our{" "}
            <Link
              href="/commercial"
              className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--charcoal)] transition-colors"
            >
              commercial kitchen hire
            </Link>{" "}
            page.
          </p>
        </div>
      </section>

      {/* ===== SECTION 4: HOW TO SOURCE ===== */}
      <section id="how-to-source" className="py-16 md:py-24 px-6 lg:px-12">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          How to source an event kitchen
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-[var(--border)] rounded-2xl overflow-hidden">
          {[
            {
              num: "01",
              title: "Work out what you need",
              body: "Decide on the unit type, the number of covers, your event dates and location, and whether the site has mains power or needs a generator.",
            },
            {
              num: "02",
              title: "Search for suppliers",
              body: "Search online for event or festival catering kitchen hire, catering trailer hire, or food truck hire in your area, and shortlist a few suppliers.",
            },
            {
              num: "03",
              title: "Contact suppliers directly",
              body: "Get in touch with the suppliers yourself to confirm availability, pricing, permits and delivery for your dates \u2014 then book directly with them.",
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

      {/* ===== SECTION 5: FAQ ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-gray-50">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          Common questions about event kitchen hire
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

      {/* ===== SECTION 6: WHO FINDAKITCHEN IS FOR ===== */}
      <section className="bg-[var(--charcoal)] py-16 md:py-24 px-6 lg:px-12 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
          Lost your kitchen, rather than catering an event?
        </h2>
        <p className="text-white/50 mb-8 max-w-xl mx-auto">
          FindAKitchen is built for households left without a kitchen by a
          renovation, flood or fire, and for businesses keeping things running
          through a refurbishment. For one-off events, search for event catering
          suppliers and contact them directly.
        </p>
        <Link
          href="/commercial"
          className="inline-block text-sm bg-[var(--sage)] text-white px-8 py-3.5 rounded-full hover:bg-[var(--sage)]/90 transition-all duration-300 font-medium"
        >
          Commercial kitchen hire &rarr;
        </Link>
      </section>
    </>
  );
}
