import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// In-house per-provider event capture. Writes a single { provider_slug,
// event_type } row to provider_events (created_at defaults in the DB). No reads,
// no PII, no contact fields — slug + event_type + timestamp only.
//
// Write pattern mirrors /api/enquiries exactly: a server-side insert with the
// service-role client (@/lib/supabase-admin), so it inherits the same working
// production credentials (SUPABASE_SERVICE_ROLE_KEY in Railway).
const ALLOWED_EVENTS = new Set(["view", "quote_click"]);

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);
    const slug = payload?.slug;
    const eventType = payload?.event_type;

    // Validate: event_type must be one of the two allowed values AND slug must
    // be a non-empty string. Reject malformed input with 400.
    if (
      typeof slug !== "string" ||
      slug.trim() === "" ||
      !ALLOWED_EVENTS.has(eventType)
    ) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Same as /api/enquiries: anon INSERT may be unavailable / RLS-gated, so the
    // server writes with the service-role key. A missing key is a Railway
    // misconfiguration — log it, but NEVER error the caller (tracking must never
    // break a page), so still return ok.
    if (!supabaseAdmin) {
      console.error(
        "SUPABASE_SERVICE_ROLE_KEY missing — cannot record provider_event"
      );
      return NextResponse.json({ ok: true });
    }

    const { error } = await supabaseAdmin
      .from("provider_events")
      .insert({ provider_slug: slug.trim(), event_type: eventType });

    if (error) {
      // Log server-side only; do not surface to the caller.
      console.error("provider_events insert failed:", error.message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Swallow everything — a tracking failure must never reach the client.
    console.error("track API error:", error);
    return NextResponse.json({ ok: true });
  }
}
