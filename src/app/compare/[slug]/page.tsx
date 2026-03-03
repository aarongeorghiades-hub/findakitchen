import { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getSEOPageBySlug, getAllSEOPageSlugs } from "@/lib/seo-pages";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTABanner from "@/components/shared/CTABanner";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllSEOPageSlugs("comparison");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getSEOPageBySlug(params.slug, "comparison");
  if (!page) return { title: "Comparison Not Found" };

  return {
    title: page.title,
    description: page.meta_description,
    alternates: {
      canonical: `https://findakitchen.co.uk/compare/${params.slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function ComparePage({ params }: Props) {
  const page = await getSEOPageBySlug(params.slug, "comparison");
  if (!page) notFound();

  const htmlContent = await marked(page.content);

  return (
    <>
      <div className="bg-primary-800 py-10">
        <div className="container-page">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {page.title}
          </h1>
        </div>
      </div>

      <div className="container-page py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Compare" },
            { label: page.title },
          ]}
        />

        <article className="max-w-3xl">
          <div
            className="prose prose-slate prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </div>

      <CTABanner />
    </>
  );
}
