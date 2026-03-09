import { Metadata } from "next";
import Link from "next/link";
import { LossAdjusterForm } from "./LossAdjusterForm";

export const metadata: Metadata = {
  title: "Loss Adjuster Kitchen Referral Service | FindAKitchen",
  description:
    "A specialist referral service for loss adjusters handling kitchen damage claims. FindAKitchen sources verified temporary kitchen providers and generates insurer-formatted quotes. \u00A3100\u2013\u00A3150 referral fee per completed hire.",
  alternates: {
    canonical: "https://findakitchen.co.uk/loss-adjusters",
  },
};

export default function LossAdjustersPage() {
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
        name: "Loss Adjusters",
        item: "https://findakitchen.co.uk/loss-adjusters",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
            <span className="text-white/60">Loss Adjusters</span>
          </nav>

          <p className="text-xs uppercase tracking-widest text-[var(--clay-light)] mb-4">
            For Loss Adjusters &amp; Claims Handlers
          </p>

          <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-5">
            Temporary Kitchen Referrals for Insurance Claims
          </h1>

          <p className="text-lg text-white/50 font-light leading-relaxed max-w-2xl mb-8">
            When your claimant needs a temporary kitchen, FindAKitchen handles
            the sourcing, quoting and coordination &mdash; so you don&apos;t
            have to. Insurer-formatted quotes provided as standard.
          </p>

          <a
            href="#register"
            className="text-sm bg-[var(--clay)] text-white px-6 py-2.5 rounded-full hover:bg-[var(--clay-light)] transition-all duration-300 inline-block"
          >
            Register your firm &rarr;
          </a>
        </div>
      </section>

      {/* ===== SECTION 2: THE PROBLEM WE SOLVE ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          The challenge with kitchen damage claims
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
          <div className="text-[var(--warm-mid)] leading-relaxed">
            <p>
              When a kitchen is damaged by fire, flood or escape of water, the
              claimant needs a temporary replacement quickly. Loss adjusters
              currently have no dedicated referral network for temporary kitchens
              &mdash; sourcing falls to the claimant, delays extend the claim,
              and quotes rarely arrive in the format insurers need.
            </p>
          </div>

          <div className="space-y-5">
            {[
              "Claimants struggle to find verified, insured providers",
              "Quotes arrive in inconsistent formats \u2014 not insurer-ready",
              "Delays in sourcing extend claim duration and increase costs",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs font-bold">
                  &times;
                </span>
                <p className="text-sm text-[var(--warm-mid)] leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: HOW IT WORKS ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-gray-50">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          How it works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-[2px] bg-[var(--border)] rounded-2xl overflow-hidden">
          {[
            {
              num: "01",
              title: "You refer the claimant",
              body: "Share a unique referral link or submit the claimant\u2019s details via our secure B2B form. Takes under 2 minutes.",
            },
            {
              num: "02",
              title: "We source and match",
              body: "FindAKitchen matches the claimant to verified local providers based on kitchen type, location and availability. We contact the claimant directly.",
            },
            {
              num: "03",
              title: "Insurer-formatted quote",
              body: "We generate a compliant quote document \u2014 itemised, dated, with provider credentials \u2014 ready to attach to the claim file.",
            },
            {
              num: "04",
              title: "You receive the referral fee",
              body: "Once the hire is confirmed, we pay \u00A3100\u2013\u00A3150 per completed placement directly to your firm or nominated account.",
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

      {/* ===== SECTION 4: WHY FINDAKITCHEN ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          Why loss adjusters choose FindAKitchen
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl">
          {[
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Verified providers only",
              description:
                "Every provider on FindAKitchen is vetted for public liability insurance, gas safety certification and food hygiene compliance. No cowboy operators.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              title: "Insurer-ready documentation",
              description:
                "Quote documents are structured to meet standard insurer requirements \u2014 itemised costs, provider credentials, hire period and VAT breakdown.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Fast turnaround",
              description:
                "Most claimants receive a matched provider and draft quote within 24 hours of referral. Urgent same-day matching available on request.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              ),
              title: "Fee per completed hire",
              description:
                "No subscription, no monthly cost. You earn \u00A3100\u2013\u00A3150 for every hire that completes. Zero risk, zero admin overhead.",
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

      {/* ===== SECTION 5: TARGET FIRMS ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-6">
            Built for the UK loss adjusting industry
          </h2>

          <p className="text-[var(--warm-mid)] leading-relaxed mb-10">
            FindAKitchen&apos;s referral programme is designed for loss adjusters
            and claims handlers at firms of all sizes &mdash; from major
            nationals to independent practices.
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            {[
              "Sedgwick",
              "Crawford & Company",
              "Davies Group",
              "Woodgate & Clark",
            ].map((firm) => (
              <span
                key={firm}
                className="bg-white border border-[var(--border)] rounded-full px-5 py-2 text-sm text-[var(--charcoal)] font-medium"
              >
                {firm}
              </span>
            ))}
          </div>

          <p className="text-xs text-[var(--muted)]">
            These firms are cited as representative of our target partners. If
            your firm is not listed, we welcome enquiries from all FCA-regulated
            loss adjusters.
          </p>
        </div>
      </section>

      {/* ===== SECTION 6: B2B ENQUIRY FORM ===== */}
      <section id="register" className="py-16 md:py-24 px-6 lg:px-12">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-3">
            Register your firm
          </h2>
          <p className="text-[var(--muted)] mb-10">
            Complete the form below and a member of the FindAKitchen team will
            be in touch within one business day to discuss the referral
            programme.
          </p>

          <LossAdjusterForm />

          <p className="text-sm text-[var(--muted)] leading-relaxed mt-8">
            Claimant also needs to compare domestic providers? See our{" "}
            <Link href="/insurance-claims" className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--charcoal)] transition-colors">
              insurance claims page &rarr;
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
