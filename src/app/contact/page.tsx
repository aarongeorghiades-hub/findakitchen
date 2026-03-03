import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with FindAKitchen.co.uk. Whether you need help finding a temporary kitchen, have a question about our service, or want to list as a provider, we're here to help.",
  alternates: { canonical: "https://findakitchen.co.uk/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-page py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              Need a temporary kitchen?
            </h2>
            <p className="text-slate-500 text-sm mb-4">
              The fastest way to get matched with the right providers is to use
              our quote form. It takes less than 2 minutes.
            </p>
            <Link href="/get-quotes" className="btn-primary text-sm">
              Get Free Quotes
            </Link>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">
              Are you a provider?
            </h2>
            <p className="text-slate-500 text-sm mb-4">
              Want to list your temporary kitchen hire business on
              FindAKitchen.co.uk? We&apos;d love to hear from you.
            </p>
            <a
              href="mailto:providers@findakitchen.co.uk"
              className="btn-secondary text-sm"
            >
              Email Us
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Get in touch
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-1">Email</h3>
              <a
                href="mailto:hello@findakitchen.co.uk"
                className="text-primary-700 hover:underline"
              >
                hello@findakitchen.co.uk
              </a>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-1">
                For providers
              </h3>
              <a
                href="mailto:providers@findakitchen.co.uk"
                className="text-primary-700 hover:underline"
              >
                providers@findakitchen.co.uk
              </a>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-1">
                Response time
              </h3>
              <p className="text-slate-500 text-sm">
                We aim to respond to all enquiries within 24 hours during business
                days. For urgent temporary kitchen needs, please use our{" "}
                <Link
                  href="/get-quotes"
                  className="text-primary-700 hover:underline"
                >
                  quote form
                </Link>{" "}
                for the fastest response.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
