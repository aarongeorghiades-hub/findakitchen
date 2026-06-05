import { Metadata } from "next";
import Link from "next/link";
import { getSEOPages } from "@/lib/seo-pages";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Temporary Kitchen Guides — Renovations, Insurance Claims & Costs",
  description:
    "Practical guides for living without a kitchen — what an insurance claim covers, how much hire costs, which type of kitchen suits your situation, and how to keep family life running through a renovation.",
  alternates: { canonical: "https://findakitchen.co.uk/guides" },
};

export const revalidate = 3600;

// Curated, human-readable groupings. Any guide whose slug isn't listed here
// still appears under "More guides", so new rows are never dropped.
const GROUPS: { heading: string; blurb: string; slugs: string[] }[] = [
  {
    heading: "Planning & choosing your kitchen",
    blurb:
      "Start here if your kitchen is about to go out of action and you're working out what you actually need.",
    slugs: [
      "how-temporary-kitchen-hire-works",
      "choosing-right-temporary-kitchen",
      "temporary-kitchen-hire-checklist",
      "indoor-vs-outdoor-temporary-kitchen",
      "kitchen-pod-sizes-explained",
      "temporary-kitchen-electricity-water-requirements",
      "what-to-expect-kitchen-pod-delivery",
    ],
  },
  {
    heading: "Insurance, fire & flood claims",
    blurb:
      "If you're claiming after fire, flood or an escape of water, these explain what you're entitled to and how to get it.",
    slugs: [
      "will-insurance-pay-temporary-kitchen",
      "insurance-claim-kitchen-walkthrough",
      "temporary-kitchen-for-fire-damage",
      "temporary-kitchen-for-flood-damage",
      "temporary-kitchen-for-burst-pipe",
      "loss-adjuster-temporary-kitchen-guide",
    ],
  },
  {
    heading: "Costs & budgeting",
    blurb: "What temporary kitchen hire really costs, and how it compares to the alternatives.",
    slugs: ["temporary-kitchen-hire-cost", "temporary-kitchen-vs-eating-out-costs"],
  },
  {
    heading: "Living through a renovation",
    blurb:
      "The day-to-day reality of weeks without a kitchen — and how to keep family life, kids and older relatives comfortable.",
    slugs: [
      "temporary-kitchen-for-renovation",
      "kitchen-renovation-timeline-planning",
      "living-without-kitchen-survival-guide",
      "temporary-kitchen-with-kids",
      "temporary-kitchen-for-elderly-parents",
    ],
  },
  {
    heading: "Provider guides",
    blurb: "In-depth looks at individual UK temporary kitchen providers and what they offer.",
    slugs: [
      "big-kahuna",
      "courtesy-kitchens-and-bathrooms",
      "jongor",
      "kitchen-pod-hire",
      "kitchenpod",
      "premier-catering",
      "rolling-stock",
      "temporary-kitchens-com",
      "the-instant-kitchen-company",
      "the-temporary-kitchen-company",
    ],
  },
];

export default async function GuidesIndexPage() {
  const guides = await getSEOPages("guide");
  const bySlug = new Map(guides.map((g) => [g.slug, g]));
  const placed = new Set<string>();

  const sections = GROUPS.map((group) => {
    const items = group.slugs
      .map((slug) => bySlug.get(slug))
      .filter((g): g is NonNullable<typeof g> => Boolean(g));
    items.forEach((g) => placed.add(g.slug));
    return { ...group, items };
  }).filter((section) => section.items.length > 0);

  const leftovers = guides.filter((g) => !placed.has(g.slug));
  if (leftovers.length > 0) {
    sections.push({
      heading: "More guides",
      blurb: "Further reading on temporary kitchens.",
      slugs: [],
      items: leftovers,
    });
  }

  return (
    <>
      <div className="container-page py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Guides" },
          ]}
        />

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Temporary Kitchen Guides
          </h1>
          <p className="mt-3 text-lg text-slate-500 max-w-3xl">
            When your kitchen is suddenly out of action, the hardest part is
            knowing what&apos;s normal, what you&apos;re entitled to, and what to
            do next. These guides walk you through each stage — choosing the
            right type of temporary kitchen, understanding what an insurance
            claim covers, and keeping family life running through weeks without
            a kitchen. Each one is written for a specific situation, so you can
            go straight to the one that matches yours.
          </p>
          <p className="mt-4 text-slate-500 max-w-3xl">
            Weighing up two specific options? See our{" "}
            <Link href="/compare" className="text-primary-700 font-medium hover:underline">
              side-by-side comparisons
            </Link>
            . Not sure which unit fits your space? Browse the{" "}
            <Link href="/kitchen-types" className="text-primary-700 font-medium hover:underline">
              types of temporary kitchen
            </Link>
            , or{" "}
            <Link href="/get-quotes" className="text-primary-700 font-medium hover:underline">
              get free quotes
            </Link>{" "}
            when you&apos;re ready.
          </p>
        </div>

        {sections.map((section) => (
          <div key={section.heading} className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {section.heading}
            </h2>
            <p className="text-slate-500 mb-6 max-w-3xl">{section.blurb}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((guide) => (
                <Link
                  key={guide.id}
                  href={`/guides/${guide.slug}`}
                  className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-primary-500 hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-slate-800 group-hover:text-primary-700 transition-colors mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                    {guide.meta_description}
                  </p>
                  <p className="mt-4 text-sm font-medium text-primary-700">
                    Read the guide &rarr;
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <CTABanner
        headline="Still not sure what you need?"
        subline="Tell us your situation and we'll match you with the right providers — free, no-obligation quotes."
      />
    </>
  );
}
