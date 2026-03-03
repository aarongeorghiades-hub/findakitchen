import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProviderBySlug, getAllProviderSlugs } from "@/lib/providers";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import ProviderProfile from "@/components/providers/ProviderProfile";
import CTABanner from "@/components/shared/CTABanner";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllProviderSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const provider = await getProviderBySlug(params.slug);
  if (!provider) return { title: "Provider Not Found" };

  return {
    title: `${provider.name} — Temporary Kitchen Hire`,
    description:
      provider.description ||
      `${provider.name} provides temporary kitchen hire solutions across the UK.`,
    alternates: {
      canonical: `https://findakitchen.co.uk/providers/${params.slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function ProviderPage({ params }: Props) {
  const provider = await getProviderBySlug(params.slug);
  if (!provider) notFound();

  return (
    <>
      <div className="container-page py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Providers", href: "/providers" },
            { label: provider.name },
          ]}
        />
        <ProviderProfile provider={provider} />
      </div>
      <CTABanner />
    </>
  );
}
