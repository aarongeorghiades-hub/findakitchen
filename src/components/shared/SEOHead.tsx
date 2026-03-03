import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

export function generateSEOMetadata({
  title,
  description,
  canonical,
  ogImage,
}: SEOProps): Metadata {
  const siteUrl = "https://findakitchen.co.uk";
  const fullTitle = title.includes("FindAKitchen")
    ? title
    : `${title} | FindAKitchen.co.uk`;

  return {
    title: fullTitle,
    description,
    alternates: canonical ? { canonical: `${siteUrl}${canonical}` } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url: canonical ? `${siteUrl}${canonical}` : siteUrl,
      siteName: "FindAKitchen.co.uk",
      type: "website",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
