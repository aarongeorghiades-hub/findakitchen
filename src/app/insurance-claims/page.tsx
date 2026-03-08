import { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ProviderPreviewCard } from "@/components/home/ProviderPreviewCard";

export const metadata: Metadata = {
  title: "Temporary Kitchen Hire for Insurance Claims | FindAKitchen",
  description:
    "Need a temporary kitchen while your kitchen is repaired after flood, fire or water damage? Compare insurance-ready providers across the UK. Most policies cover the cost.",
  alternates: {
    canonical: "https://findakitchen.co.uk/insurance-claims",
  },
};

export const revalidate = 3600;

const faqs = [
  {
    question: "Does home insurance cover temporary kitchen hire?",
    answer:
      "Most home insurance policies with alternative accommodation or temporary accommodation cover will pay for a temporary kitchen pod while your kitchen is repaired. Check your policy wording for \u201Calternative accommodation\u201D or \u201Closs of use\u201D clauses. If unsure, call your insurer directly and ask.",
  },
  {
    question: "What damage types are covered?",
    answer:
      "Kitchen damage from floods, burst pipes, fire, and sewage leaks is most commonly covered. Gradual wear or planned renovation is generally not covered by insurance. Your loss adjuster will confirm eligibility.",
  },
  {
    question: "How do I get an insurer-approved quote?",
    answer:
      "Request a quote from any provider below stating it is for an insurance claim. They will supply a formally formatted document you can submit to your insurer or loss adjuster directly.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most providers install within 2\u20133 hours of delivery. Emergency delivery can often be arranged within 24 hours.",
  },
  {
    question: "Can I stay at home during repairs?",
    answer:
      "Yes \u2014 this is the main benefit of a temporary kitchen pod. Unlike hotel stays, you remain in your home with full cooking facilities on your driveway.",
  },
];

export default async function InsuranceClaimsPage() {
  const { data: providers } = await supabase
    .from("providers")
    .select(
      "slug, name, market, region_base, coverage, notable_differentiators, insurance_friendly, power_source"
    )
    .eq("active", true)
    .in("market", ["domestic", "both"])
    .order("insurance_friendly", { ascending: false });

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
        name: "Insurance Claims",
        item: "https://findakitchen.co.uk/insurance-claims",
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
            <span className="text-white/60">Insurance Claims</span>
          </nav>

          <p className="text-xs uppercase tracking-widest text-[var(--clay-light)] mb-4">
            Insurance Claims
          </p>

          <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-5">
            Temporary Kitchen Hire for Insurance Claims
          </h1>

          <p className="text-lg text-white/50 font-light leading-relaxed max-w-2xl mb-8">
            Need a temporary kitchen while your kitchen is repaired after flood,
            fire or water damage? Compare insurance-ready providers across the
            UK. Most policies cover the cost.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#providers"
              className="text-sm bg-[var(--clay)] text-white px-6 py-2.5 rounded-full hover:bg-[var(--clay-light)] transition-all duration-300"
            >
              Compare providers &rarr;
            </a>
            <Link
              href="/blog/does-home-insurance-cover-temporary-kitchen-hire"
              className="text-sm border border-white/20 text-white px-6 py-2.5 rounded-full hover:border-white/40 transition-all duration-300"
            >
              Check your cover &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: HOW IT WORKS ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          How insurance kitchen hire works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-[var(--border)] rounded-2xl overflow-hidden">
          {[
            {
              num: "01",
              title: "Your kitchen is damaged",
              body: "Fire, flood, burst pipe or leak leaves your kitchen unusable. Your home insurance policy may cover a temporary replacement.",
            },
            {
              num: "02",
              title: "Your insurer approves a pod",
              body: "Contact your insurer and ask about alternative accommodation cover. Most providers offer insurer-formatted quotes on request.",
            },
            {
              num: "03",
              title: "Pod delivered to your door",
              body: "A fully equipped kitchen pod is delivered and installed on your driveway within 24\u201348 hours. You stay home throughout.",
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

      {/* ===== SECTION 3: INSURANCE-READY PROVIDERS ===== */}
      <section id="providers" className="py-16 md:py-24 px-6 lg:px-12 bg-gray-50">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-3">
          Insurance-ready temporary kitchen providers
        </h2>
        <p className="text-[var(--muted)] mb-12 max-w-2xl">
          All providers below are experienced with insurance claims and can
          supply insurer-formatted quotes.
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

      {/* ===== SECTION 4: FAQ ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          Common questions about insurance and temporary kitchens
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

      {/* ===== SECTION 5: CTA STRIP ===== */}
      <section className="bg-[var(--charcoal)] py-16 md:py-24 px-6 lg:px-12 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
          Not sure which provider is right for you?
        </h2>
        <p className="text-white/50 mb-8 max-w-lg mx-auto">
          Use FindAKitchen to compare all UK temporary kitchen providers side by
          side — free, neutral, and independent.
        </p>
        <Link
          href="/providers"
          className="inline-block text-sm bg-[var(--sage)] text-white px-8 py-3.5 rounded-full hover:bg-[var(--sage)]/90 transition-all duration-300 font-medium"
        >
          Compare all providers &rarr;
        </Link>
      </section>
    </>
  );
}
