import { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Get Free Temporary Kitchen Quotes",
  description:
    "How to get quotes from specialist UK temporary kitchen providers — browse the directory and contact them directly, or email FindAKitchen if you would rather talk it through first.",
  alternates: { canonical: "https://findakitchen.co.uk/get-quotes" },
};

const MAILTO =
  "mailto:hello@findakitchen.co.uk" +
  "?subject=" +
  encodeURIComponent("Temporary kitchen quote request") +
  "&body=" +
  encodeURIComponent(
    [
      "A few details about what you need:",
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
            Every specialist UK provider we know of is listed in the directory
            with the details you need to pick the right ones. Contact them
            directly, or email us if you would rather talk it through first.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">
            Email us your details
          </h2>
          <p className="text-slate-500 leading-relaxed mb-6">
            Not sure where to start, or want a second opinion on what you need?
            Send us a short email with your situation, postcode and rough dates.
            Email is read by a person, so replies are not immediate.
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
            Anything you email us stays with us &mdash; we do not pass your
            details to providers. Read our{" "}
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
