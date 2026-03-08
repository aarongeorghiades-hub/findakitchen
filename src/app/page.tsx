import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { PostcodeSearch } from "@/components/home/PostcodeSearch";
import { AnimatedCounter } from "@/components/home/AnimatedCounter";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import { HomeProviderPreview } from "@/components/home/HomeProviderPreview";
import { RotatingProviderCard } from "@/components/home/RotatingProviderCard";

export const revalidate = 3600;

async function getHomeData() {
  const { count } = await supabase
    .from("providers")
    .select("*", { count: "exact", head: true })
    .eq("active", true);

  const { data: previewProviders } = await supabase
    .from("providers")
    .select(
      "slug, name, market, region_base, coverage, notable_differentiators, insurance_friendly, power_source, trustpilot_rating, trustpilot_reviews"
    )
    .eq("active", true)
    .order("id")
    .limit(8);

  return {
    providerCount: count || 0,
    previewProviders: previewProviders || [],
  };
}

export default async function HomePage() {
  const { providerCount, previewProviders } = await getHomeData();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "FindAKitchen",
      url: "https://findakitchen.co.uk",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://findakitchen.co.uk/providers?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "FindAKitchen",
      url: "https://findakitchen.co.uk",
      description: "The UK's only neutral comparison platform for temporary kitchen hire. Compare domestic pods, commercial units, and catering trailers from verified providers.",
      foundingDate: "2025",
      areaServed: "GB",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== SECTION 1: HERO ===== */}
      <section className="min-h-[calc(100vh-72px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-72px)]">
          {/* Left column */}
          <div className="flex flex-col justify-center px-6 lg:px-12 py-16 md:py-24">
            <div className="inline-flex items-center gap-2 bg-[#EBF5EF] rounded-full px-4 py-1.5 mb-8 self-start">
              <span className="w-2 h-2 rounded-full bg-[var(--sage)] animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[var(--sage)] font-medium">
                UK&apos;s only temporary kitchen directory
              </span>
            </div>

            <h1 className="font-serif text-[46px] md:text-[56px] lg:text-[68px] leading-[1.05] text-[var(--charcoal)]">
              Your kitchen&apos;s
              <br />
              <em className="text-[var(--clay)]">out.</em> Life carries on.
            </h1>

            <p className="mt-6 text-[17px] font-light text-[var(--muted)] max-w-lg leading-relaxed">
              Compare every temporary kitchen provider in the UK — domestic pods
              for renovations, commercial hire for businesses. One place, zero
              hassle.
            </p>

            <PostcodeSearch />

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-[var(--border)] grid grid-cols-3 gap-6">
              <div>
                <p className="font-serif text-3xl text-[var(--charcoal)]">
                  <AnimatedCounter target={providerCount} suffix="+" />
                </p>
                <p className="text-xs text-[var(--muted)] mt-1">Vetted providers</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-[var(--charcoal)]">
                  <AnimatedCounter target={2} />
                </p>
                <p className="text-xs text-[var(--muted)] mt-1">Market segments</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-[var(--charcoal)]">UK&#8209;wide</p>
                <p className="text-xs text-[var(--muted)] mt-1">Coverage</p>
              </div>
            </div>
          </div>

          {/* Right column — hero photo */}
          <div className="relative hidden md:block overflow-hidden">
            <Image
              src="/images/hero-pod.png"
              alt="Temporary kitchen pod on a residential driveway at dusk"
              fill
              priority
              className="object-cover object-center"
              sizes="50vw"
            />
            {/* Subtle dark gradient overlay on left edge to blend into left column */}
            <div
              className="absolute inset-y-0 left-0 w-24 pointer-events-none"
              style={{
                background: "linear-gradient(to right, var(--cream), transparent)",
              }}
            />
            {/* Rotating featured provider card */}
            <RotatingProviderCard providers={previewProviders} />
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: TRUST BAR ===== */}
      <ScrollReveal>
        <section className="bg-[var(--charcoal)] py-6">
          <div className="px-6 lg:px-12">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <span className="text-[10px] uppercase tracking-widest text-white/40 whitespace-nowrap">
                Trusted by
              </span>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                {[
                  "\u{1F3E0} Homeowners",
                  "\u{1F512} Insurance claimants",
                  "\u{1F37D}\u{FE0F} Restaurants",
                  "\u{1F3D7}\u{FE0F} Construction sites",
                  "\u{1F3EB} Schools & care homes",
                  "\u{1F3AA} Events & festivals",
                ].map((item) => (
                  <span key={item} className="text-sm text-white/60 whitespace-nowrap">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ===== SECTION 3: HOW IT WORKS ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-3">
            How it works
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
            From search to setup <em className="text-[var(--clay)]">in days,</em>{" "}
            not weeks.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-[var(--border)] rounded-2xl overflow-hidden">
          {[
            {
              num: "01",
              emoji: "\u{1F50D}",
              title: "Tell us what you need",
              body: "Domestic renovation? Commercial refurb? Insurance claim? Enter your postcode and situation — we show you every relevant provider.",
            },
            {
              num: "02",
              emoji: "\u2696\u{FE0F}",
              title: "Compare side by side",
              body: "See pricing, kitchen types, delivery speed, insurance support and reviews — all in one place. No more calling around.",
            },
            {
              num: "03",
              emoji: "\u2705",
              title: "Get quotes & go",
              body: "Request quotes from your shortlisted providers. Most respond within 24 hours. Some deliver within 48.",
            },
          ].map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 80}>
              <div className="group bg-white p-8 md:p-10 relative transition-all duration-300 hover:bg-[var(--charcoal)] cursor-default min-h-[260px]">
                <span className="absolute top-4 right-6 font-serif text-[88px] leading-none text-[var(--border)] group-hover:text-white/10 transition-colors duration-300 select-none">
                  {step.num}
                </span>
                <span className="text-3xl mb-4 block">{step.emoji}</span>
                <h3 className="font-serif text-xl text-[var(--charcoal)] group-hover:text-white transition-colors duration-300 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--muted)] group-hover:text-white/60 transition-colors duration-300 leading-relaxed">
                  {step.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== SECTION 4: PROVIDER PREVIEW ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-[#F2EDE5]">
        <ScrollReveal>
          <HomeProviderPreview
            providers={previewProviders}
            totalCount={providerCount}
          />
        </ScrollReveal>
      </section>

      {/* ===== SECTION 5: USE CASES ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-3">
            Use cases
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-12">
            Whatever the <em className="text-[var(--clay)]">situation,</em>{" "}
            there&apos;s a solution.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              bg: "bg-[var(--charcoal)]",
              text: "text-white",
              muted: "text-white/60",
              ghost: "text-white/[0.07]",
              emoji: "\u{1F528}",
              title: "Kitchen renovation",
              body: "Keep cooking while the builders are in. Domestic pods sit on your driveway and plug into your existing utilities.",
              ghostText: "Renovation",
            },
            {
              bg: "bg-[var(--clay)]",
              text: "text-white",
              muted: "text-white/70",
              ghost: "text-white/[0.07]",
              emoji: "\u{1F512}",
              title: "Insurance claim",
              body: "Many insurers cover temporary kitchen hire. Our insurance-ready providers handle the paperwork for you.",
              ghostText: "Insurance",
            },
            {
              bg: "bg-[var(--sage)]",
              text: "text-white",
              muted: "text-white/70",
              ghost: "text-white/[0.07]",
              emoji: "\u{1F37D}\u{FE0F}",
              title: "Commercial refurbishment",
              body: "Schools, hospitals, restaurants — keep feeding people while your main kitchen is offline. Units serve 200-800+ meals/day.",
              ghostText: "Commercial",
            },
            {
              bg: "bg-[#F2EDE5]",
              text: "text-[var(--charcoal)]",
              muted: "text-[var(--muted)]",
              ghost: "text-[var(--charcoal)]/[0.04]",
              emoji: "\u{1F3AA}",
              title: "Events & festivals",
              body: "Trailer kitchens and mobile units for events of any size. Towable, self-contained, ready to go.",
              ghostText: "Events",
            },
          ].map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 80}>
              <div
                className={`${card.bg} rounded-2xl p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl min-h-[220px]`}
              >
                <span
                  className={`absolute top-2 right-4 font-serif italic text-[80px] md:text-[100px] leading-none select-none ${card.ghost}`}
                >
                  {card.ghostText}
                </span>
                <span className="text-3xl mb-4 block relative z-10">
                  {card.emoji}
                </span>
                <h3 className={`font-serif text-xl ${card.text} mb-2 relative z-10`}>
                  {card.title}
                </h3>
                <p className={`text-sm ${card.muted} leading-relaxed relative z-10`}>
                  {card.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== SECTION 6: TOOLS TEASER ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-[var(--charcoal)]">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-widest text-[var(--clay-light)] mb-3">
            Tools
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-12">
            Know before you call.{" "}
            <em className="text-[var(--clay-light)]">Save time,</em> ask better
            questions.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              emoji: "\u{1F4D0}",
              title: "Driveway Fit Checker",
              body: "Enter your driveway dimensions and we'll tell you which pods and units will fit.",
              href: "/tools/driveway-fit-checker",
              live: true,
            },
            {
              emoji: "\u{1F4B7}",
              title: "Quote Estimator",
              body: "Get a ballpark price range before you contact providers. Based on real market data.",
              href: null,
              live: false,
            },
            {
              emoji: "\u{1F9EE}",
              title: "Insurance Calculator",
              body: "Find out if your insurance covers temporary kitchen hire and estimate your claim value.",
              href: null,
              live: false,
            },
          ].map((tool, i) => (
            <ScrollReveal key={tool.title} delay={i * 80}>
              <div className="relative border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 overflow-hidden group">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(194,89,58,0.08) 0%, transparent 60%)",
                  }}
                />
                <span className="text-3xl mb-4 block relative z-10">
                  {tool.emoji}
                </span>
                <h3 className="font-serif text-xl text-white mb-2 relative z-10">
                  {tool.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-4 relative z-10">
                  {tool.body}
                </p>
                {tool.live && tool.href ? (
                  <a
                    href={tool.href}
                    className="inline-block text-xs text-white border border-white/20 px-4 py-2 rounded-full relative z-10 hover:bg-white/10 transition-all duration-200"
                  >
                    Try it free &rarr;
                  </a>
                ) : (
                  <span className="inline-block text-xs text-white/30 border border-white/10 px-3 py-1 rounded-full relative z-10">
                    Coming soon
                  </span>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-16 md:py-24 px-6 lg:px-12 text-center">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] mb-4">
            Ready to find your kitchen?
          </h2>
          <p className="text-[var(--muted)] mb-8 max-w-lg mx-auto">
            Browse providers, compare options, and get free quotes — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/providers"
              className="bg-[var(--charcoal)] text-white px-8 py-3.5 rounded-full hover:bg-[var(--clay)] transition-all duration-300 text-sm font-medium"
            >
              Browse providers &rarr;
            </Link>
            <Link
              href="/get-quotes"
              className="border border-[var(--border)] text-[var(--warm-mid)] px-8 py-3.5 rounded-full hover:border-[var(--charcoal)] hover:text-[var(--charcoal)] transition-all duration-300 text-sm font-medium"
            >
              Get free quotes
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
