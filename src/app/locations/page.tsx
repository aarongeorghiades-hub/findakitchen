import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Temporary Kitchen Hire by Location | FindAKitchen",
  description:
    "Find temporary kitchen hire providers in your area. Browse by UK city to compare domestic pods and commercial kitchen units near you.",
  alternates: {
    canonical: "https://findakitchen.co.uk/locations",
  },
};

const CITIES = [
  { slug: "london", name: "London", region: "Greater London" },
  { slug: "manchester", name: "Manchester", region: "Greater Manchester" },
  { slug: "birmingham", name: "Birmingham", region: "West Midlands" },
  { slug: "leeds", name: "Leeds", region: "West Yorkshire" },
  { slug: "bristol", name: "Bristol", region: "South West England" },
  { slug: "sheffield", name: "Sheffield", region: "South Yorkshire" },
  { slug: "edinburgh", name: "Edinburgh", region: "Scotland" },
  { slug: "glasgow", name: "Glasgow", region: "Scotland" },
  { slug: "liverpool", name: "Liverpool", region: "Merseyside" },
  { slug: "nottingham", name: "Nottingham", region: "East Midlands" },
  { slug: "cardiff", name: "Cardiff", region: "Wales" },
  { slug: "leicester", name: "Leicester", region: "East Midlands" },
  { slug: "coventry", name: "Coventry", region: "West Midlands" },
  { slug: "newcastle", name: "Newcastle", region: "North East England" },
  { slug: "brighton", name: "Brighton", region: "East Sussex" },
];

export default function LocationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--charcoal)] pt-12 pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-3xl relative z-10">
          <nav className="text-xs text-white/40 mb-6 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white/60 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white/60">Locations</span>
          </nav>

          <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-5">
            Temporary Kitchen Hire by Location
          </h1>

          <p className="text-lg text-white/50 font-light leading-relaxed max-w-2xl">
            Find temporary kitchen hire providers in your area. Browse by UK
            city to compare domestic pods and commercial kitchen units near you.
          </p>
        </div>
      </section>

      {/* City grid */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/locations/${city.slug}`}
              className="group bg-white rounded-2xl p-6 border border-[var(--border)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[var(--clay)] relative overflow-hidden block"
            >
              <h2 className="font-serif text-xl text-[var(--charcoal)] group-hover:text-[var(--clay)] transition-colors duration-300 mb-1">
                {city.name}
              </h2>
              <p className="text-sm text-[var(--muted)]">{city.region}</p>
              <div className="mt-4 text-xs text-[var(--clay)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View providers &rarr;
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
