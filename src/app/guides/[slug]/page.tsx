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
  const slugs = await getAllSEOPageSlugs("guide");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getSEOPageBySlug(params.slug, "guide");
  if (!page) return { title: "Guide Not Found" };

  return {
    title: page.title,
    description: page.meta_description,
    alternates: {
      canonical: `https://findakitchen.co.uk/guides/${params.slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function GuidePage({ params }: Props) {
  const page = await getSEOPageBySlug(params.slug, "guide");
  if (!page) notFound();

  const htmlContent = await marked(page.content);

  return (
    <>
      <div className="container-page py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Guides" },
            { label: page.title },
          ]}
        />

        <article className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
            {page.title}
          </h1>

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
