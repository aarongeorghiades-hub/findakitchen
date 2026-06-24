"use client";
// Floating "Featured provider" card that rotates through named providers in the
// hero. Shows name, segment, insurance flag, region, and (only when present) a
// Trustpilot rating/review count. It renders NO contact path and no outbound
// link — rating numbers only, never the trustpilot_url.
import { useState, useEffect } from "react";

interface ProviderSlim {
  name: string;
  market: string;
  region_base: string | null;
  insurance_friendly: boolean;
  trustpilot_rating: number | null;
  trustpilot_reviews: number | null;
}

function regionLabel(region: string | null): string {
  if (region && region !== "Unknown") return region;
  return "UK-wide";
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
  const stars = provider.trustpilot_rating ? Math.round(provider.trustpilot_rating) : null;

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
        Featured provider
      </p>
      <p className="font-serif text-lg text-[var(--charcoal)] leading-snug mb-2">
        {provider.name}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {stars && (
          <span className="text-amber-400 text-sm">
            {"★".repeat(stars)}{"☆".repeat(5 - stars)}
          </span>
        )}
        {provider.trustpilot_reviews && (
          <span className="text-xs text-[var(--muted)]">
            {provider.trustpilot_reviews} reviews
          </span>
        )}
        {provider.insurance_friendly && (
          <span className="text-xs bg-[#EBF5EF] text-[var(--sage)] px-2 py-0.5 rounded-full">
            Insurance ✓
          </span>
        )}
        {!provider.insurance_friendly && (
          <span className="text-xs bg-[#EBF0F9] text-[#3B65C4] px-2 py-0.5 rounded-full capitalize">
            {provider.market === "commercial" ? "Commercial" : provider.market === "both" || provider.market === "commercial_and_domestic" ? "Dom + Com" : "Domestic"}
          </span>
        )}
      </div>
      <p className="text-[11px] text-[var(--muted)] mt-2">{regionLabel(provider.region_base)}</p>

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
