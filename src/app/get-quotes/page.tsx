import { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Get Free Temporary Kitchen Quotes",
  description:
    "Get free, no-obligation quotes from specialist temporary kitchen providers. Tell us your situation and we'll match you with the right solution — usually within 2 business days.",
  alternates: { canonical: "https://findakitchen.co.uk/get-quotes" },
};

const MAILTO =
  "mailto:hello@findakitchen.co.uk" +
  "?subject=" +
  encodeURIComponent("Temporary kitchen quote request") +
  "&body=" +
  encodeURIComponent(
    [
      "Tell us a little about what you need and we'll come back to you:",
      "",
      "Your situation (renovation, insurance claim, fire, flood, burst pipe, commercial, event):",
      "Postcode:",
      "When you need the kitchen:",
      "How long you need it for:",
      "Your name:",
      "Best phone number:",
      "Anything else we should know:",
      "",
    ].join("\n")
  );

export default function GetQuotesPage() {
  return (
    <div className="container-page py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Get Quotes" },
        ]}
      />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Get Free Quotes
          </h1>
          <p className="mt-3 text-lg text-slate-500">
            Tell us what you need and we&apos;ll match you with the right
            temporary kitchen providers. It takes less than 2 minutes.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">
            Email us your details
          </h2>
          <p className="text-slate-500 leading-relaxed mb-6">
            Send us a short email with your situation, postcode and rough dates.
            We&apos;ll read every one and come back to you with the providers
            worth talking to.
          </p>
          <a href={MAILTO} className="btn-primary inline-block">
            Email hello@findakitchen.co.uk
          </a>
          <p className="text-sm text-slate-500 mt-6">
            Helpful things to include: your situation (renovation, insurance
            claim, fire, flood, burst pipe, commercial or event), your postcode,
            when you need the kitchen and roughly how long for.
          </p>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>
            Your information is kept secure and only shared with providers we
            match you with. Read our{" "}
            <a href="/privacy-policy" className="text-primary-700 hover:underline">
              privacy policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
