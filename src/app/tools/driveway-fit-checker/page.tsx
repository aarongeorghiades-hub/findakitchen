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
  return (
    <>
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
