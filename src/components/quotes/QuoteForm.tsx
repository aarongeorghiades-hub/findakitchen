"use client";

import { useState } from "react";
import { submitEnquiry } from "@/lib/enquiries";

const situationOptions = [
  { value: "renovation", label: "My kitchen is being renovated" },
  { value: "flood_fire_damage", label: "Flood, fire, or water damage" },
  { value: "insurance_claim", label: "I'm making an insurance claim" },
  { value: "school_hospital_refurb", label: "School or hospital refurbishment" },
  { value: "event_festival", label: "Event or festival catering" },
  { value: "restaurant_refurb", label: "Restaurant refurbishment" },
];

// The only situation values the enquiries table accepts (enquiries_situation_check).
// A ?situation= deep link outside this set is ignored so we never seed an invalid
// value that would fail the DB constraint on submit.
const VALID_SITUATIONS = [
  "renovation",
  "flood_fire_damage",
  "insurance_claim",
  "school_hospital_refurb",
  "event_festival",
  "restaurant_refurb",
  "other",
];

const timelineOptions = [
  { value: "emergency", label: "Emergency — I need it now" },
  { value: "within_week", label: "Within a week" },
  { value: "within_month", label: "Within a month" },
  { value: "planning_ahead", label: "Planning ahead (1+ months)" },
];

interface Step4Copy {
  heading: string;
  durationLabel: string;
  durationPlaceholder: string;
  capacityLabel: string;
  capacityPlaceholder: string;
  notesPlaceholder: string;
}

// Situation-aware copy for Step 4. Field names / data model unchanged — this
// only varies the visible labels, heading, and placeholders.
const STEP4_COPY: Record<string, Step4Copy> & { default: Step4Copy } = {
  default: {
    heading: "Duration and capacity",
    durationLabel: "How long do you need the kitchen?",
    durationPlaceholder: "e.g. 6 weeks, 3 months, 2 days",
    capacityLabel: "How many people/meals do you need to cater for?",
    capacityPlaceholder: "e.g. Family of 4, 200 meals/day, 500 guests",
    notesPlaceholder:
      "e.g. access restrictions, power availability, specific equipment needed",
  },
  renovation: {
    heading: "Your renovation details",
    durationLabel: "How long will your renovation take?",
    durationPlaceholder: "e.g. 6 weeks, 3 months",
    capacityLabel: "How many people are you cooking for?",
    capacityPlaceholder: "e.g. family of 4",
    notesPlaceholder: "e.g. driveway access, power supply, appliances you need",
  },
  flood_fire_damage: {
    heading: "Your emergency details",
    durationLabel: "How long will you need it?",
    durationPlaceholder: "e.g. until repairs finish",
    capacityLabel: "How many people are in the household?",
    capacityPlaceholder: "e.g. family of 4",
    notesPlaceholder: "e.g. when it happened, extent of damage, insurer involved",
  },
  insurance_claim: {
    heading: "Your claim details",
    durationLabel: "How long will you need the kitchen?",
    durationPlaceholder: "e.g. until repairs complete",
    capacityLabel: "How many people are in the household?",
    capacityPlaceholder: "e.g. family of 4",
    notesPlaceholder: "e.g. claim/policy number, insurer, loss adjuster name",
  },
  school_hospital_refurb: {
    heading: "Catering volume & timeline",
    durationLabel: "How long is the refurbishment?",
    durationPlaceholder: "e.g. 6 weeks, 3 months",
    capacityLabel: "How many meals per day?",
    capacityPlaceholder: "e.g. 300 meals/day",
    notesPlaceholder: "e.g. dietary needs, service times, on-site power & water",
  },
  event_festival: {
    heading: "Event size & dates",
    durationLabel: "What are the event dates?",
    durationPlaceholder: "e.g. 12-14 July, 3 days",
    capacityLabel: "How many guests / covers?",
    capacityPlaceholder: "e.g. 500 guests",
    notesPlaceholder: "e.g. event type, service times, power on site",
  },
  restaurant_refurb: {
    heading: "Covers & timeline",
    durationLabel: "How long is the refurbishment?",
    durationPlaceholder: "e.g. 4 weeks",
    capacityLabel: "How many covers do you serve?",
    capacityPlaceholder: "e.g. 80 per service",
    notesPlaceholder: "e.g. cuisine, equipment needed, peak service times",
  },
};

interface QuoteFormProps {
  initialSituation?: string;
}

export default function QuoteForm({ initialSituation }: QuoteFormProps) {
  // Ignore any ?situation= value that isn't a valid enquiry situation.
  const validInitialSituation =
    initialSituation && VALID_SITUATIONS.includes(initialSituation)
      ? initialSituation
      : "";
  const [step, setStep] = useState(validInitialSituation ? 2 : 1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    situation: validInitialSituation,
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
          We&apos;ll match you with the right providers and be in touch within 2
          business days. In the meantime, feel free to explore our kitchen types
          and guides.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";
  const step4Copy = STEP4_COPY[formData.situation] ?? STEP4_COPY.default;

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
            className="h-2 rounded-full bg-[var(--clay)] transition-all duration-300"
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
                    ? "border-[var(--clay)] bg-[var(--clay)]/10 text-[var(--clay)]"
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
                    ? "border-[var(--clay)] bg-[var(--clay)]/10 text-[var(--clay)]"
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
            {step4Copy.heading}
          </h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>{step4Copy.durationLabel}</label>
              <input
                type="text"
                placeholder={step4Copy.durationPlaceholder}
                value={formData.duration}
                onChange={(e) => updateField("duration", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>{step4Copy.capacityLabel}</label>
              <input
                type="text"
                placeholder={step4Copy.capacityPlaceholder}
                value={formData.capacity}
                onChange={(e) => updateField("capacity", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Any additional details? (optional)</label>
              <textarea
                placeholder={step4Copy.notesPlaceholder}
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
            className="text-[var(--clay)] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
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
