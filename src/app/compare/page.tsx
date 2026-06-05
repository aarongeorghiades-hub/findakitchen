import { Metadata } from "next";
import Link from "next/link";
import { getSEOPages } from "@/lib/seo-pages";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Compare Temporary Kitchens — Pods, Containers, Gas vs Electric & More",
  description:
    "Honest side-by-side comparisons of temporary kitchen options — driveway pods against containers and trailers, gas versus electric, hiring versus buying, and how the main UK providers stack up.",
  alternates: { canonical: "https://findakitchen.co.uk/compare" },
};

export const revalidate = 3600;

// Grouped by what's actually being weighed up. Anything not listed falls into
// "More comparisons" so new rows are never dropped.
const GROUPS: { heading: string; blurb: string; slugs: string[] }[] = [
  {
    heading: "Unit type vs unit type",
    blurb:
      "The most common decision: which physical kind of kitchen suits your space, your driveway and your household.",
    slugs: [
      "driveway-pod-vs-container-kitchen",
      "driveway-pod-vs-indoor-capsule",
      "kitchen-pod-vs-container-kitchen",
      "kitchen-pod-vs-trailer-kitchen",
      "modular-vs-trailer-kitchen",
    ],
  },
  {
    heading: "Power, indoor or outdoor",
    blurb: "Practical trade-offs around how a unit is powered and where it sits.",
    slugs: [
      "gas-vs-electric-temporary-kitchen",
      "indoor-vs-outdoor-temporary-kitchen-comparison",
    ],
  },
  {
    heading: "Hire terms, buying & who it's for",
    blurb:
      "Whether to hire short or long term, hire or buy, and how domestic and commercial needs differ.",
    slugs: [
      "short-term-vs-long-term-kitchen-hire",
      "temporary-kitchen-hire-vs-buying",
      "domestic-vs-commercial-temporary-kitchen",
    ],
  },
  {
    heading: "Providers compared",
    blurb: "How the main UK temporary kitchen providers measure up against each other.",
    slugs: [
      "pkl-group-vs-tsg-vs-kitchen-rescue",
      "temporary-kitchen-providers-compared",
    ],
  },
];

export default async function CompareIndexPage() {
  const comparisons = await getSEOPages("comparison");
  const bySlug = new Map(comparisons.map((c) => [c.slug, c]));
  const placed = new Set<string>();

  const sections = GROUPS.map((group) => {
    const items = group.slugs
      .map((slug) => bySlug.get(slug))
      .filter((c): c is NonNullable<typeof c> => Boolean(c));
    items.forEach((c) => placed.add(c.slug));
    return { ...group, items };
  }).filter((section) => section.items.length > 0);

  const leftovers = comparisons.filter((c) => !placed.has(c.slug));
  if (leftovers.length > 0) {
    sections.push({
      heading: "More comparisons",
      blurb: "Further side-by-side comparisons.",
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
            { label: "Compare" },
          ]}
        />

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Compare Temporary Kitchens
          </h1>
          <p className="mt-3 text-lg text-slate-500 max-w-3xl">
            Most people sourcing a temporary kitchen are stuck between two
            options — a driveway pod or a container, gas or electric, hiring or
            buying. These side-by-side comparisons lay out the real differences
            in cost, space, power and practicality, so you can make the call
            with confidence rather than guessing.
          </p>
          <p className="mt-4 text-slate-500 max-w-3xl">
            Want the bigger picture first? Read our{" "}
            <Link href="/guides" className="text-primary-700 font-medium hover:underline">
              temporary kitchen guides
            </Link>{" "}
            or browse every{" "}
            <Link href="/kitchen-types" className="text-primary-700 font-medium hover:underline">
              type of temporary kitchen
            </Link>
            . Already know what you need?{" "}
            <Link href="/get-quotes" className="text-primary-700 font-medium hover:underline">
              Get free quotes
            </Link>
            .
          </p>
        </div>

        {sections.map((section) => (
          <div key={section.heading} className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {section.heading}
            </h2>
            <p className="text-slate-500 mb-6 max-w-3xl">{section.blurb}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((comparison) => (
                <Link
                  key={comparison.id}
                  href={`/compare/${comparison.slug}`}
                  className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-primary-500 hover:shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-slate-800 group-hover:text-primary-700 transition-colors mb-2">
                    {comparison.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                    {comparison.meta_description}
                  </p>
                  <p className="mt-4 text-sm font-medium text-primary-700">
                    Read the comparison &rarr;
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <CTABanner
        headline="Compared your options and ready to go?"
        subline="Tell us your situation and we'll match you with providers that fit — free, no-obligation quotes."
      />
    </>
  );
}
