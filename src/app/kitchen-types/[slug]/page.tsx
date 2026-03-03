import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getKitchenTypeBySlug, getAllKitchenTypeSlugs } from "@/lib/kitchen-types";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import KitchenTypeDetail from "@/components/kitchen-types/KitchenTypeDetail";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllKitchenTypeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const kitchenType = await getKitchenTypeBySlug(params.slug);
  if (!kitchenType) return { title: "Kitchen Type Not Found" };

  return {
    title: `${kitchenType.name} Hire — Temporary Kitchen Solutions`,
    description:
      kitchenType.short_description ||
      `Learn about ${kitchenType.name} hire — pricing, capacity, setup time, and what it's best for.`,
    alternates: {
      canonical: `https://findakitchen.co.uk/kitchen-types/${params.slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function KitchenTypeDetailPage({ params }: Props) {
  const kitchenType = await getKitchenTypeBySlug(params.slug);
  if (!kitchenType) notFound();

  return (
    <div className="container-page py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Kitchen Types", href: "/kitchen-types" },
          { label: kitchenType.name },
        ]}
      />

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
        {kitchenType.name} Hire
      </h1>

      <KitchenTypeDetail kitchenType={kitchenType} />
    </div>
  );
}
