import Link from "next/link";

interface CTABannerProps {
  headline?: string;
  subline?: string;
}

export default function CTABanner({
  headline = "Ready to find the right temporary kitchen?",
  subline = "Tell us your situation and we'll match you with the best providers. Free, no-obligation quotes.",
}: CTABannerProps) {
  return (
    <section className="bg-primary-700 py-12 sm:py-16">
      <div className="container-page text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          {headline}
        </h2>
        <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
          {subline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/get-quotes" className="btn-accent text-lg px-8 py-4">
            Get Free Quotes
          </Link>
          <Link
            href="/kitchen-types"
            className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white/10"
          >
            Explore Kitchen Types
          </Link>
        </div>
      </div>
    </section>
  );
}
