import { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "FindAKitchen.co.uk privacy policy. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://findakitchen.co.uk/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-page py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
          Privacy Policy
        </h1>

        <div className="prose prose-slate max-w-none">
          <p>
            <strong>Last updated:</strong> March 2026
          </p>

          <p>
            FindAKitchen.co.uk (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
            is committed to protecting your privacy. This policy explains how we
            collect, use, and safeguard your personal information.
          </p>

          <h2>Information we collect</h2>
          <p>When you use our service, we may collect:</p>
          <ul>
            <li>
              <strong>Contact information:</strong> name, email address, and phone
              number when you submit a quote request.
            </li>
            <li>
              <strong>Enquiry details:</strong> your situation, location, timeline,
              duration, and capacity requirements.
            </li>
            <li>
              <strong>Usage data:</strong> pages visited, time spent on site, and
              referral sources through standard web analytics.
            </li>
          </ul>

          <h2>How we use your information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Match you with appropriate temporary kitchen providers.</li>
            <li>
              Share your enquiry details with providers who can help with your
              specific situation.
            </li>
            <li>Contact you about your enquiry and provide relevant information.</li>
            <li>Improve our service and website experience.</li>
          </ul>

          <h2>Information sharing</h2>
          <p>
            We share your enquiry details only with temporary kitchen providers we
            match you with. We do not sell your personal information to third
            parties. We may share anonymised, aggregated data for analytical
            purposes.
          </p>

          <h2>Data retention</h2>
          <p>
            We retain your personal information for as long as necessary to
            provide our service and fulfil the purposes described in this policy.
            You can request deletion of your data at any time by contacting us.
          </p>

          <h2>Your rights</h2>
          <p>Under UK data protection law (UK GDPR), you have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your data.</li>
            <li>Object to processing of your data.</li>
            <li>Request data portability.</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            We use essential cookies to make our website function correctly. We
            may also use analytics cookies to understand how visitors use our
            site. You can control cookie settings through your browser
            preferences.
          </p>

          <h2>Contact us</h2>
          <p>
            If you have questions about this privacy policy or want to exercise
            your data rights, contact us at:{" "}
            <a href="mailto:privacy@findakitchen.co.uk">
              privacy@findakitchen.co.uk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
