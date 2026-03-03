import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 py-16 sm:py-24">
      <div className="container-page text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto">
          Your kitchen is out of action.{" "}
          <span className="text-accent-400">We&apos;ll fix that.</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
          Whether it&apos;s a renovation, a flood, an insurance claim, a school
          refurbishment, or a last-minute event — there&apos;s a temporary kitchen
          solution for your exact situation. Most people don&apos;t realise how many
          options exist. We&apos;ll guide you to the right one in under 2 minutes.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#wizard" className="btn-accent text-lg px-8 py-4">
            Find Your Kitchen &rarr;
          </Link>
          <Link
            href="/providers"
            className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white/10"
          >
            See All Providers
          </Link>
        </div>
      </div>
    </section>
  );
}
