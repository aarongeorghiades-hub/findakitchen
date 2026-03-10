"use client";

import { useState } from "react";
import { submitEnquiry } from "@/lib/enquiries";

const situationOptions = [
  { value: "renovation", label: "My kitchen is being renovated" },
  { value: "flood_fire_damage", label: "Flood, fire, or water damage" },
  { value: "insurance_claim", label: "I'm making an insurance claim" },
  { value: "school_hospital_refurb", label: "School or hospital refurbishment" },
  { value: "event_festival", label: "Event or festival catering" },
  { value: "construction_site", label: "Construction site or temporary facility" },
  { value: "restaurant_refurb", label: "Restaurant refurbishment" },
  { value: "other", label: "Something else" },
];

const timelineOptions = [
  { value: "emergency", label: "Emergency — I need it now" },
  { value: "within_week", label: "Within a week" },
  { value: "within_month", label: "Within a month" },
  { value: "planning_ahead", label: "Planning ahead (1+ months)" },
];

interface QuoteFormProps {
  initialSituation?: string;
}

export default function QuoteForm({ initialSituation }: QuoteFormProps) {
  const [step, setStep] = useState(initialSituation ? 2 : 1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    situation: initialSituation || "",
    location_postcode: "",
    location_area: "",
    timeline: "",
    duration: "",
    capacity: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    additional_notes: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.situation !== "";
      case 2:
        return formData.location_postcode !== "" && formData.location_area !== "";
      case 3:
        return formData.timeline !== "";
      case 4:
        return formData.duration !== "" && formData.capacity !== "";
      case 5:
        return (
          formData.contact_name !== "" &&
          formData.contact_email !== "" &&
          formData.contact_phone !== ""
        );
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    const noteParts = [
      formData.location_area ? `Area: ${formData.location_area}` : "",
      formData.duration ? `Duration: ${formData.duration}` : "",
      formData.capacity ? `Capacity: ${formData.capacity}` : "",
      formData.additional_notes || "",
    ].filter(Boolean).join(" | ");
    const result = await submitEnquiry({
      situation: formData.situation,
      name: formData.contact_name,
      email: formData.contact_email,
      phone: formData.contact_phone,
      postcode: formData.location_postcode,
      timeline: formData.timeline,
      additional_notes: noteParts,
    });
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          Thank you! Your enquiry has been submitted.
        </h2>
        <p className="text-lg text-slate-500 max-w-lg mx-auto">
          We&apos;ll match you with the right providers and be in touch within 24
          hours. In the meantime, feel free to explore our kitchen types and
          guides.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
          <span>Step {step} of 5</span>
          <span>{Math.round((step / 5) * 100)}% complete</span>
        </div>
        <div className="h-2 rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-primary-600 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Situation */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            What&apos;s your situation?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {situationOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateField("situation", opt.value)}
                className={`rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-colors ${
                  formData.situation === opt.value
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Location */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Where do you need the kitchen?
          </h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Postcode</label>
              <input
                type="text"
                placeholder="e.g. SW1A 1AA"
                value={formData.location_postcode}
                onChange={(e) => updateField("location_postcode", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Area / City</label>
              <input
                type="text"
                placeholder="e.g. Central London"
                value={formData.location_area}
                onChange={(e) => updateField("location_area", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Timeline */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            When do you need it?
          </h2>
          <div className="space-y-3">
            {timelineOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateField("timeline", opt.value)}
                className={`w-full rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-colors ${
                  formData.timeline === opt.value
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Duration + Capacity */}
      {step === 4 && (
        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Duration and capacity
          </h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>How long do you need the kitchen?</label>
              <input
                type="text"
                placeholder="e.g. 6 weeks, 3 months, 2 days"
                value={formData.duration}
                onChange={(e) => updateField("duration", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                How many people/meals do you need to cater for?
              </label>
              <input
                type="text"
                placeholder="e.g. Family of 4, 200 meals/day, 500 guests"
                value={formData.capacity}
                onChange={(e) => updateField("capacity", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Any additional details? (optional)</label>
              <textarea
                placeholder="Tell us anything else that might help — access restrictions, power availability, specific equipment needed..."
                value={formData.additional_notes}
                onChange={(e) => updateField("additional_notes", e.target.value)}
                rows={3}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Contact details */}
      {step === 5 && (
        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Your contact details
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            We&apos;ll use these to send your matched quotes. We never share your
            details with anyone other than the providers we match you with.
          </p>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={formData.contact_name}
                onChange={(e) => updateField("contact_name", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.contact_email}
                onChange={(e) => updateField("contact_email", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Phone Number</label>
              <input
                type="tel"
                placeholder="07xxx xxxxxx"
                value={formData.contact_phone}
                onChange={(e) => updateField("contact_phone", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="text-sm font-medium text-slate-600 hover:text-slate-800"
          >
            &larr; Back
          </button>
        ) : (
          <div />
        )}

        {step < 5 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue &rarr;
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canProceed() || submitting}
            className="btn-accent text-lg px-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit Enquiry"}
          </button>
        )}
      </div>
    </div>
  );
}
