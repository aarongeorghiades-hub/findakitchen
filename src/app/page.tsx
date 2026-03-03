import Link from "next/link";
import HeroSection from "@/components/home/HeroSection";
import SituationWizard from "@/components/home/SituationWizard";
import TrustSignals from "@/components/home/TrustSignals";
import HowItWorks from "@/components/home/HowItWorks";
import KitchenTypeCard from "@/components/kitchen-types/KitchenTypeCard";
import CTABanner from "@/components/shared/CTABanner";
import { getProviderCount } from "@/lib/providers";
import { getKitchenTypes } from "@/lib/kitchen-types";

export default async function HomePage() {
  const [providerCount, kitchenTypes] = await Promise.all([
    getProviderCount(),
    getKitchenTypes(),
  ]);

  const featuredTypes = kitchenTypes.slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "FindAKitchen.co.uk",
    description:
      "Find the right temporary kitchen for your situation. We guide homeowners and businesses to trusted temporary kitchen hire providers across the UK.",
    url: "https://findakitchen.co.uk",
    areaServed: "GB",
    serviceType: "Temporary Kitchen Hire",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection />
      <TrustSignals providerCount={providerCount} />
      <SituationWizard />
      <HowItWorks />

      {/* Kitchen Types Preview */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Types of temporary kitchen
            </h2>
            <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
              From compact indoor units for home renovations to full commercial
              kitchens serving hundreds of meals a day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredTypes.map((kt) => (
              <KitchenTypeCard key={kt.id} kitchenType={kt} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/kitchen-types" className="btn-secondary">
              View All Kitchen Types
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
