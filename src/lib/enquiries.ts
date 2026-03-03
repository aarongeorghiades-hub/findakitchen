import { supabase } from "./supabase";
import { Enquiry } from "@/types";

export async function submitEnquiry(enquiry: Omit<Enquiry, "id" | "status" | "created_at">): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("enquiries").insert({
    ...enquiry,
    status: "new",
  });

  if (error) {
    console.error("Error submitting enquiry:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
