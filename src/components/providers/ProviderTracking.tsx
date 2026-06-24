"use client";
// In-house, per-provider event tracking (capture layer only). No third-party
// analytics, no PII — every beacon sends just { slug, event_type } to /api/track.
// Every call is fire-and-forget and swallows ALL errors: a tracking failure must
// NEVER affect navigation, the /get-quotes funnel, or page render.
import Link from "next/link";
import { useEffect } from "react";
import type { ReactNode } from "react";

type EventType = "view" | "quote_click";

// Fire-and-forget POST to /api/track. Prefers sendBeacon (survives navigation);
// falls back to fetch with keepalive. All failure modes are swallowed.
function track(slug: string, eventType: EventType): void {
  if (!slug) return;
  try {
    const body = JSON.stringify({ slug, event_type: eventType });
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function"
    ) {
      navigator.sendBeacon(
        "/api/track",
        new Blob([body], { type: "application/json" })
      );
    } else if (typeof fetch === "function") {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {
        /* swallowed — tracking must never break anything */
      });
    }
  } catch {
    /* swallowed — tracking must never break anything */
  }
}

// Fires exactly one `view` per provider per browser session. The sessionStorage
// guard is keyed by slug, so a refresh of the same provider does NOT re-fire,
// but a different provider fires its own view. Renders nothing.
export function ProviderViewBeacon({ slug }: { slug: string }) {
  useEffect(() => {
    if (!slug) return;
    try {
      const key = `fak_view_${slug}`;
      if (sessionStorage.getItem(key)) return; // already counted this session
      sessionStorage.setItem(key, "1");
    } catch {
      // sessionStorage unavailable (e.g. private mode): still record the view,
      // just without the per-session dedupe guard.
    }
    track(slug, "view");
  }, [slug]);
  return null;
}

// Provider-specific "Get Quotes" link. Fires a `quote_click` for the given slug
// on every click (no session guard) then navigates normally. Tracking is
// fire-and-forget and can never block or break the navigation to /get-quotes.
export function TrackedQuoteLink({
  slug,
  href,
  className,
  children,
}: {
  slug: string;
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => track(slug, "quote_click")}
    >
      {children}
    </Link>
  );
}
