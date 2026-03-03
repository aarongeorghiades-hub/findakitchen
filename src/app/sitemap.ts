import { MetadataRoute } from "next";
import { getAllProviderSlugs } from "@/lib/providers";
import { getAllKitchenTypeSlugs } from "@/lib/kitchen-types";
import { getAllRegionSlugs } from "@/lib/regions";
import { getAllSEOPageSlugs } from "@/lib/seo-pages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://findakitchen.co.uk";

  const [providerSlugs, kitchenTypeSlugs, regionSlugs, guideSlugs, comparisonSlugs, blogSlugs] =
    await Promise.all([
      getAllProviderSlugs(),
      getAllKitchenTypeSlugs(),
      getAllRegionSlugs(),
      getAllSEOPageSlugs("guide"),
      getAllSEOPageSlugs("comparison"),
      getAllSEOPageSlugs("blog"),
    ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/providers`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/kitchen-types`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/get-quotes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const providerPages: MetadataRoute.Sitemap = providerSlugs.map((slug) => ({
    url: `${baseUrl}/providers/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const kitchenTypePages: MetadataRoute.Sitemap = kitchenTypeSlugs.map((slug) => ({
    url: `${baseUrl}/kitchen-types/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const regionPages: MetadataRoute.Sitemap = regionSlugs.map((slug) => ({
    url: `${baseUrl}/temporary-kitchen-hire/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const guidePages: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const comparisonPages: MetadataRoute.Sitemap = comparisonSlugs.map((slug) => ({
    url: `${baseUrl}/compare/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...providerPages,
    ...kitchenTypePages,
    ...regionPages,
    ...guidePages,
    ...comparisonPages,
    ...blogPages,
  ];
}
