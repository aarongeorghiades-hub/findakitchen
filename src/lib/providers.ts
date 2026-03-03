import { supabase } from "./supabase";
import { Provider, ProviderWithRelations, Region, KitchenType } from "@/types";

export async function getProviders(filters?: {
  market_segment?: string;
  region_id?: string;
  kitchen_type_id?: string;
}): Promise<Provider[]> {
  let query = supabase.from("providers").select("*").order("featured", { ascending: false }).order("name");

  if (filters?.market_segment && filters.market_segment !== "all") {
    query = query.or(`market_segment.eq.${filters.market_segment},market_segment.eq.both`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching providers:", error);
    return [];
  }

  let providers = data as Provider[];

  if (filters?.region_id) {
    const { data: providerRegions } = await supabase
      .from("provider_regions")
      .select("provider_id")
      .eq("region_id", filters.region_id);
    const regionProviderIds = new Set(providerRegions?.map((pr) => pr.provider_id) || []);
    providers = providers.filter((p) => regionProviderIds.has(p.id));
  }

  if (filters?.kitchen_type_id) {
    const { data: providerKitchenTypes } = await supabase
      .from("provider_kitchen_types")
      .select("provider_id")
      .eq("kitchen_type_id", filters.kitchen_type_id);
    const ktProviderIds = new Set(providerKitchenTypes?.map((pkt) => pkt.provider_id) || []);
    providers = providers.filter((p) => ktProviderIds.has(p.id));
  }

  return providers;
}

export async function getProviderBySlug(slug: string): Promise<ProviderWithRelations | null> {
  const { data, error } = await supabase
    .from("providers")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  const provider = data as ProviderWithRelations;

  const { data: regionLinks } = await supabase
    .from("provider_regions")
    .select("region_id")
    .eq("provider_id", provider.id);

  if (regionLinks && regionLinks.length > 0) {
    const regionIds = regionLinks.map((r) => r.region_id);
    const { data: regions } = await supabase
      .from("regions")
      .select("*")
      .in("id", regionIds);
    provider.regions = (regions as Region[]) || [];
  } else {
    provider.regions = [];
  }

  const { data: ktLinks } = await supabase
    .from("provider_kitchen_types")
    .select("kitchen_type_id")
    .eq("provider_id", provider.id);

  if (ktLinks && ktLinks.length > 0) {
    const ktIds = ktLinks.map((k) => k.kitchen_type_id);
    const { data: kitchenTypes } = await supabase
      .from("kitchen_types")
      .select("*")
      .in("id", ktIds);
    provider.kitchen_types = (kitchenTypes as KitchenType[]) || [];
  } else {
    provider.kitchen_types = [];
  }

  return provider;
}

export async function getProviderCount(): Promise<number> {
  const { count, error } = await supabase
    .from("providers")
    .select("*", { count: "exact", head: true });

  if (error) return 0;
  return count || 0;
}

export async function getAllProviderSlugs(): Promise<string[]> {
  const { data } = await supabase.from("providers").select("slug");
  return data?.map((p) => p.slug) || [];
}
