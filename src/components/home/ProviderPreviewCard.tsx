// Anonymised capability tile. Renders STRUCTURED, non-identifying capability
// info only — no provider name, slug/URL, location, free-text differentiators,
// or review metrics. Non-clickable (the named detail route no longer exists).

interface Provider {
  market: string;
  kitchen_types: string[] | null;
  power_source: string | null;
  insurance_friendly: boolean;
  insurance_ready_quotes?: boolean | null;
  min_hire?: string | null;
  max_hire?: string | null;
  hire_cycle?: string | null;
  delivery_speed?: string | null;
  setup_time?: string | null;
  sectors?: string[] | null;
  capacity?: string | null;
}

const KITCHEN_TYPE_LABELS: Record<string, string> = {
  driveway_pod: "Driveway pod",
  driveway_suite: "Driveway suite",
  indoor_capsule: "Indoor capsule",
  indoor_trailer: "Indoor unit",
  container: "Container",
  container_cabin: "Container",
  container_kitchen: "Container",
  trailer: "Trailer",
  trailer_kitchen: "Trailer",
  modular: "Modular",
  modular_cabin: "Modular",
  modular_linked: "Modular",
  modular_flatpack: "Flat-pack",
  flat_pack: "Flat-pack",
  marquee: "Marquee",
  marquee_kitchen: "Marquee",
  lorry: "Lorry kitchen",
  open_plan_kitchen: "Open-plan",
};

const SECTOR_LABELS: Record<string, string> = {
  schools: "Schools",
  hospitals: "Hospitals",
  care_homes: "Care homes",
  events: "Events",
  construction: "Construction",
  caravan_parks: "Holiday parks",
  film_TV: "Film & TV",
};

const POWER_LABELS: Record<string, string> = {
  gas_and_electric: "Gas & electric",
  gas: "Gas",
  lpg: "LPG",
  diesel_generator: "Generator-capable",
};

function prettify(value: string): string {
  return value
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function marketBadge(market: string) {
  if (market === "domestic")
    return { label: "Domestic", cls: "bg-[#EBF5EF] text-[var(--sage)]" };
  if (market === "commercial")
    return { label: "Commercial", cls: "bg-[#EBF0F9] text-[#3B65C4]" };
  return { label: "Domestic & Commercial", cls: "bg-purple-50 text-purple-700" };
}

export function ProviderPreviewCard({ provider }: { provider: Provider }) {
  const badge = marketBadge(provider.market);
  const insurance = !!(provider.insurance_friendly || provider.insurance_ready_quotes);
  const electric = provider.power_source === "electric";
  const isCommercial =
    provider.market === "commercial" ||
    provider.market === "commercial_and_domestic" ||
    provider.market === "both";

  // Capability chips, lead with the most differentiating structured facts so
  // cards vary by what each row actually offers.
  const chipSet: string[] = [];
  for (const t of provider.kitchen_types ?? []) {
    const label = KITCHEN_TYPE_LABELS[t] || prettify(t);
    if (label && !chipSet.includes(label)) chipSet.push(label);
  }
  if (isCommercial) {
    for (const s of provider.sectors ?? []) {
      const label = SECTOR_LABELS[s] || prettify(s);
      if (label && !chipSet.includes(label)) chipSet.push(label);
    }
  }
  if (!electric && provider.power_source) {
    const p = POWER_LABELS[provider.power_source];
    if (p && !chipSet.includes(p)) chipSet.push(p);
  }
  if (provider.min_hire || provider.max_hire || provider.hire_cycle) {
    chipSet.push("Flexible hire terms");
  }
  if (provider.delivery_speed || provider.setup_time) {
    chipSet.push("Delivery & setup");
  }
  if (chipSet.length === 0) {
    chipSet.push(isCommercial ? "Commercial kitchen hire" : "Temporary kitchen hire");
  }
  const chips = chipSet.slice(0, 5);

  return (
    <div className="relative bg-white rounded-2xl p-6 border border-[var(--border)] h-full">
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${badge.cls}`}>
          {badge.label}
        </span>
        {insurance && (
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#EBF5EF] text-[var(--sage)]">
            Insurance-ready
          </span>
        )}
        {electric && (
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-50 text-amber-700">
            &#9889; Electric
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="text-xs text-[var(--warm-mid)] bg-[var(--cream)] border border-[var(--border)] px-3 py-1 rounded-full"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
