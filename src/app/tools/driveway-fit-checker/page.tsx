import { Metadata } from "next";
import Link from "next/link";
import { DrivewayCheckerClient } from "./DrivewayCheckerClient";

export const metadata: Metadata = {
  title: "Driveway Fit Checker — Will a Kitchen Pod Fit?",
  description:
    "Enter your driveway dimensions and find out exactly which temporary kitchen pods and units will fit. Free tool — instant results.",
  alternates: { canonical: "https://findakitchen.co.uk/tools/driveway-fit-checker" },
};

export default function DrivewayFitCheckerPage() {
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to check if a kitchen pod fits on your driveway",
    description: "Use FindAKitchen's Driveway Fit Checker to find out which temporary kitchen pods will fit in your available space.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Enter your driveway dimensions",
        text: "Input the length and width of your available driveway space in metres.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Select domestic or commercial use",
        text: "Choose whether you need a pod for a home renovation or a commercial catering requirement.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "View matching pod types",
        text: "The checker shows which pod types are a perfect fit, a possible fit, or too large for your space, along with recommended providers for each.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      {/* Hero */}
      <section className="bg-[var(--charcoal)] pt-12 pb-16 px-6 lg:px-12">
        <nav className="text-xs text-white/40 mb-6">
          <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/tools/driveway-fit-checker" className="hover:text-white/60 transition-colors">Tools</Link>
          <span className="mx-1.5">/</span>
          <span className="text-white/60">Driveway Fit Checker</span>
        </nav>
        <p className="text-xs uppercase tracking-widest text-[var(--clay-light)] mb-3">Free tool</p>
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
          Driveway Fit Checker
        </h1>
        <p className="text-lg text-white/50 font-light max-w-xl">
          Enter your driveway dimensions and we&apos;ll tell you exactly which temporary kitchen pods and units will fit — and which providers offer them.
        </p>
      </section>

      {/* Tool */}
      <section className="py-16 px-6 lg:px-12 max-w-4xl">
        <DrivewayCheckerClient />
      </section>
    </>
  );
}
