import { Enquiry } from "@/types";

export async function submitEnquiry(
  enquiry: Omit<Enquiry, "id" | "status" | "created_at">
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
    });
    return await response.json();
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return { success: false, error: "Network error" };
  }
}
