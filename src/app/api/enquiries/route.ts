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

    // Best-effort notification — never block the enquiry on email failure.
    const resendKey = process.env.RESEND_API_KEY;
    const notificationTo = process.env.NOTIFICATION_TO;

    if (resendKey && notificationTo) {
      try {
        const resend = new Resend(resendKey);
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
    } else {
      console.warn("Resend env vars missing — skipping notification");
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
