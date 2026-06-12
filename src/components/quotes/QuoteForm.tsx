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
  { value: "other", label: "Something else" },
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

// Situations that route to the commercial path (funding step skipped, no
// appliances picker, market_segment = "commercial").
const COMMERCIAL_SITUATIONS = [
  "school_hospital_refurb",
  "event_festival",
  "restaurant_refurb",
];

// Ordered step keys per path. Commercial skips "funding".
const DOMESTIC_STEPS = [
  "situation",
  "location",
  "timing",
  "funding",
  "details",
  "spec",
  "contact",
];
const COMMERCIAL_STEPS = [
  "situation",
  "location",
  "timing",
  "details",
  "spec",
  "contact",
];

const timelineOptions = [
  { value: "emergency", label: "Emergency — I need it now" },
  { value: "within_week", label: "Within a week" },
  { value: "within_month", label: "Within a month" },
  { value: "planning_ahead", label: "Planning ahead (1+ months)" },
];

const fundingOptions = [
  { value: "insurance", label: "Through an insurance claim" },
  { value: "self_funded", label: "I'm paying for it myself" },
  { value: "not_sure", label: "Not sure yet" },
];

const budgetOptions = [
  { value: "under_500", label: "Under £500/week" },
  { value: "500_800", label: "£500–£800/week" },
  { value: "over_800", label: "£800+/week" },
  { value: "not_sure", label: "Not sure yet" },
];

const applianceOptions = [
  { value: "cooker", label: "Cooker / oven & hob" },
  { value: "fridge", label: "Fridge" },
  { value: "freezer", label: "Freezer" },
  { value: "dishwasher", label: "Dishwasher" },
  { value: "washing_machine", label: "Washing machine" },
];

const accessOptions = [
  { value: "driveway", label: "Driveway / private space" },
  { value: "street_only", label: "Street parking only" },
  { value: "gated", label: "Gated entrance" },
  { value: "restricted", label: "Restricted / difficult access" },
];

const utilityOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
];

interface Step4Copy {
  heading: string;
  durationLabel: string;
  durationPlaceholder: string;
  capacityLabel: string;
  capacityPlaceholder: string;
  notesPlaceholder: string;
}

// Situation-aware copy for the details step. Field names / data model unchanged —
// this only varies the visible labels, heading, and placeholders.
const STEP4_COPY: Record<string, Step4Copy> & { default: Step4Copy } = {
  default: {
    heading: "Duration and capacity",
    durationLabel: "How long do you need the kitchen?",
    durationPlaceholder: "e.g. 6 weeks, 3 months, 2 days",
    capacityLabel: "How many people/meals do you need to cater for?",
    capacityPlaceholder: "e.g. Family of 4, 200 meals/day, 500 guests",
    notesPlaceholder:
      "e.g. specific equipment, site constraints, anything unusual",
  },
  renovation: {
    heading: "Your renovation details",
    durationLabel: "How long will your renovation take?",
    durationPlaceholder: "e.g. 6 weeks, 3 months",
    capacityLabel: "How many people are you cooking for?",
    capacityPlaceholder: "e.g. family of 4",
    notesPlaceholder:
      "e.g. preferred delivery times, anything unusual about the property",
  },
  flood_fire_damage: {
    heading: "Your emergency details",
    durationLabel: "How long will you need it?",
    durationPlaceholder: "e.g. until repairs finish",
    capacityLabel: "How many people are in the household?",
    capacityPlaceholder: "e.g. family of 4",
    notesPlaceholder: "e.g. extent of damage, insurer involved",
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
    notesPlaceholder: "e.g. dietary needs, service times",
  },
  event_festival: {
    heading: "Event size & dates",
    durationLabel: "What are the event dates?",
    durationPlaceholder: "e.g. 12-14 July, 3 days",
    capacityLabel: "How many guests / covers?",
    capacityPlaceholder: "e.g. 500 guests",
    notesPlaceholder: "e.g. event type, service times, cuisine",
  },
  restaurant_refurb: {
    heading: "Covers & timeline",
    durationLabel: "How long is the refurbishment?",
    durationPlaceholder: "e.g. 4 weeks",
    capacityLabel: "How many covers do you serve?",
    capacityPlaceholder: "e.g. 80 per service",
    notesPlaceholder: "e.g. cuisine, specialist equipment, peak service times",
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
  // Deep link with a valid situation starts on the location step (index 1).
  const [stepIndex, setStepIndex] = useState(validInitialSituation ? 1 : 0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    situation: validInitialSituation,
    location_postcode: "",
    location_area: "",
    timeline: "",
    start_date: "",
    funding_source: "",
    budget_band: "",
    duration: "",
    capacity: "",
    appliances: [] as string[],
    access_type: "",
    water_on_site: "",
    power_on_site: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    additional_notes: "",
  });

  const isCommercial = COMMERCIAL_SITUATIONS.includes(formData.situation);
  const steps = isCommercial ? COMMERCIAL_STEPS : DOMESTIC_STEPS;
  const currentStepKey = steps[stepIndex];
  const totalSteps = steps.length;

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Single-select fields that can be deselected by clicking the chosen option.
  const toggleField = (field: string, value: string) => {
    setFormData((prev) => {
      const current = (prev as Record<string, unknown>)[field];
      return { ...prev, [field]: current === value ? "" : value };
    });
  };

  // Choosing a situation. If it routes commercial, clear domestic-only funding
  // fields so a domestic→commercial switch via Back never leaks stale data.
  const selectSituation = (value: string) => {
    const commercial = COMMERCIAL_SITUATIONS.includes(value);
    setFormData((prev) => ({
      ...prev,
      situation: value,
      funding_source: commercial ? "" : prev.funding_source,
      budget_band: commercial ? "" : prev.budget_band,
    }));
  };

  // Funding is single-select (required). Clear budget if leaving self_funded.
  const selectFunding = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      funding_source: value,
      budget_band: value === "self_funded" ? prev.budget_band : "",
    }));
  };

  const toggleAppliance = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      appliances: prev.appliances.includes(value)
        ? prev.appliances.filter((a) => a !== value)
        : [...prev.appliances, value],
    }));
  };

  const canProceed = () => {
    switch (currentStepKey) {
      case "situation":
        return formData.situation !== "";
      case "location":
        return formData.location_postcode !== "" && formData.location_area !== "";
      case "timing":
        return formData.timeline !== "" && formData.start_date !== "";
      case "funding":
        return formData.funding_source !== "";
      case "details":
        return formData.duration !== "" && formData.capacity !== "";
      case "spec":
        return true;
      case "contact":
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
    ]
      .filter(Boolean)
      .join(" | ");
    const result = await submitEnquiry({
      situation: formData.situation,
      name: formData.contact_name,
      email: formData.contact_email,
      phone: formData.contact_phone,
      postcode: formData.location_postcode,
      timeline: formData.timeline,
      additional_notes: noteParts,
      funding_source: isCommercial ? null : formData.funding_source || null,
      budget_band: isCommercial ? null : formData.budget_band || null,
      start_date: formData.start_date || null,
      appliances:
        formData.appliances.length > 0 ? formData.appliances.join(",") : null,
      access_type: formData.access_type || null,
      water_on_site: formData.water_on_site || null,
      power_on_site: formData.power_on_site || null,
      market_segment: isCommercial ? "commercial" : "domestic",
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

  // Shared selected/unselected button treatments (matches existing aesthetic).
  const selBtn =
    "border-[var(--clay)] bg-[var(--clay)]/10 text-[var(--clay)]";
  const unselBtn = "border-slate-200 text-slate-700 hover:border-slate-300";

  const isLast = stepIndex === totalSteps - 1;

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
          <span>
            Step {stepIndex + 1} of {totalSteps}
          </span>
          <span>{Math.round(((stepIndex + 1) / totalSteps) * 100)}% complete</span>
        </div>
        <div className="h-2 rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-[var(--clay)] transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step: Situation */}
      {currentStepKey === "situation" && (
        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            What&apos;s your situation?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {situationOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => selectSituation(opt.value)}
                className={`rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-colors ${
                  formData.situation === opt.value ? selBtn : unselBtn
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Location */}
      {currentStepKey === "location" && (
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

      {/* Step: Timing */}
      {currentStepKey === "timing" && (
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
                  formData.timeline === opt.value ? selBtn : unselBtn
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="mt-5">
            <label className={labelClass}>
              When would the kitchen need to arrive?
            </label>
            <input
              type="date"
              value={formData.start_date}
              onChange={(e) => updateField("start_date", e.target.value)}
              className={inputClass}
            />
            <p className="mt-1.5 text-sm text-slate-500">
              Your best estimate is fine — providers need a target date to quote
              availability.
            </p>
          </div>
        </div>
      )}

      {/* Step: Funding (domestic only) */}
      {currentStepKey === "funding" && (
        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-1">
            How will this be paid for?
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            This helps us match you with the right providers — it doesn&apos;t
            affect your quotes.
          </p>
          <div className="space-y-3">
            {fundingOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => selectFunding(opt.value)}
                className={`w-full rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-colors ${
                  formData.funding_source === opt.value ? selBtn : unselBtn
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {formData.funding_source === "self_funded" && (
            <div className="mt-6">
              <label className={labelClass}>
                Rough weekly budget in mind? (optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {budgetOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateField("budget_band", opt.value)}
                    className={`rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-colors ${
                      formData.budget_band === opt.value ? selBtn : unselBtn
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step: Details (duration + capacity) */}
      {currentStepKey === "details" && (
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
          </div>
        </div>
      )}

      {/* Step: Spec (site & requirements — all optional) */}
      {currentStepKey === "spec" && (
        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-1">
            Your site and requirements
          </h2>
          <p className="text-sm text-slate-500 mb-5">
            All optional — but the more you tell us, the more accurate your
            quotes.
          </p>

          {/* (a) Appliances — domestic only */}
          {!isCommercial && (
            <div className="mb-6">
              <label className={labelClass}>Which appliances do you need?</label>
              <div className="flex flex-wrap gap-2">
                {applianceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => toggleAppliance(opt.value)}
                    className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors ${
                      formData.appliances.includes(opt.value) ? selBtn : unselBtn
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* (b) Access — all situations */}
          <div className="mb-6">
            <label className={labelClass}>Access at the property</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {accessOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => toggleField("access_type", opt.value)}
                  className={`rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-colors ${
                    formData.access_type === opt.value ? selBtn : unselBtn
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* (c) Utilities — all situations */}
          <div className="mb-6 space-y-4">
            <div>
              <label className={labelClass}>Water available on site?</label>
              <div className="flex flex-wrap gap-2">
                {utilityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => toggleField("water_on_site", opt.value)}
                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors ${
                      formData.water_on_site === opt.value ? selBtn : unselBtn
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass}>Power available on site?</label>
              <div className="flex flex-wrap gap-2">
                {utilityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => toggleField("power_on_site", opt.value)}
                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors ${
                      formData.power_on_site === opt.value ? selBtn : unselBtn
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* (d) Notes — all situations */}
          <div>
            <label className={labelClass}>
              Anything else providers should know? (optional)
            </label>
            <textarea
              placeholder={step4Copy.notesPlaceholder}
              value={formData.additional_notes}
              onChange={(e) => updateField("additional_notes", e.target.value)}
              rows={3}
              className={inputClass}
            />
          </div>
        </div>
      )}

      {/* Step: Contact */}
      {currentStepKey === "contact" && (
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
        {stepIndex > 0 ? (
          <button
            onClick={() => setStepIndex(stepIndex - 1)}
            className="text-sm font-medium text-slate-600 hover:text-slate-800"
          >
            &larr; Back
          </button>
        ) : (
          <div />
        )}

        {!isLast ? (
          <button
            onClick={() => setStepIndex(stepIndex + 1)}
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
