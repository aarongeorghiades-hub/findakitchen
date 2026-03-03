import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "About FindAKitchen.co.uk",
  description:
    "FindAKitchen.co.uk helps homeowners and businesses find the right temporary kitchen solution. We guide you through a confusing market and connect you with trusted providers.",
  alternates: { canonical: "https://findakitchen.co.uk/about" },
};

export default function AboutPage() {
  return (
    <>
      <div className="container-page py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "About" },
          ]}
        />

        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
            About FindAKitchen
          </h1>

          <div className="prose prose-slate prose-lg max-w-none">
            <p>
              When your kitchen is out of action — whether from a renovation, a
              flood, an insurance claim, or a commercial refurbishment — finding a
              temporary replacement shouldn&apos;t be another source of stress.
            </p>

            <p>
              That&apos;s why we built FindAKitchen. The temporary kitchen hire
              market is surprisingly large and varied, but most people don&apos;t
              know where to start. There are modular cabins, trailer kitchens,
              container conversions, driveway pods, indoor capsule kitchens, and
              more — each suited to different situations, budgets, and timescales.
            </p>

            <h2>What we do</h2>
            <p>
              FindAKitchen.co.uk is a free service that helps you navigate the
              temporary kitchen market. We&apos;re not a generic directory —
              we&apos;re a guide. We educate you about the options available, help
              you understand what type of kitchen you actually need, and connect
              you with verified providers who can deliver.
            </p>

            <h2>How it works</h2>
            <ol>
              <li>
                <strong>Tell us your situation</strong> — renovation, flood
                damage, insurance claim, school refurbishment, event, or something
                else entirely.
              </li>
              <li>
                <strong>We match you with the right providers</strong> — based on
                your location, timeline, capacity needs, and budget.
              </li>
              <li>
                <strong>Get quotes and compare</strong> — receive no-obligation
                quotes from providers who can actually help with your specific
                situation.
              </li>
            </ol>

            <h2>Why use FindAKitchen?</h2>
            <ul>
              <li>
                <strong>We save you time</strong> — instead of calling providers
                one by one, tell us what you need once and we&apos;ll do the
                matching.
              </li>
              <li>
                <strong>We educate you</strong> — most people don&apos;t know a
                driveway pod from a modular cabin. We explain the differences so
                you can make an informed decision.
              </li>
              <li>
                <strong>We&apos;re free</strong> — our service costs you nothing.
                We&apos;re funded by providers, not by you.
              </li>
              <li>
                <strong>We cover the whole UK</strong> — from London to Edinburgh,
                from domestic kitchens to large-scale commercial operations.
              </li>
            </ul>

            <h2>Our commitment</h2>
            <p>
              We only work with providers we trust. Every provider on our platform
              is vetted, and we stand behind the quality of our recommendations.
              If you have a problem with a provider we&apos;ve recommended,{" "}
              <Link href="/contact">get in touch</Link> and we&apos;ll help
              resolve it.
            </p>
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
