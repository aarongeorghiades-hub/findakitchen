import { Metadata } from "next";
import Link from "next/link";
// TradePartnerForm import removed — form parked as "coming soon"

export const metadata: Metadata = {
  title: "Trade Partner Referral Programme | FindAKitchen",
  description:
    "Kitchen fitters, builders and tradespeople \u2014 earn \u00A330\u2013\u00A350 for every temporary kitchen hire you refer. Join the FindAKitchen trade partner programme. Free to join, no targets.",
  alternates: {
    canonical: "https://findakitchen.co.uk/trade-partners",
  },
};

export default function TradePartnersPage() {
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
        name: "Trade Partners",
        item: "https://findakitchen.co.uk/trade-partners",
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
            <span className="text-white/60">Trade Partners</span>
          </nav>

          <p className="text-xs uppercase tracking-widest text-[var(--clay-light)] mb-4">
            For Kitchen Fitters &amp; Tradespeople
          </p>

          <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-5">
            Earn &pound;30&ndash;50 Every Time a Client Needs a Temporary
            Kitchen
          </h1>

          <p className="text-lg text-white/50 font-light leading-relaxed max-w-2xl mb-6">
            Join the FindAKitchen trade partner programme. Refer clients who
            need a temporary kitchen during a renovation &mdash; we handle
            everything, you earn a fee for every completed hire.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <span className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs text-white/70">
              &pound;30&ndash;50 per completed hire
            </span>
            <span className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs text-white/70">
              Free to join &middot; No targets
            </span>
          </div>

          <a
            href="#register"
            className="text-sm bg-[var(--clay)] text-white px-6 py-2.5 rounded-full hover:bg-[var(--clay-light)] transition-all duration-300 inline-block"
          >
            Join the programme &rarr;
          </a>
        </div>
      </section>

      {/* ===== SECTION 2: HOW IT WORKS ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          How the trade partner programme works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-[2px] bg-[var(--border)] rounded-2xl overflow-hidden">
          {[
            {
              num: "01",
              title: "Register free",
              body: "Sign up below in under 2 minutes. We\u2019ll send you a unique referral link and a simple one-page explainer to share with clients.",
            },
            {
              num: "02",
              title: "Tell your clients",
              body: "When a client mentions they\u2019ll need somewhere to cook during the fit, share your referral link. That\u2019s it \u2014 we take it from there.",
            },
            {
              num: "03",
              title: "We handle everything",
              body: "FindAKitchen contacts the client, matches them to a local provider, and manages the booking. You don\u2019t need to do anything else.",
            },
            {
              num: "04",
              title: "You get paid",
              body: "Once the hire completes, we transfer \u00A330\u2013\u00A350 directly to you. Payments processed monthly via bank transfer.",
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

        <p className="text-sm text-[var(--muted)] leading-relaxed mt-8">
          Not sure what your clients will get? See our{" "}
          <Link href="/providers" className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--charcoal)] transition-colors">
            domestic kitchen hire
          </Link>{" "}
          and{" "}
          <Link href="/insurance-claims" className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--charcoal)] transition-colors">
            insurance claims
          </Link>{" "}
          pages.
        </p>
      </section>

      {/* ===== SECTION 3: WHO IS THIS FOR ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-gray-50">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          Built for the trades
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              title: "Kitchen fitters",
              description:
                "Every kitchen fit means a client without cooking facilities for days or weeks. You\u2019re the first person they ask.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7l4-4h10l4 4" />
                </svg>
              ),
              title: "Builders & contractors",
              description:
                "Extension builds, full refurbs, structural works \u2014 your clients need solutions you can recommend with confidence.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2m0 14v2m-5-5H5m14 0h-2M7.05 7.05L5.636 5.636m12.728 12.728L16.95 16.95M7.05 16.95l-1.414 1.414M18.364 5.636L16.95 7.05" />
                  <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
                </svg>
              ),
              title: "Plumbers",
              description:
                "Pipe work, full bathroom-to-kitchen conversions, escape of water repairs. The temporary kitchen question comes up more than you\u2019d think.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: "Electricians",
              description:
                "Rewires, kitchen circuit upgrades, consumer unit replacements \u2014 clients facing days without a usable kitchen need a referral they can trust.",
            },
            {
              icon: (
                <svg className="h-8 w-8 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              ),
              title: "Decorators & designers",
              description:
                "Interior designers and decorators speccing full kitchen overhauls regularly field the \u2018what do we do in the meantime?\u2019 question.",
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

      {/* ===== SECTION 4: THE NUMBERS ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
          What you can earn
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[
            {
              stat: "\u00A330\u201350",
              label: "Per completed hire",
              sub: "Paid monthly, no minimum threshold",
            },
            {
              stat: "2 mins",
              label: "To refer a client",
              sub: "Share your link \u2014 we do the rest",
            },
            {
              stat: "\u00A30",
              label: "To join",
              sub: "No subscription, no targets, no catch",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl p-8 border border-[var(--border)] text-center"
            >
              <p className="font-serif text-4xl md:text-5xl text-[var(--clay)] mb-2">
                {item.stat}
              </p>
              <p className="font-medium text-[var(--charcoal)] mb-1">
                {item.label}
              </p>
              <p className="text-xs text-[var(--muted)]">{item.sub}</p>
            </div>
          ))}
        </div>

        <div className="bg-[var(--sage)]/10 border border-[var(--sage)]/20 rounded-2xl p-6 max-w-3xl">
          <p className="text-sm text-[var(--charcoal)] leading-relaxed">
            <strong>Example:</strong> If you fit 3 kitchens a month and 2
            clients use your referral link, that&apos;s &pound;60&ndash;100
            extra every month for 2 minutes of effort.
          </p>
        </div>
      </section>

      {/* ===== SECTION 5: WHAT YOUR CLIENTS GET ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-6">
            What we tell your clients
          </h2>

          <p className="text-[var(--warm-mid)] leading-relaxed mb-10">
            When you refer a client, FindAKitchen handles the relationship
            professionally &mdash; your recommendation reflects well on you.
          </p>

          <div className="space-y-6">
            {[
              {
                title: "Matched to a local, verified provider",
                description:
                  "We don\u2019t send clients to a generic directory. We match them to a verified provider near their location.",
              },
              {
                title: "Transparent pricing, no hard sell",
                description:
                  "Clients get a clear quote with no pressure. We\u2019re a comparison platform, not a sales machine.",
              },
              {
                title: "Fast response",
                description:
                  "Most clients hear from a matched provider within 24 hours of being referred.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">
                  &#10003;
                </span>
                <div>
                  <h3 className="font-medium text-[var(--charcoal)] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: REGISTRATION FORM ===== */}
      <section id="register" className="py-16 md:py-24 px-6 lg:px-12">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-3">
            Join the programme
          </h2>
          <p className="text-[var(--muted)] mb-10">
            Register below &mdash; it&apos;s free and takes under 2 minutes.
            We&apos;ll email your referral link within one business day.
          </p>

          <div className="bg-gray-50 rounded-2xl p-10 text-center max-w-xl mx-auto">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="font-serif text-2xl text-[var(--charcoal)] mb-3">
              Programme launching soon
            </h3>
            <p className="text-[var(--muted)] leading-relaxed mb-6">
              We&apos;re finalising the trade partner programme details. Leave your email below and we&apos;ll notify you when registration opens.
            </p>
            <a
              href="mailto:hello@findakitchen.co.uk?subject=Trade Partner Interest"
              className="inline-block bg-[var(--sage)] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[var(--sage)]/90 transition-all duration-300"
            >
              Register interest by email →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
