import { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import QuoteForm from "@/components/quotes/QuoteForm";

export const metadata: Metadata = {
  title: "Get Free Temporary Kitchen Quotes",
  description:
    "Get free, no-obligation quotes from verified temporary kitchen providers. Tell us your situation and we'll match you with the right solution — usually within 24 hours.",
  alternates: { canonical: "https://findakitchen.co.uk/get-quotes" },
};

interface Props {
  searchParams: { situation?: string; provider?: string };
}

export default function GetQuotesPage({ searchParams }: Props) {
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

        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <QuoteForm initialSituation={searchParams.situation} />
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
