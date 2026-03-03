import { supabase } from "./supabase";
import { KitchenType } from "@/types";

export async function getKitchenTypes(): Promise<KitchenType[]> {
  const { data, error } = await supabase
    .from("kitchen_types")
    .select("*")
    .order("display_order");

  if (error) {
    console.error("Error fetching kitchen types:", error);
    return [];
  }

  return data as KitchenType[];
}

export async function getKitchenTypeBySlug(slug: string): Promise<KitchenType | null> {
  const { data, error } = await supabase
    .from("kitchen_types")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data as KitchenType;
}

export async function getKitchenTypesBySegment(segment: "commercial" | "domestic"): Promise<KitchenType[]> {
  const { data, error } = await supabase
    .from("kitchen_types")
    .select("*")
    .eq("market_segment", segment)
    .order("display_order");

  if (error) return [];
  return data as KitchenType[];
}

export async function getAllKitchenTypeSlugs(): Promise<string[]> {
  const { data } = await supabase.from("kitchen_types").select("slug");
  return data?.map((kt) => kt.slug) || [];
}
