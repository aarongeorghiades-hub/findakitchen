import Link from "next/link";

// Honest reassurance block for the provider-facing pages. Every claim here is
// demonstrably true — we list UK providers and describe what each one offers.
// We do NOT take enquiries, route them, or pass details to anyone. Deliberately
// makes NO claim of vetting, screening, accreditation, approval or certification.
const REASONS = [
  {
    title: "Everyone in one place",
    body: "Specialist UK temporary kitchen providers listed together, so you can see who exists without ringing round a dozen companies.",
  },
  {
    title: "Compare before you call",
    body: "Coverage, kitchen types, power source, delivery speed and whether they work on insurance claims — set out on every profile.",
  },
  {
    title: "Free and no obligation",
    body: "It costs nothing to use, you deal with providers directly, and you're under no obligation to anyone.",
  },
];

export function WhyRequestThroughUs() {
  return (
    <aside className="bg-white rounded-2xl border border-[var(--border)] p-6 sm:p-8 max-w-4xl">
      <h2 className="font-serif text-xl sm:text-2xl text-[var(--charcoal)] mb-1">
        Why start with FindAKitchen?
      </h2>
      <p className="text-sm text-[var(--muted)] mb-6">
        We list temporary kitchen providers across the UK and set out what each
        one offers, so you can work out who to approach.
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
        href="/providers"
        className="inline-flex items-center justify-center bg-[var(--clay)] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[var(--clay-light)] transition-colors"
      >
        Browse all providers &rarr;
      </Link>
    </aside>
  );
}
