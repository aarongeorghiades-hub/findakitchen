"use client";

import { useState, FormEvent } from "react";
import { submitEnquiry } from "@/lib/enquiries";

export function TradePartnerForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [trade, setTrade] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [monthlyVolume, setMonthlyVolume] = useState("");
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
        "Trade partner registration",
        `Trade: ${trade}`,
        businessName ? `Business: ${businessName}` : "",
        `Monthly kitchen fits/renovations: ${monthlyVolume || "Not specified"}`,
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
          You&apos;re registered
        </h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          We&apos;ll email your referral link within one business day.
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
          <label htmlFor="tp-firstName" className={labelClass}>
            First name *
          </label>
          <input
            id="tp-firstName"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="tp-lastName" className={labelClass}>
            Last name *
          </label>
          <input
            id="tp-lastName"
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
          <label htmlFor="tp-trade" className={labelClass}>
            Trade / job title *
          </label>
          <input
            id="tp-trade"
            type="text"
            required
            placeholder="e.g. Kitchen fitter, Builder, Plumber"
            value={trade}
            onChange={(e) => setTrade(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="tp-businessName" className={labelClass}>
            Business name
          </label>
          <input
            id="tp-businessName"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="tp-email" className={labelClass}>
            Email address *
          </label>
          <input
            id="tp-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="tp-phone" className={labelClass}>
            Phone number
          </label>
          <input
            id="tp-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="tp-monthlyVolume" className={labelClass}>
          Approximate kitchen fits or renovations per month
        </label>
        <select
          id="tp-monthlyVolume"
          value={monthlyVolume}
          onChange={(e) => setMonthlyVolume(e.target.value)}
          className={inputClass}
        >
          <option value="">Select...</option>
          <option value="1–2">1&ndash;2</option>
          <option value="3–5">3&ndash;5</option>
          <option value="6–10">6&ndash;10</option>
          <option value="10+">10+</option>
          <option value="Varies">Varies</option>
        </select>
      </div>

      <div>
        <label htmlFor="tp-howHeard" className={labelClass}>
          How did you hear about FindAKitchen?
        </label>
        <input
          id="tp-howHeard"
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
        {submitting ? "Submitting..." : "Register as a trade partner \u2192"}
      </button>
    </form>
  );
}
