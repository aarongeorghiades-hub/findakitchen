import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-admin";

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
        await resend.emails.send({
          from: "FindAKitchen Leads <leads@send.findakitchen.co.uk>",
          to: notificationTo,
          subject: `New FindAKitchen lead — ${enquiry.situation} — ${
            enquiry.postcode || "no postcode"
          }`,
          html: `
            <h2>New enquiry submitted</h2>
            <p><strong>Name:</strong> ${enquiry.name}</p>
            <p><strong>Email:</strong> ${enquiry.email}</p>
            <p><strong>Phone:</strong> ${enquiry.phone || "—"}</p>
            <p><strong>Postcode:</strong> ${enquiry.postcode || "—"}</p>
            <p><strong>Situation:</strong> ${enquiry.situation}</p>
            <p><strong>Timeline:</strong> ${enquiry.timeline || "planning_ahead"}</p>
            <p><strong>Market segment:</strong> ${
              enquiry.market_segment || "domestic"
            }</p>
            <p><strong>Additional notes:</strong></p>
            <p>${enquiry.additional_notes || "—"}</p>
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
        const greeting = firstName ? `Hi ${firstName},` : "Hi there,";
        const situationText = String(enquiry.situation || "")
          .replace(/_/g, " ")
          .trim();
        const postcodeText = String(enquiry.postcode || "").trim();
        const recapParts = [situationText, postcodeText].filter(Boolean);
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
