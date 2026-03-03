import { Metadata } from "next";
import { getKitchenTypes } from "@/lib/kitchen-types";
import KitchenTypeCard from "@/components/kitchen-types/KitchenTypeCard";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Types of Temporary Kitchen — Compare All Options",
  description:
    "Compare every type of temporary kitchen available in the UK — from compact driveway pods for home renovations to full modular kitchens for schools and hospitals. Find the right solution for your situation.",
  alternates: { canonical: "https://findakitchen.co.uk/kitchen-types" },
};

export const revalidate = 3600;

export default async function KitchenTypesPage() {
  const kitchenTypes = await getKitchenTypes();

  const commercial = kitchenTypes.filter((kt) => kt.market_segment === "commercial");
  const domestic = kitchenTypes.filter((kt) => kt.market_segment === "domestic");

  return (
    <>
      <div className="container-page py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Kitchen Types" },
          ]}
        />

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Types of Temporary Kitchen
          </h1>
          <p className="mt-3 text-lg text-slate-500 max-w-3xl">
            There are more options than most people realise. From compact indoor
            units perfect for a home renovation to full commercial kitchens that
            can serve hundreds of meals a day — here&apos;s every type of
            temporary kitchen available in the UK.
          </p>
        </div>

        {commercial.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Commercial Kitchen Solutions
            </h2>
            <p className="text-slate-500 mb-6">
              For schools, hospitals, restaurants, events, and construction sites.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {commercial.map((kt) => (
                <KitchenTypeCard key={kt.id} kitchenType={kt} />
              ))}
            </div>
          </div>
        )}

        {domestic.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Domestic Kitchen Solutions
            </h2>
            <p className="text-slate-500 mb-6">
              For homeowners dealing with renovations, flood damage, or insurance
              claims.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {domestic.map((kt) => (
                <KitchenTypeCard key={kt.id} kitchenType={kt} />
              ))}
            </div>
          </div>
        )}
      </div>

      <CTABanner
        headline="Not sure which type you need?"
        subline="Tell us your situation and we'll recommend the right type of temporary kitchen for you."
      />
    </>
  );
}
