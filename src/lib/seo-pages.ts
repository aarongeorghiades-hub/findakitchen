import { supabase } from "./supabase";
import { SEOPage } from "@/types";

export async function getSEOPages(pageType?: string): Promise<SEOPage[]> {
  let query = supabase
    .from("seo_pages")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (pageType) {
    query = query.eq("page_type", pageType);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching SEO pages:", error);
    return [];
  }

  return data as SEOPage[];
}

export async function getSEOPageBySlug(slug: string, pageType?: string): Promise<SEOPage | null> {
  let query = supabase
    .from("seo_pages")
    .select("*")
    .eq("slug", slug)
    .eq("published", true);

  if (pageType) {
    query = query.eq("page_type", pageType);
  }

  const { data, error } = await query.single();
  if (error || !data) return null;
  return data as SEOPage;
}

export async function getAllSEOPageSlugs(pageType?: string): Promise<string[]> {
  let query = supabase.from("seo_pages").select("slug").eq("published", true);
  if (pageType) {
    query = query.eq("page_type", pageType);
  }
  const { data } = await query;
  return data?.map((p) => p.slug) || [];
}
