"use client";

import { useState, FormEvent } from "react";
import { submitEnquiry } from "@/lib/enquiries";

export function LossAdjusterForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [firmName, setFirmName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [monthlyClaims, setMonthlyClaims] = useState("");
  const [howHeard, setHowHeard] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const result = await submitEnquiry({
      situation: "other",
      name: `${firstName} ${lastName}`,
      email: email,
      phone: phone,
      timeline: "planning_ahead",
      market_segment: "domestic",
      additional_notes: [
        "Loss adjuster B2B enquiry",
        `Job title: ${jobTitle}`,
        `Firm: ${firmName}`,
        `Monthly kitchen damage claims: ${monthlyClaims || "Not specified"}`,
        howHeard ? `How heard: ${howHeard}` : "",
      ]
        .filter(Boolean)
        .join(" | "),
    });

    setSubmitting(false);
    if (result.success) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl border border-[var(--border)] p-8 text-center">
        <div className="text-3xl mb-4">&#10003;</div>
        <h3 className="font-serif text-xl text-[var(--charcoal)] mb-2">
          Thank you
        </h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          We&apos;ll be in touch within one business day to discuss the referral
          programme.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700 text-sm focus:border-[var(--clay)] focus:outline-none focus:ring-1 focus:ring-[var(--clay)]";
  const labelClass = "block text-sm font-medium text-[var(--charcoal)] mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-[var(--border)] p-6 sm:p-8 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First name *
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last name *
          </label>
          <input
            id="lastName"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="jobTitle" className={labelClass}>
            Job title *
          </label>
          <input
            id="jobTitle"
            type="text"
            required
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="firmName" className={labelClass}>
            Firm name *
          </label>
          <input
            id="firmName"
            type="text"
            required
            value={firmName}
            onChange={(e) => setFirmName(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelClass}>
            Business email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="monthlyClaims" className={labelClass}>
          Approximate monthly kitchen damage claims
        </label>
        <select
          id="monthlyClaims"
          value={monthlyClaims}
          onChange={(e) => setMonthlyClaims(e.target.value)}
          className={inputClass}
        >
          <option value="">Select...</option>
          <option value="1–5">1&ndash;5</option>
          <option value="6–15">6&ndash;15</option>
          <option value="16–30">16&ndash;30</option>
          <option value="30+">30+</option>
          <option value="Not sure">Not sure</option>
        </select>
      </div>

      <div>
        <label htmlFor="howHeard" className={labelClass}>
          How did you hear about us?
        </label>
        <input
          id="howHeard"
          type="text"
          value={howHeard}
          onChange={(e) => setHowHeard(e.target.value)}
          className={inputClass}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">
          Something went wrong. Please email us at{" "}
          <a
            href="mailto:hello@findakitchen.co.uk"
            className="underline"
          >
            hello@findakitchen.co.uk
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto bg-[var(--clay)] text-white px-8 py-3.5 rounded-full hover:bg-[var(--clay-light)] transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Register interest \u2192"}
      </button>
    </form>
  );
}
