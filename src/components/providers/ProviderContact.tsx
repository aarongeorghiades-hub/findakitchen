import { Provider } from "@/types";

// The provider's own public contact routes. This is the primary action on a
// provider page: FindAKitchen takes no enquiries, so these links are the only
// forward path to the business.
//
// Every field is optional. Nothing renders unless there is a real value, so a
// provider with no phone number simply shows one fewer button — never an empty
// field, a bare label, or a dead link.

// tel: needs digits only, but a leading + must survive for international numbers.
export function telHref(phone: string): string {
  const cleaned = phone.trim().replace(/(?!^\+)[^\d]/g, "");
  return `tel:${cleaned}`;
}

// Show "galleys.co.uk" rather than the full URL with scheme and trailing slash.
export function websiteLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
  }
}

type Props = Pick<
  Provider,
  "name" | "website" | "phone" | "email" | "trustpilot_url"
>;

export function ProviderContact({
  name,
  website,
  phone,
  email,
  trustpilot_url,
}: Props) {
  // No usable route at all — render nothing rather than an empty shell.
  if (!website && !phone && !email) return null;

  // Phone leads when there is one; otherwise the website is the primary action.
  const primaryIsPhone = Boolean(phone);

  const primaryClass =
    "inline-flex items-center gap-2 text-sm bg-[var(--clay)] text-white px-7 py-3 rounded-full hover:bg-[var(--clay-light)] transition-all duration-300 font-medium";
  const secondaryClass =
    "inline-flex items-center gap-2 text-sm border border-white/25 text-white px-7 py-3 rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300 font-medium";

  return (
    <div id="contact" className="scroll-mt-24">
      <p className="text-xs uppercase tracking-widest text-[var(--clay-light)] mb-3">
        Contact {name}
      </p>

      <div className="flex flex-wrap gap-3">
        {phone && (
          <a href={telHref(phone)} className={primaryClass}>
            <span aria-hidden="true">&#9742;</span>
            {phone}
          </a>
        )}

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className={primaryIsPhone ? secondaryClass : primaryClass}
          >
            {websiteLabel(website)}
            <span aria-hidden="true">&#8599;</span>
          </a>
        )}

        {!website && email && (
          <a href={`mailto:${email}`} className={primaryIsPhone ? secondaryClass : primaryClass}>
            {email}
          </a>
        )}
      </div>

      {trustpilot_url && (
        <a
          href={trustpilot_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors mt-4"
        >
          Read their Trustpilot reviews
          <span aria-hidden="true">&#8599;</span>
        </a>
      )}

      <p className="text-xs text-white/40 mt-4 max-w-lg leading-relaxed">
        You&apos;ll be dealing with {name} directly. FindAKitchen isn&apos;t
        involved in the quote or the booking, and takes no fee from you.
      </p>
    </div>
  );
}
