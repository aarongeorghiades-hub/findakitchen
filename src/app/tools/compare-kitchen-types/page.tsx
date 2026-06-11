import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTABanner from "@/components/shared/CTABanner";
import { CompareKitchenTypesClient } from "./CompareKitchenTypesClient";

export const metadata: Metadata = {
  title: "Compare Temporary Kitchen Types — Which Do You Need? | FindAKitchen",
  description:
    "Compare driveway pods, indoor capsules, container and trailer kitchens side by side — space, appliances, install time and typical cost — to work out which temporary kitchen fits your home. Free interactive tool.",
  alternates: {
    canonical: "https://findakitchen.co.uk/tools/compare-kitchen-types",
  },
};

export default function CompareKitchenTypesPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://findakitchen.co.uk" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compare Kitchen Types",
        item: "https://findakitchen.co.uk/tools/compare-kitchen-types",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container-page py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Compare Kitchen Types" },
          ]}
        />

        <div className="max-w-3xl mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-[var(--charcoal)] mb-4">
            Which temporary kitchen type do you need?
          </h1>
          <p className="text-lg text-[var(--muted)] leading-relaxed">
            Your kitchen is suddenly out of action and you need to keep cooking.
            There are a few types of temporary kitchen, and the right one depends
            on your space, your household, and how your kitchen came to be out of
            use. Compare the main options side by side below, then get free
            quotes for the one that fits.
          </p>
          <p className="mt-4 text-[var(--muted)] leading-relaxed">
            If your kitchen loss is an insurance claim — a flood, fire or escape
            of water — the hire is often covered by your insurance. Check whether
            your policy includes alternative accommodation or loss-of-use cover.
            See our{" "}
            <Link href="/insurance-claims" className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--charcoal)]">
              insurance claims
            </Link>{" "}
            page for how that works.
          </p>
        </div>

        <CompareKitchenTypesClient />

        {/* Go-deeper cross-links to the SEO prose comparisons */}
        <div className="max-w-3xl mt-12">
          <h2 className="font-serif text-2xl text-[var(--charcoal)] mb-3">
            Want the detail on a head-to-head?
          </h2>
          <p className="text-[var(--muted)] leading-relaxed">
            For a deeper look at the most common decisions, read the full{" "}
            <Link href="/compare/driveway-pod-vs-indoor-capsule" className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--charcoal)]">
              driveway pod vs indoor capsule
            </Link>
            ,{" "}
            <Link href="/compare/driveway-pod-vs-container-kitchen" className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--charcoal)]">
              driveway pod vs container kitchen
            </Link>{" "}
            and{" "}
            <Link href="/compare/kitchen-pod-vs-trailer-kitchen" className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--charcoal)]">
              kitchen pod vs trailer kitchen
            </Link>{" "}
            comparisons. You can also browse every{" "}
            <Link href="/kitchen-types" className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--charcoal)]">
              type of temporary kitchen
            </Link>{" "}
            or see all our{" "}
            <Link href="/compare" className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--charcoal)]">
              side-by-side comparisons
            </Link>
            .
          </p>
        </div>
      </div>

      <CTABanner
        headline="Worked out which type fits?"
        subline="Tell us your situation and we'll match you with providers that supply it — free, no-obligation quotes."
      />
    </>
  );
}
