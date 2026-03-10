import { supabase } from "./supabase";
import { Enquiry } from "@/types";

export async function submitEnquiry(enquiry: Omit<Enquiry, "id" | "status" | "created_at">): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("enquiries").insert({
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

  if (error) {
    console.error("Error submitting enquiry:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
