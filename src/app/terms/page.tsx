import { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for FindAKitchen, the UK temporary kitchen hire directory and introduction service.",
  alternates: { canonical: "https://findakitchen.co.uk/terms" },
};

export default function TermsPage() {
  return (
    <div className="container-page py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Terms of Use" },
        ]}
      />

      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
          Terms of Use
        </h1>

        <div className="prose prose-slate max-w-none">
          <p>
            <strong>Last updated:</strong> June 2026
          </p>

          <p>
            These terms govern your use of FindAKitchen.co.uk. By using our
            website, you agree to these terms.
          </p>

          <h2>Who we are</h2>
          <p>
            FindAKitchen (findakitchen.co.uk) is operated by ENA Enterprises Ltd,
            a company registered in England and Wales (company number 17257845).
            FindAKitchen is a directory and introduction service for temporary
            kitchen hire. We help people who need a
            temporary kitchen find, and make contact with, temporary kitchen
            providers. References to &quot;we&quot;, &quot;us&quot; and
            &quot;our&quot; in these terms mean FindAKitchen.
          </p>

          <h2>Introduction service only</h2>
          <p>
            FindAKitchen introduces clients to temporary kitchen providers. We do
            not supply, hire out, deliver, install, or maintain temporary
            kitchens, and we do not employ or control any provider.
          </p>
          <p>
            Any hire agreement is formed directly and exclusively between the
            client and the provider. Pricing, availability, delivery,
            installation, performance, and the fulfilment of all contractual
            obligations are solely matters between the client and the provider.
            FindAKitchen is not a party to any such agreement and accepts no
            responsibility or liability for the acts, omissions, services, or
            products of any provider.
          </p>

          <h2>No endorsement or vetting</h2>
          <p>
            Inclusion of a provider in our directory does not constitute an
            endorsement, recommendation, or guarantee. FindAKitchen does not
            operate a formal vetting or accreditation process. Clients should make
            their own enquiries and satisfy themselves as to a provider&apos;s
            suitability before entering into any agreement.
          </p>

          <h2>Referral fees</h2>
          <p>
            FindAKitchen may receive a fee from a provider when an introduction
            results in a completed hire. This does not affect the price you pay.
          </p>

          <h2>Information on this site</h2>
          <p>
            Content on this website, including any pricing guidance, is general
            information and not advice. Any figures are indicative only: providers
            set their own prices and quote individually, and pricing,
            availability, and service details can change without notice. Always
            confirm the details that matter to you directly with the provider
            before making any commitment.
          </p>

          <h2>Your responsibilities</h2>
          <p>When using our service, you agree to:</p>
          <ul>
            <li>Provide accurate information in your enquiries.</li>
            <li>Not misuse our service or submit fraudulent enquiries.</li>
            <li>
              Not attempt to circumvent our systems or access restricted areas of
              our website.
            </li>
          </ul>

          <h2>Intellectual property</h2>
          <p>
            All content on FindAKitchen.co.uk — including text, design, logos, and
            images — is our intellectual property unless otherwise stated. You may
            not reproduce, distribute, or modify our content without permission.
          </p>

          <h2>Liability</h2>
          <p>
            Nothing in these terms excludes or limits our liability where it would
            be unlawful to do so — including liability for death or personal injury
            caused by negligence, or for fraud or fraudulent misrepresentation.
          </p>
          <p>
            Subject to that, FindAKitchen&apos;s liability to you in connection
            with your use of this website is limited to the fullest extent
            permitted by law. In particular, because any hire agreement is between
            you and the provider, we are not liable for the acts, omissions,
            services, or products of any provider, nor for any loss arising from
            your dealings with them.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms from time to time. Continued use of our
            website after changes constitutes acceptance of the updated terms.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms, and any dispute or claim arising out of or in connection
            with them or your use of this website, are governed by the law of
            England and Wales and subject to the exclusive jurisdiction of the
            courts of England and Wales.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about these terms, contact us at:{" "}
            <a href="mailto:hello@findakitchen.co.uk">
              hello@findakitchen.co.uk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
