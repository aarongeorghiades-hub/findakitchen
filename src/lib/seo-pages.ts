import seoPagesData from "@/data/seo-pages.json";
import { SEOPage } from "@/types";

// Static snapshot of the former `seo_pages` table, baked into the repo at
// src/data/seo-pages.json. Rows are stored published-only and pre-sorted by
// created_at descending — the exact order the live query used to return.
const SEO_PAGES = seoPagesData as SEOPage[];

export async function getSEOPages(pageType?: string): Promise<SEOPage[]> {
  return SEO_PAGES.filter(
    (p) => p.published && (!pageType || p.page_type === pageType)
  );
}

export async function getSEOPageBySlug(slug: string, pageType?: string): Promise<SEOPage | null> {
  const page = SEO_PAGES.find(
    (p) =>
      p.slug === slug &&
      p.published &&
      (!pageType || p.page_type === pageType)
  );
  return page ?? null;
}

export async function getAllSEOPageSlugs(pageType?: string): Promise<string[]> {
  return (await getSEOPages(pageType)).map((p) => p.slug);
}
