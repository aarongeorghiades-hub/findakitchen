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
            <strong>Last updated:</strong> August 2026
          </p>

          <p>
            FindAKitchen.co.uk (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
            is committed to protecting your privacy. This policy explains how we
            collect, use, and safeguard your personal information.
          </p>

          <p>
            ENA Enterprises Ltd (company number 17257845) is the data controller
            responsible for your personal data on this site. ENA Enterprises Ltd
            is registered with the Information Commissioner&apos;s Office
            (registration ZC164333).
          </p>

          <h2>Information we collect</h2>
          <p>
            This website has no forms, no accounts and no analytics. Simply
            browsing findakitchen.co.uk does not require you to give us any
            personal information, and none is collected from you as you read.
          </p>
          <p>The only personal information we hold is:</p>
          <ul>
            <li>
              <strong>Anything you choose to put in an email to us:</strong> your
              name, email address, and whatever you tell us about your situation.
              We only have this because you sent it.
            </li>
          </ul>

          <h2>How we use your information</h2>
          <p>
            We use the contents of your email for one purpose only: to read it
            and reply to you. We do not use it for marketing, and we do not build
            any profile of you.
          </p>

          <h2>Information sharing</h2>
          <p>
            We do not pass your details to temporary kitchen providers. If you
            want a provider to contact you, you need to contact them yourself
            using the details on their own website. We do not sell your personal
            information to anyone.
          </p>
          <p>
            Your email is handled by our email provider on our behalf, in the
            same way any business email is.
          </p>

          <h2>Data retention</h2>
          <p>
            We keep email correspondence only for as long as it is useful to the
            conversation you started, and delete it after that. You can ask us to
            delete your correspondence at any time by contacting us.
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
            This site sets no cookies of its own and runs no analytics or
            tracking of any kind. Nothing you do here is recorded or profiled.
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
