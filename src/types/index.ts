export interface Provider {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  long_description: string | null;
  market_segment: "commercial" | "domestic" | "both";
  website_url: string | null;
  phone: string | null;
  email: string | null;
  logo_url: string | null;
  hero_image_url: string | null;
  featured: boolean;
  verified: boolean;
  min_hire_period: string | null;
  delivery_timeframe: string | null;
  insurance_claim_support: boolean;
  created_at: string;
  updated_at: string;
}

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

export interface Enquiry {
  id?: string;
  situation: string;
  location_postcode: string;
  location_area: string;
  timeline: string;
  duration: string;
  capacity: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  additional_notes?: string;
  status?: string;
  created_at?: string;
}

export interface SEOPage {
  id: string;
  title: string;
  slug: string;
  page_type: "guide" | "comparison" | "blog" | "landing";
  meta_description: string;
  content: string;
  h1: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProviderRegion {
  provider_id: string;
  region_id: string;
}

export interface ProviderKitchenType {
  provider_id: string;
  kitchen_type_id: string;
}

export interface ProviderWithRelations extends Provider {
  regions?: Region[];
  kitchen_types?: KitchenType[];
}
