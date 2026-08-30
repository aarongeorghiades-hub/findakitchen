import providersData from "@/data/providers.json";
import { Provider } from "@/types";

// Static snapshot of the former `providers` table, baked into the repo at
// src/data/providers.json in the table's own natural row order. Contact /
// external-identifier columns were never selected by any page and are not
// present in the snapshot.
const ALL_PROVIDERS = providersData as unknown as Provider[];

// Natural row order — what the unordered query behind "related providers"
// used to return.
const ACTIVE_PROVIDERS = ALL_PROVIDERS.filter((p) => p.active);

// Id order — what every `.order("id")` listing used to return.
const ACTIVE_BY_ID = [...ACTIVE_PROVIDERS].sort((a, b) =>
  a.id < b.id ? -1 : a.id > b.id ? 1 : 0
);

export function getActiveProviders(): Provider[] {
  return ACTIVE_BY_ID;
}

export function getActiveProviderCount(): number {
  return ACTIVE_PROVIDERS.length;
}

export function getProviderBySlug(slug: string): Provider | null {
  return ACTIVE_PROVIDERS.find((p) => p.slug === slug) ?? null;
}

export function getActiveProviderSlugs(): string[] {
  return ACTIVE_BY_ID.map((p) => p.slug);
}

// Commercial page: market in ("commercial", "commercial_and_domestic").
export function getCommercialProviders(): Provider[] {
  return ACTIVE_BY_ID.filter(
    (p) => p.market === "commercial" || p.market === "commercial_and_domestic"
  );
}

// Insurance-claims page: domestic-facing providers, insurance-ready first.
// Ties keep the table's natural row order, so the sort stays stable.
export function getInsuranceProviders(): Provider[] {
  return ACTIVE_PROVIDERS.filter(
    (p) => p.market === "domestic" || p.market === "both"
  ).sort((a, b) => Number(b.insurance_friendly) - Number(a.insurance_friendly));
}

// Related providers on a detail page: same market, excluding the current one.
export function getRelatedProviders(slug: string, market: string, limit = 3): Provider[] {
  return ACTIVE_PROVIDERS.filter(
    (p) => p.market === market && p.slug !== slug
  ).slice(0, limit);
}
