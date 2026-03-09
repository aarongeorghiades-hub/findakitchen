import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const LOCATION_CITIES = [
  "london", "manchester", "birmingham", "leeds", "bristol",
  "sheffield", "edinburgh", "glasgow", "liverpool", "nottingham",
  "cardiff", "leicester", "coventry", "newcastle", "brighton",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://findakitchen.co.uk";
  const now = new Date();

  const [
    { data: providers },
    { data: blogPages },
    { data: guidePages },
    { data: comparePages },
  ] = await Promise.all([
    supabase
      .from("providers")
      .select("slug, updated_at")
      .eq("active", true),
    supabase
      .from("seo_pages")
      .select("slug, updated_at")
      .eq("page_type", "blog")
      .eq("published", true),
    supabase
      .from("seo_pages")
      .select("slug, updated_at")
      .eq("page_type", "guide")
      .eq("published", true),
    supabase
      .from("seo_pages")
      .select("slug, updated_at")
      .eq("page_type", "comparison")
      .eq("published", true),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/insurance-claims`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/events`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/commercial`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/providers`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/locations`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/kitchen-types`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/get-quotes`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/tools/driveway-fit-checker`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const locationRoutes: MetadataRoute.Sitemap = LOCATION_CITIES.map((city) => ({
    url: `${baseUrl}/locations/${city}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const providerRoutes: MetadataRoute.Sitemap = (providers ?? []).map((p) => ({
    url: `${baseUrl}/providers/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = (blogPages ?? []).map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const guideRoutes: MetadataRoute.Sitemap = (guidePages ?? []).map((p) => ({
    url: `${baseUrl}/guides/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const compareRoutes: MetadataRoute.Sitemap = (comparePages ?? []).map((p) => ({
    url: `${baseUrl}/compare/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...locationRoutes,
    ...providerRoutes,
    ...blogRoutes,
    ...guideRoutes,
    ...compareRoutes,
  ];
}
