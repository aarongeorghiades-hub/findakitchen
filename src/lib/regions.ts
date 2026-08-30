import regionsData from "@/data/regions.json";
import { Region } from "@/types";

// Static snapshot of the former `regions` table, baked into the repo at
// src/data/regions.json, pre-sorted by name ascending.
const REGIONS = regionsData as Region[];

export async function getRegions(): Promise<Region[]> {
  return REGIONS;
}

export async function getRegionBySlug(slug: string): Promise<Region | null> {
  return REGIONS.find((r) => r.slug === slug) ?? null;
}

export async function getAllRegionSlugs(): Promise<string[]> {
  return REGIONS.map((r) => r.slug);
}
