import { Metadata } from "next";
import Link from "next/link";

// Informational page. FindAKitchen does not take claimant details, source
// providers or produce quotes on anyone's behalf — there is no form, no portal
// and no backend. The only call to action is an email address.
const CONTACT_EMAIL = "hello@findakitchen.co.uk";
const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Loss adjuster enquiry — temporary kitchens"
)}`;

export const metadata: Metadata = {
  title: "Loss Adjuster Kitchen Referral Service",
  description:
    "A guide for loss adjusters and claims handlers on temporary kitchen hire in kitchen damage claims — what claimants need, what insurers expect from a quote, and where to find specialist UK providers.",
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
            When a claimant needs a temporary kitchen, the hard part is knowing
            what to look for and who supplies it. This page sets out how
            temporary kitchen hire works on a claim, and where to find the
            specialist UK providers who do it.
          </p>

          <Link
            href="/providers"
            className="text-sm bg-[var(--clay)] text-white px-6 py-2.5 rounded-full hover:bg-[var(--clay-light)] transition-all duration-300 inline-block"
          >
            Browse the provider directory &rarr;
          </Link>
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
              "Claimants struggle to find specialist, insured providers",
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

      {/* ===== SECTION 3: TALK TO US ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-6">
            Questions about a claim?
          </h2>
          <p className="text-lg text-[var(--warm-mid)] leading-relaxed">
            Email us at{" "}
            <a
              href={MAILTO}
              className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--charcoal)] transition-colors"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            and we&apos;ll help however we can. Please don&apos;t send claimant
            personal details &mdash; we have no system to handle them.
          </p>
        </div>
      </section>

      {/* ===== SECTION 4: WHY FINDAKITCHEN ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          What to know before approving a temporary kitchen
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl">
          {[
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Insurance-ready providers",
              description:
                "Many providers on FindAKitchen work on insurance claims and operate with public liability insurance, gas safety and food hygiene compliance. Confirm the specifics for your claim directly with the provider.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              title: "Insurer-ready documentation",
              description:
                "Ask a provider for an insurance-ready quote and most will itemise costs, credentials, hire period and VAT in the format insurers expect. Request it up front rather than after the fact.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Built for urgency",
              description:
                "Many providers quote within 24 hours and deliver inside 48, and some offer emergency call-out. Delivery speed is listed on each provider profile so you can see who moves fastest.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              ),
              title: "Free to use",
              description:
                "No subscription, no monthly cost, no registration. The directory and every guide on this site are open to read and free to use.",
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
            This page is written for loss adjusters and claims handlers at firms
            of all sizes &mdash; from major nationals to independent practices
            &mdash; who deal with kitchen damage claims.
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
            These firms are named only as examples of the sector this page is
            written for. FindAKitchen has no arrangement with any of them.
          </p>
        </div>
      </section>

      {/* ===== SECTION 6: NEXT STEPS ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-3">
            Where to go next
          </h2>
          <p className="text-[var(--muted)] leading-relaxed mb-8">
            Every provider we know of is listed in the directory, with coverage,
            kitchen types, delivery speed and whether they work on insurance
            claims. Contact whoever fits the claim directly.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/providers"
              className="inline-block bg-[var(--clay)] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[var(--clay-light)] transition-all duration-300"
            >
              Browse the provider directory &rarr;
            </Link>
            <Link
              href="/guides/loss-adjuster-temporary-kitchen-guide"
              className="inline-block border border-[var(--border)] text-[var(--warm-mid)] px-6 py-3 rounded-full text-sm font-medium hover:border-[var(--charcoal)] hover:text-[var(--charcoal)] transition-all duration-300"
            >
              Read the loss adjuster guide
            </Link>
          </div>

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
