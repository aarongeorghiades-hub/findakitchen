import { MetadataRoute } from "next";
import { getActiveProviders } from "@/lib/providers";
import { getSEOPages } from "@/lib/seo-pages";
import { getKitchenTypes } from "@/lib/kitchen-types";
import { getRegions } from "@/lib/regions";

const LOCATION_CITIES = [
  "london", "manchester", "birmingham", "leeds", "bristol",
  "sheffield", "edinburgh", "glasgow", "liverpool", "nottingham",
  "cardiff", "leicester", "coventry", "newcastle", "brighton",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://findakitchen.co.uk";
  const now = new Date();

  const [providers, blogPages, guidePages, comparePages, kitchenTypes, regions] =
    await Promise.all([
      getActiveProviders(),
      getSEOPages("blog"),
      getSEOPages("guide"),
      getSEOPages("comparison"),
      getKitchenTypes(),
      getRegions(),
    ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/insurance-claims`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/events`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/commercial`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/loss-adjusters`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/providers`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/locations`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/kitchen-types`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/get-quotes`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/tools/driveway-fit-checker`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/tools/compare-kitchen-types`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const locationRoutes: MetadataRoute.Sitemap = LOCATION_CITIES.map((city) => ({
    url: `${baseUrl}/locations/${city}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const providerRoutes: MetadataRoute.Sitemap = providers.map((p) => ({
    url: `${baseUrl}/providers/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPages.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guidePages.map((p) => ({
    url: `${baseUrl}/guides/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // File-based guides (their own route, not seo_pages rows) — listed manually.
  const fileGuideRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/guides/temporary-kitchen-survival-kit`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const compareRoutes: MetadataRoute.Sitemap = comparePages.map((p) => ({
    url: `${baseUrl}/compare/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const kitchenTypeRoutes: MetadataRoute.Sitemap = kitchenTypes.map((kt) => ({
    url: `${baseUrl}/kitchen-types/${kt.slug}`,
    lastModified: kt.updated_at ? new Date(kt.updated_at) : now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const regionRoutes: MetadataRoute.Sitemap = regions.map((r) => ({
    url: `${baseUrl}/temporary-kitchen-hire/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...locationRoutes,
    ...providerRoutes,
    ...blogRoutes,
    ...guideRoutes,
    ...fileGuideRoutes,
    ...compareRoutes,
    ...kitchenTypeRoutes,
    ...regionRoutes,
  ];
}
