import Link from "next/link";

// Honest reassurance block for the provider-facing pages. Every claim here is
// demonstrably true — we list UK providers and match an enquiry by area,
// situation and timeline; it's fast, free and no-obligation. Deliberately makes
// NO claim of vetting, screening, accreditation, approval or certification.
const REASONS = [
  {
    title: "One form, the right matches",
    body: "Tell us your postcode, situation and timeline once, and we match you to providers that cover your area and supply what you need — no ringing round a dozen companies.",
  },
  {
    title: "The fastest way to be contacted",
    body: "We pass your details straight to suitable providers, so the right ones can come back to you quickly.",
  },
  {
    title: "Free and no obligation",
    body: "It costs nothing, you're under no obligation, and you choose from whoever responds.",
  },
];

export function WhyRequestThroughUs() {
  return (
    <aside className="bg-white rounded-2xl border border-[var(--border)] p-6 sm:p-8 max-w-4xl">
      <h2 className="font-serif text-xl sm:text-2xl text-[var(--charcoal)] mb-1">
        Why request through FindAKitchen?
      </h2>
      <p className="text-sm text-[var(--muted)] mb-6">
        We list temporary kitchen providers across the UK and match your enquiry
        to the ones that fit.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        {REASONS.map((reason) => (
          <div key={reason.title}>
            <div className="flex items-start gap-2 mb-1.5">
              <span aria-hidden="true" className="text-[var(--sage)] leading-none mt-0.5">
                &#10003;
              </span>
              <h3 className="font-medium text-sm text-[var(--charcoal)] leading-snug">
                {reason.title}
              </h3>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              {reason.body}
            </p>
          </div>
        ))}
      </div>

      <Link
        href="/get-quotes"
        className="inline-flex items-center justify-center bg-[var(--clay)] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[var(--clay-light)] transition-colors"
      >
        Get Free Quotes &rarr;
      </Link>
    </aside>
  );
}
