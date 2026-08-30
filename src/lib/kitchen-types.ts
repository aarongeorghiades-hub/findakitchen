import kitchenTypesData from "@/data/kitchen-types.json";
import { KitchenType } from "@/types";

// Static snapshot of the former `kitchen_types` table, baked into the repo at
// src/data/kitchen-types.json, pre-sorted by display_order ascending.
const KITCHEN_TYPES = kitchenTypesData as KitchenType[];

export async function getKitchenTypes(): Promise<KitchenType[]> {
  return KITCHEN_TYPES;
}

export async function getKitchenTypeBySlug(slug: string): Promise<KitchenType | null> {
  return KITCHEN_TYPES.find((kt) => kt.slug === slug) ?? null;
}

export async function getKitchenTypesBySegment(segment: "commercial" | "domestic"): Promise<KitchenType[]> {
  return KITCHEN_TYPES.filter((kt) => kt.market_segment === segment);
}

export async function getAllKitchenTypeSlugs(): Promise<string[]> {
  return KITCHEN_TYPES.map((kt) => kt.slug);
}
