import { Metadata } from "next";
import Link from "next/link";
import { getSEOPages } from "@/lib/seo-pages";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Blog — Temporary Kitchen Hire Insights & Guides",
  description:
    "Expert advice, guides, and insights about temporary kitchen hire in the UK. Learn about kitchen types, costs, insurance claims, and how to choose the right provider.",
  alternates: { canonical: "https://findakitchen.co.uk/blog" },
};

export const revalidate = 3600;

export default async function BlogIndexPage() {
  const posts = await getSEOPages("blog");

  return (
    <>
      <div className="container-page py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog" },
          ]}
        />

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Blog
          </h1>
          <p className="mt-3 text-lg text-slate-500 max-w-3xl">
            Expert advice, guides, and insights about temporary kitchen hire in
            the UK.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-primary-500 hover:shadow-lg"
              >
                <h2 className="text-lg font-semibold text-slate-800 group-hover:text-primary-700 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                  {post.meta_description}
                </p>
                <p className="mt-4 text-sm font-medium text-primary-700">
                  Read more &rarr;
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              Blog posts coming soon
            </h2>
            <p className="text-slate-500 mb-6">
              We&apos;re working on expert guides and advice about temporary
              kitchen hire. In the meantime, explore our kitchen types or get a
              free quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/kitchen-types" className="btn-primary">
                Explore Kitchen Types
              </Link>
              <Link href="/get-quotes" className="btn-secondary">
                Get Free Quotes
              </Link>
            </div>
          </div>
        )}
      </div>

      <CTABanner />
    </>
  );
}
