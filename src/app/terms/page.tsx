import { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "FindAKitchen.co.uk terms of use. The terms and conditions governing your use of our temporary kitchen hire comparison service.",
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
            <strong>Last updated:</strong> March 2026
          </p>

          <p>
            These terms govern your use of FindAKitchen.co.uk. By using our
            website, you agree to these terms.
          </p>

          <h2>Our service</h2>
          <p>
            FindAKitchen.co.uk is a lead-generation and information service that
            helps people find temporary kitchen hire providers. We are not a
            kitchen hire provider ourselves. We connect you with third-party
            providers who offer temporary kitchen solutions.
          </p>

          <h2>No guarantee</h2>
          <p>
            While we take care to work with reputable providers, we do not
            guarantee the quality, availability, or pricing of any provider&apos;s
            services. Any contract you enter into with a provider is between you
            and that provider.
          </p>

          <h2>Information accuracy</h2>
          <p>
            We strive to keep information on our website accurate and up to date.
            However, pricing, availability, and service details may change without
            notice. Always confirm details directly with providers before making
            commitments.
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

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, FindAKitchen.co.uk shall not
            be liable for any indirect, incidental, or consequential damages
            arising from your use of our service or your interactions with
            providers we connect you with.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms from time to time. Continued use of our
            website after changes constitutes acceptance of the updated terms.
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
