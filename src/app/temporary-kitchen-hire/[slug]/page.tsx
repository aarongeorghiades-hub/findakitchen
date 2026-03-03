import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getRegionBySlug, getAllRegionSlugs, getRegions } from "@/lib/regions";
import { getKitchenTypes } from "@/lib/kitchen-types";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import KitchenTypeCard from "@/components/kitchen-types/KitchenTypeCard";
import CTABanner from "@/components/shared/CTABanner";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllRegionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const region = await getRegionBySlug(params.slug);
  if (!region) return { title: "Location Not Found" };

  return {
    title: `Temporary Kitchen Hire in ${region.name}`,
    description: `Find temporary kitchen hire providers in ${region.name}. Compare options for home renovations, flood damage, insurance claims, schools, events, and more. Get free quotes today.`,
    alternates: {
      canonical: `https://findakitchen.co.uk/temporary-kitchen-hire/${params.slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function RegionLandingPage({ params }: Props) {
  const [region, kitchenTypes, allRegions] = await Promise.all([
    getRegionBySlug(params.slug),
    getKitchenTypes(),
    getRegions(),
  ]);

  if (!region) notFound();

  const otherRegions = allRegions.filter((r) => r.id !== region.id).slice(0, 12);

  return (
    <>
      <div className="container-page py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Locations" },
            { label: region.name },
          ]}
        />

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Temporary Kitchen Hire in {region.name}
          </h1>
          <p className="mt-3 text-lg text-slate-500 max-w-3xl">
            Looking for a temporary kitchen in {region.name}? Whether you&apos;re
            a homeowner dealing with a renovation or flood damage, a school that
            needs to keep feeding students, or an event organiser — we&apos;ll
            help you find the right solution from providers who cover{" "}
            {region.name}.
          </p>
        </div>

        {/* Situations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Common situations in {region.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Home Renovations",
                desc: `Having your kitchen renovated in ${region.name}? A temporary kitchen keeps you cooking throughout the build.`,
                situation: "renovation",
              },
              {
                title: "Flood or Fire Damage",
                desc: `Experienced water or fire damage in ${region.name}? Emergency temporary kitchens can be delivered within 24 hours.`,
                situation: "flood_fire_damage",
              },
              {
                title: "Insurance Claims",
                desc: `Making a kitchen insurance claim in ${region.name}? Your insurer may cover the full cost of a temporary kitchen.`,
                situation: "insurance_claim",
              },
              {
                title: "School & Hospital Refurbishment",
                desc: `${region.name} school or hospital kitchen being refurbished? Commercial temporary kitchens keep your catering running.`,
                situation: "school_hospital_refurb",
              },
              {
                title: "Events & Festivals",
                desc: `Organising an event in ${region.name}? Mobile and trailer kitchens provide full catering capabilities.`,
                situation: "event_festival",
              },
              {
                title: "Restaurant Refurbishment",
                desc: `Refurbishing your restaurant kitchen in ${region.name}? Stay open and trading with a temporary kitchen.`,
                situation: "restaurant_refurb",
              },
            ].map((item) => (
              <Link
                key={item.situation}
                href={`/get-quotes?situation=${item.situation}`}
                className="rounded-xl border border-slate-200 bg-white p-5 hover:border-primary-500 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-slate-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Kitchen types available */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Kitchen types available in {region.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kitchenTypes.slice(0, 6).map((kt) => (
              <KitchenTypeCard key={kt.id} kitchenType={kt} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/kitchen-types" className="btn-secondary">
              View All Kitchen Types
            </Link>
          </div>
        </section>

        {/* Other locations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Other locations
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherRegions.map((r) => (
              <Link
                key={r.id}
                href={`/temporary-kitchen-hire/${r.slug}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-primary-500 hover:text-primary-700 transition-colors"
              >
                {r.name}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <CTABanner
        headline={`Need a temporary kitchen in ${region.name}?`}
        subline="Tell us your situation and we'll match you with providers who cover your area."
      />
    </>
  );
}
