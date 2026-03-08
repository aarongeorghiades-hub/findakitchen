import { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getSEOPageBySlug, getAllSEOPageSlugs } from "@/lib/seo-pages";
import CTABanner from "@/components/shared/CTABanner";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllSEOPageSlugs("blog");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getSEOPageBySlug(params.slug, "blog");
  if (!page) return { title: "Post Not Found" };

  return {
    title: page.title,
    description: page.meta_description,
    alternates: {
      canonical: `https://findakitchen.co.uk/blog/${params.slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: Props) {
  const page = await getSEOPageBySlug(params.slug, "blog");
  if (!page) notFound();

  const htmlContent = await marked(page.content);

  const faqJsonLd = page.faq_schema && page.faq_schema.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq_schema.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://findakitchen.co.uk" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://findakitchen.co.uk/blog" },
      { "@type": "ListItem", position: 3, name: page.title, item: `https://findakitchen.co.uk/blog/${params.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {/* Hero */}
      <section className="bg-[var(--charcoal)] pt-12 pb-16 px-6 lg:px-12 relative overflow-hidden">
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-3xl relative z-10">
          {/* Breadcrumb */}
          <nav className="text-xs text-white/40 mb-6 flex items-center gap-1.5">
            <a href="/" className="hover:text-white/60 transition-colors">Home</a>
            <span>/</span>
            <a href="/blog" className="hover:text-white/60 transition-colors">Blog</a>
            <span>/</span>
            <span className="text-white/60 truncate max-w-xs">{page.title}</span>
          </nav>
          {/* Category label */}
          <p className="text-xs uppercase tracking-widest text-[var(--clay-light)] mb-4">
            {page.market_segment === "commercial" ? "Commercial" : page.market_segment === "domestic" ? "Domestic" : "Guide"} &middot; {Math.ceil((page.content?.split(" ").length || 800) / 200)} min read
          </p>
          {/* Title */}
          <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-5">
            {page.title}
          </h1>
          {/* Meta description as subtitle */}
          {page.meta_description && (
            <p className="text-lg text-white/50 font-light leading-relaxed max-w-2xl">
              {page.meta_description}
            </p>
          )}
        </div>
      </section>

      <div className="container-page py-8">
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
