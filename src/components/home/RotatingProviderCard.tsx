"use client";
import { useState, useEffect } from "react";

// Anonymised capability highlight that rotates through providers in the hero.
// No name, no review metrics, no specific location — a structured capability
// phrase plus segment/insurance/electric badges only.
interface ProviderSlim {
  market: string;
  kitchen_types: string[] | null;
  power_source: string | null;
  insurance_friendly: boolean;
  insurance_ready_quotes?: boolean | null;
}

const TYPE_PHRASES: Record<string, string> = {
  driveway_pod: "driveway pods",
  driveway_suite: "driveway kitchen suites",
  indoor_capsule: "indoor capsule kitchens",
  indoor_trailer: "indoor kitchen units",
  container: "container kitchens",
  container_cabin: "container kitchens",
  container_kitchen: "container kitchens",
  trailer: "trailer kitchens",
  trailer_kitchen: "trailer kitchens",
  modular: "modular kitchen units",
  modular_cabin: "modular kitchen units",
  modular_linked: "modular kitchen units",
  modular_flatpack: "flat-pack kitchens",
  flat_pack: "flat-pack kitchens",
  marquee: "marquee kitchens",
  marquee_kitchen: "marquee kitchens",
  lorry: "lorry kitchens",
  open_plan_kitchen: "large-scale kitchen builds",
};

function capabilityPhrase(p: ProviderSlim): string {
  const isCommercial =
    p.market === "commercial" || p.market === "commercial_and_domestic" || p.market === "both";
  const insurance = !!(p.insurance_friendly || p.insurance_ready_quotes);
  const firstType = (p.kitchen_types ?? [])[0];
  const noun = firstType
    ? TYPE_PHRASES[firstType] || "temporary kitchens"
    : isCommercial
    ? "commercial kitchen units"
    : "temporary kitchen pods";
  if (insurance) return `Insurance-ready ${noun}`;
  if (isCommercial) return `Commercial ${noun}`;
  return noun.charAt(0).toUpperCase() + noun.slice(1);
}

export function RotatingProviderCard({ providers }: { providers: ProviderSlim[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (providers.length < 2) return;
    const interval = setInterval(() => {
      // Fade out
      setVisible(false);
      // After fade out completes, switch provider and fade back in
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % providers.length);
        setVisible(true);
      }, 400);
    }, 8000);
    return () => clearInterval(interval);
  }, [providers.length]);

  if (!providers.length) return null;

  const provider = providers[index];
  const phrase = capabilityPhrase(provider);
  const insurance = !!(provider.insurance_friendly || provider.insurance_ready_quotes);

  return (
    <div
      className="absolute bottom-8 left-6 z-20 bg-white rounded-2xl shadow-2xl p-5 w-64"
      style={{
        animation: "gentleFloat 4s ease-in-out infinite",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-1">
        Specialist providers
      </p>
      <p className="font-serif text-lg text-[var(--charcoal)] leading-snug mb-2">
        {phrase}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {insurance && (
          <span className="text-xs bg-[#EBF5EF] text-[var(--sage)] px-2 py-0.5 rounded-full">
            Insurance ✓
          </span>
        )}
        {!insurance && (
          <span className="text-xs bg-[#EBF0F9] text-[#3B65C4] px-2 py-0.5 rounded-full capitalize">
            {provider.market === "commercial"
              ? "Commercial"
              : provider.market === "both" || provider.market === "commercial_and_domestic"
              ? "Dom + Com"
              : "Domestic"}
          </span>
        )}
        {provider.power_source === "electric" && (
          <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
            ⚡ Electric
          </span>
        )}
      </div>
      <p className="text-[11px] text-[var(--muted)] mt-2">UK-wide</p>

      {/* Progress bar showing time until next card */}
      <div className="mt-3 h-0.5 bg-[var(--border)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--clay)] rounded-full"
          style={{
            animation: visible ? "progressBar 8s linear forwards" : "none",
            width: visible ? undefined : "0%",
          }}
        />
      </div>
    </div>
  );
}
