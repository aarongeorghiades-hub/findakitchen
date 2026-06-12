import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Escape user-supplied values before interpolating into email HTML so a field
// containing & < > " ' can't break the layout or inject markup. & must go first.
function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Human-readable label maps so the internal lead email never shows raw codes.
const FUNDING_LABELS: Record<string, string> = {
  insurance: "Insurance claim",
  self_funded: "Self-funded",
  not_sure: "Not sure yet",
};
const BUDGET_LABELS: Record<string, string> = {
  under_500: "Under £500/week",
  "500_800": "£500–£800/week",
  over_800: "£800+/week",
  not_sure: "Not sure",
};
const ACCESS_LABELS: Record<string, string> = {
  driveway: "Driveway / private space",
  street_only: "Street parking only",
  gated: "Gated entrance",
  restricted: "Restricted / difficult access",
};
const YESNO_LABELS: Record<string, string> = {
  yes: "Yes",
  no: "No",
  unsure: "Not sure",
};
const APPLIANCE_LABELS: Record<string, string> = {
  cooker: "Cooker/oven & hob",
  fridge: "Fridge",
  freezer: "Freezer",
  dishwasher: "Dishwasher",
  washing_machine: "Washing machine",
};

// en-GB long date (e.g. "29 June 2026"); falls back to the raw string.
function fmtDate(raw: string): string {
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Render an email line only when there's a value; otherwise omit it entirely.
function emailLine(label: string, value: string): string {
  if (!value) return "";
  return `<p><strong>${label}:</strong> ${esc(value)}</p>`;
}

export async function POST(request: Request) {
  try {
    const enquiry = await request.json();

    // anon INSERT is blocked by RLS on enquiries, so the server route writes
    // with the service-role key. Missing key = misconfiguration, not a silent
    // drop — fail loudly so leads are never lost without a trace.
    if (!supabaseAdmin) {
      console.error(
        "SUPABASE_SERVICE_ROLE_KEY missing — cannot save enquiry server-side"
      );
      return NextResponse.json(
        { success: false, error: "Server misconfigured" },
        { status: 500 }
      );
    }

    const { error: dbError } = await supabaseAdmin.from("enquiries").insert({
      situation: enquiry.situation,
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone || "",
      postcode: enquiry.postcode || "",
      timeline: enquiry.timeline || "planning_ahead",
      market_segment: enquiry.market_segment || "domestic",
      additional_notes: enquiry.additional_notes || "",
      funding_source: enquiry.funding_source ?? null,
      budget_band: enquiry.budget_band ?? null,
      start_date: enquiry.start_date ?? null,
      appliances: enquiry.appliances ?? null,
      access_type: enquiry.access_type ?? null,
      water_on_site: enquiry.water_on_site ?? null,
      power_on_site: enquiry.power_on_site ?? null,
      status: "new",
    });

    if (dbError) {
      console.error("Supabase insert failed:", dbError);
      return NextResponse.json(
        { success: false, error: dbError.message },
        { status: 500 }
      );
    }

    // Best-effort emails — never block the enquiry on email failure. The
    // internal alert and the enquirer confirmation are fully independent: each
    // has its own try/catch, so one throwing never affects the other or the save.
    const resendKey = process.env.RESEND_API_KEY;
    const notificationTo = process.env.NOTIFICATION_TO;
    const resend = resendKey ? new Resend(resendKey) : null;

    if (!resend) {
      console.warn("RESEND_API_KEY missing — skipping all enquiry emails");
    }

    // 1) Internal lead notification to NOTIFICATION_TO.
    if (resend && notificationTo) {
      try {
        const startDateText = enquiry.start_date
          ? fmtDate(String(enquiry.start_date))
          : "";
        const fundingText = enquiry.funding_source
          ? FUNDING_LABELS[enquiry.funding_source] || String(enquiry.funding_source)
          : "";
        const budgetText = enquiry.budget_band
          ? BUDGET_LABELS[enquiry.budget_band] || String(enquiry.budget_band)
          : "";
        const appliancesText = enquiry.appliances
          ? String(enquiry.appliances)
              .split(",")
              .map((a: string) => a.trim())
              .filter(Boolean)
              .map((a: string) => APPLIANCE_LABELS[a] || a)
              .join(", ")
          : "";
        const accessText = enquiry.access_type
          ? ACCESS_LABELS[enquiry.access_type] || String(enquiry.access_type)
          : "";
        const waterText = enquiry.water_on_site
          ? YESNO_LABELS[enquiry.water_on_site] || String(enquiry.water_on_site)
          : "";
        const powerText = enquiry.power_on_site
          ? YESNO_LABELS[enquiry.power_on_site] || String(enquiry.power_on_site)
          : "";

        await resend.emails.send({
          from: "FindAKitchen Leads <leads@send.findakitchen.co.uk>",
          to: notificationTo,
          subject: `New FindAKitchen lead — ${enquiry.situation} — ${
            enquiry.postcode || "no postcode"
          }`,
          html: `
            <h2>New enquiry submitted</h2>
            <p><strong>Name:</strong> ${esc(enquiry.name)}</p>
            <p><strong>Email:</strong> ${esc(enquiry.email)}</p>
            <p><strong>Phone:</strong> ${esc(enquiry.phone || "—")}</p>
            <p><strong>Postcode:</strong> ${esc(enquiry.postcode || "—")}</p>
            <p><strong>Situation:</strong> ${esc(enquiry.situation)}</p>
            <p><strong>Timeline:</strong> ${esc(enquiry.timeline || "planning_ahead")}</p>
            ${emailLine("Start date", startDateText)}
            ${emailLine("Funding", fundingText)}
            ${emailLine("Budget band", budgetText)}
            ${emailLine("Appliances", appliancesText)}
            ${emailLine("Access", accessText)}
            ${emailLine("Water on site", waterText)}
            ${emailLine("Power on site", powerText)}
            <p><strong>Market segment:</strong> ${esc(
              enquiry.market_segment || "domestic"
            )}</p>
            <p><strong>Additional notes:</strong></p>
            <p>${esc(enquiry.additional_notes || "—")}</p>
            <hr>
            <p style="color:#888;font-size:12px;">Submitted via the quote wizard at https://findakitchen.co.uk</p>
          `,
        });
      } catch (emailError) {
        console.error("Resend email failed (enquiry still saved):", emailError);
      }
    } else if (resend) {
      console.warn("NOTIFICATION_TO missing — skipping internal lead alert");
    }

    // 2) Customer-facing confirmation to the enquirer. Independent of the above.
    if (resend && enquiry.email) {
      try {
        const firstName = String(enquiry.name || "").trim().split(/\s+/)[0];
        const greeting = firstName ? `Hi ${esc(firstName)},` : "Hi there,";
        const situationRaw = String(enquiry.situation || "")
          .replace(/_/g, " ")
          .trim();
        const situationText = situationRaw
          ? situationRaw.charAt(0).toUpperCase() + situationRaw.slice(1)
          : "";
        const postcodeText = String(enquiry.postcode || "").trim();
        const recapParts = [situationText, postcodeText]
          .filter(Boolean)
          .map(esc);
        const recapLine =
          recapParts.length > 0
            ? `<p style="margin:0 0 16px;"><strong style="color:#1C1C1A;">Your enquiry:</strong> ${recapParts.join(
                " — "
              )}</p>`
            : "";

        await resend.emails.send({
          from: "FindAKitchen <leads@send.findakitchen.co.uk>",
          to: enquiry.email,
          replyTo: "contact@findakitchen.co.uk",
          subject: "We've received your enquiry — FindAKitchen",
          html: `
            <div style="background-color:#FAF7F2;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
              <div style="max-width:520px;margin:0 auto;background-color:#FAF7F2;color:#1C1C1A;font-size:16px;line-height:1.6;">
                <p style="margin:0 0 16px;">${greeting}</p>
                <p style="margin:0 0 16px;">Thanks for your enquiry — we've received it.</p>
                <p style="margin:0 0 16px;">We'll match you with suitable temporary kitchen providers and be in touch within <strong style="color:#C2593A;">2 business days</strong>.</p>
                ${recapLine}
                <p style="margin:0 0 16px;">If you need to reach us in the meantime, just reply to this email.</p>
                <p style="margin:24px 0 0;">— The FindAKitchen team<br>
                  <a href="https://findakitchen.co.uk" style="color:#C2593A;text-decoration:none;">findakitchen.co.uk</a>
                </p>
              </div>
            </div>
          `,
        });
      } catch (confirmationError) {
        console.error(
          "Enquirer confirmation email failed (enquiry still saved):",
          confirmationError
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
