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
              FindAKitchen.co.uk is a free guide to the temporary kitchen
              market. We explain the options available, help you work out what
              type of kitchen you actually need, and list the specialist UK
              providers who supply them so you can approach them yourself.
            </p>

            <h2>How it works</h2>
            <ol>
              <li>
                <strong>Work out what you need</strong> — our guides cover
                renovation, flood damage, insurance claims, school
                refurbishments, events and more.
              </li>
              <li>
                <strong>Compare the providers</strong> — the directory lists
                coverage, kitchen types, delivery speed and whether each
                provider works on insurance claims.
              </li>
              <li>
                <strong>Contact them yourself</strong> — approach the providers
                that fit and ask each one for a quote. There is no obligation,
                and nothing goes through us.
              </li>
            </ol>

            <h2>Why use FindAKitchen?</h2>
            <ul>
              <li>
                <strong>We save you time</strong> — instead of hunting down
                providers one by one, they are listed together with the details
                that decide which ones are worth calling.
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
              We research the temporary kitchen market and list specialist
              providers across the UK, so you can find one that fits your
              situation without ringing round a dozen companies. We don&apos;t run
              a formal vetting process, so make your own enquiries before you book.
              If you have a problem with a provider you found through us,{" "}
              <Link href="/contact">get in touch</Link> and we&apos;ll do what we
              can to help.
            </p>
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
