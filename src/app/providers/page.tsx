import { Metadata } from "next";
import { getProviders } from "@/lib/providers";
import { getRegions } from "@/lib/regions";
import { getKitchenTypes } from "@/lib/kitchen-types";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTABanner from "@/components/shared/CTABanner";
import ProviderDirectoryClient from "./ProviderDirectoryClient";

export const metadata: Metadata = {
  title: "Temporary Kitchen Hire Providers",
  description:
    "Browse verified temporary kitchen hire providers across the UK. Filter by location, kitchen type, and market segment to find the right provider for your needs.",
  alternates: { canonical: "https://findakitchen.co.uk/providers" },
};

export const revalidate = 3600;

export default async function ProvidersPage() {
  const [providers, regions, kitchenTypes] = await Promise.all([
    getProviders(),
    getRegions(),
    getKitchenTypes(),
  ]);

  return (
    <>
      <div className="bg-primary-800 py-10">
        <div className="container-page">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Temporary Kitchen Hire Providers
          </h1>
          <p className="mt-3 text-lg text-primary-100 max-w-3xl">
            Browse our directory of temporary kitchen providers. Whether you need a
            compact pod for a home renovation or a full commercial kitchen for a
            school refurbishment, we&apos;ll help you find the right provider.
          </p>
        </div>
      </div>

      <div className="container-page py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Providers" },
          ]}
        />

        <ProviderDirectoryClient
          initialProviders={providers}
          regions={regions}
          kitchenTypes={kitchenTypes}
        />
      </div>

      <CTABanner
        headline="Can't find what you need?"
        subline="Tell us your requirements and we'll match you with the right providers — even if they're not listed here yet."
      />
    </>
  );
}
