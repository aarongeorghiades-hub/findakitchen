import { supabase } from "./supabase";
import { Region } from "@/types";

export async function getRegions(): Promise<Region[]> {
  const { data, error } = await supabase
    .from("regions")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching regions:", error);
    return [];
  }

  return data as Region[];
}

export async function getRegionBySlug(slug: string): Promise<Region | null> {
  const { data, error } = await supabase
    .from("regions")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data as Region;
}

export async function getAllRegionSlugs(): Promise<string[]> {
  const { data } = await supabase.from("regions").select("slug");
  return data?.map((r) => r.slug) || [];
}
