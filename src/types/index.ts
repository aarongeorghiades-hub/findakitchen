// Types for the static data snapshots in src/data/. The site no longer talks to
// a database — these describe the shape of the committed JSON files.

// Provider — mirrors src/data/providers.json.
//
// Public contact details (website, phone, Trustpilot) ARE included: they are
// the page's primary action, since the site no longer takes enquiries itself.
// Deliberately NOT included, and not to be added: postcode, street address,
// Companies House number, social links, and any individual's name.
export interface Provider {
  id: number;
  slug: string;
  active: boolean;
  updated_at: string;

  // Card fields (home, /providers, /commercial, /insurance-claims, /locations/*)
  name: string;
  market: string;
  region_base: string | null;
  notable_differentiators: string[] | null;
  insurance_friendly: boolean;
  power_source: string | null;
  trustpilot_rating: number | null;
  trustpilot_reviews: number | null;

  // Public contact routes. Every active provider currently has a website;
  // `email` is a fallback carried only where a provider has no website, so it
  // is null throughout today. Any of these may be null — never render an empty
  // field or a bare label.
  website: string | null;
  phone: string | null;
  trustpilot_url: string | null;
  email: string | null;

  // Detail-page fields (/providers/<slug>)
  coverage: string | null;
  coverage_detail: string | null;
  kitchen_types: string[] | null;
  gas_type: string | null;
  pricing: string | null;
  pricing_model: string | null;
  pricing_detail: string | null;
  pricing_tiers: Record<string, unknown>[] | null;
  min_hire: string | null;
  delivery_speed: string | null;
  delivery_free_radius: string | null;
  setup_time: string | null;
  appliances: string[] | null;
  optional_appliances: string[] | null;
  pod_models: Record<string, unknown>[] | null;
  kitchen_models: Record<string, unknown>[] | null;
  utility_requirements: Record<string, unknown> | null;
  surface_types: string[] | null;
  driveway_min_length: string | null;
  driveway_min_length_regular: string | null;
  driveway_min_length_large: string | null;
  internal_height: string | null;
  certifications: string[] | null;
  features: string[] | null;
  google_rating: number | null;
  instagram_followers: number | null;
  testimonials: string[] | null;
  year_established: number | null;
}

// The subset of provider columns every card surface renders.
export type ProviderCard = Pick<
  Provider,
  | "slug"
  | "name"
  | "market"
  | "region_base"
  | "notable_differentiators"
  | "insurance_friendly"
  | "power_source"
>;

export interface KitchenType {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  long_description: string;
  market_segment: "commercial" | "domestic";
  typical_price_from: string | null;
  typical_price_to: string | null;
  capacity_range: string | null;
  typical_setup_time: string | null;
  requires_crane: boolean;
  towable: boolean;
  indoor_capable: boolean;
  self_contained: boolean;
  best_for: string[];
  image_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Region {
  id: string;
  name: string;
  slug: string;
  type: "city" | "county" | "region";
  parent_id: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
}

export interface SEOPage {
  id: string;
  title: string;
  slug: string;
  page_type: "guide" | "comparison" | "blog" | "landing";
  meta_title: string | null;
  meta_description: string;
  content: string;
  market_segment: string | null;
  target_keyword: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  faq_schema: Array<{ question: string; answer: string }> | null;
}
