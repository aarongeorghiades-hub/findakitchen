"use client";
import { useState } from "react";
import Link from "next/link";

interface PodType {
  name: string;
  type: "domestic" | "commercial";
  minLength: number;
  minWidth: number;
  idealLength: number;
  idealWidth: number;
  description: string;
  features: string[];
  providerSlugs: { slug: string; name: string }[];
  kitchenType: string;
}

const podTypes: PodType[] = [
  {
    name: "Indoor Capsule Kitchen",
    type: "domestic",
    minLength: 2.4,
    minWidth: 1.8,
    idealLength: 3.0,
    idealWidth: 2.0,
    description: "A compact self-contained unit that installs inside your home — in a garage, utility room, or large hallway. No driveway needed.",
    features: ["No outdoor space required", "Works in garage or utility room", "Electric only", "Minimal installation"],
    providerSlugs: [
      { slug: "galleys", name: "Galleys" },
    ],
    kitchenType: "Indoor Capsule",
  },
  {
    name: "Small Driveway Pod",
    type: "domestic",
    minLength: 3.5,
    minWidth: 2.5,
    idealLength: 4.5,
    idealWidth: 3.0,
    description: "The most popular option for home renovations. Sits on your driveway, connects to your existing utilities, and is ready to use within hours of delivery.",
    features: ["Delivered same or next day", "Gas or electric", "Full cooking facilities", "Minimal planning required"],
    providerSlugs: [
      { slug: "temporary-solutions-group", name: "Temporary Solutions Group" },
      { slug: "kitchen-rescue", name: "Kitchen Rescue" },
      { slug: "galleykit", name: "GalleyKit" },
    ],
    kitchenType: "Driveway Pod",
  },
  {
    name: "Large Driveway Pod",
    type: "domestic",
    minLength: 5.5,
    minWidth: 2.8,
    idealLength: 6.5,
    idealWidth: 3.5,
    description: "A larger driveway pod with more worktop space and appliances. Ideal for larger families or longer renovation projects.",
    features: ["More worktop space", "Additional appliances", "Gas or electric", "Suitable for longer hire"],
    providerSlugs: [
      { slug: "temporary-solutions-group", name: "Temporary Solutions Group" },
      { slug: "kitchen-rescue", name: "Kitchen Rescue" },
    ],
    kitchenType: "Driveway Pod (Large)",
  },
  {
    name: "Trailer Kitchen",
    type: "domestic",
    minLength: 6.0,
    minWidth: 3.0,
    idealLength: 7.5,
    idealWidth: 3.5,
    description: "A towable trailer-mounted kitchen. Needs a flat surface and a clear access route. Popular for longer-term domestic hire and events.",
    features: ["Towable — can be repositioned", "Larger cooking capacity", "Gas or electric", "Suitable for events"],
    providerSlugs: [
      { slug: "mobile-kitchen-hire", name: "Mobile Kitchen Hire" },
    ],
    kitchenType: "Trailer Kitchen",
  },
  {
    name: "Commercial Modular Kitchen",
    type: "commercial",
    minLength: 6.0,
    minWidth: 3.0,
    idealLength: 8.0,
    idealWidth: 4.0,
    description: "A full commercial kitchen unit capable of serving 200–800+ meals per day. Used by schools, hospitals, restaurants, and construction sites.",
    features: ["Serves 200–800+ meals/day", "3-phase electric or gas", "Full commercial equipment", "HACCP compliant"],
    providerSlugs: [
      { slug: "pkl-group", name: "PKL Group" },
      { slug: "the-kitchen-hire-company", name: "The Kitchen Hire Company" },
      { slug: "mobile-kitchens-ltd", name: "Mobile Kitchens Ltd" },
    ],
    kitchenType: "Modular Cabin",
  },
  {
    name: "Container Kitchen",
    type: "commercial",
    minLength: 6.1,
    minWidth: 2.8,
    idealLength: 7.5,
    idealWidth: 3.5,
    description: "A converted shipping container fitted as a full commercial kitchen. Robust, weatherproof, and suitable for construction sites and festivals.",
    features: ["Extremely durable", "Weatherproof", "Suitable for rough terrain", "Stackable"],
    providerSlugs: [
      { slug: "pod-kitchens", name: "Pod Kitchens" },
    ],
    kitchenType: "Container Kitchen",
  },
];

type ResultCategory = "perfect" | "possible" | "tooSmall";

function categorise(pod: PodType, length: number, width: number): ResultCategory {
  if (length >= pod.idealLength && width >= pod.idealWidth) return "perfect";
  if (length >= pod.minLength && width >= pod.minWidth) return "possible";
  return "tooSmall";
}

export function DrivewayCheckerClient() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [market, setMarket] = useState<"all" | "domestic" | "commercial">("all");
  const [submitted, setSubmitted] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const l = parseFloat(length);
  const w = parseFloat(width);

  const results =
    submitted && !isNaN(l) && !isNaN(w)
      ? podTypes
          .filter((p) => market === "all" || p.type === market)
          .map((p) => ({ pod: p, category: categorise(p, l, w) }))
          .sort((a, b) => {
            const order = { perfect: 0, possible: 1, tooSmall: 2 };
            return order[a.category] - order[b.category];
          })
      : [];

  const perfectCount = results.filter((r) => r.category === "perfect").length;
  const possibleCount = results.filter((r) => r.category === "possible").length;

  return (
    <div>
      {/* Input form */}
      <div className="bg-white rounded-2xl border border-[var(--border)] p-8 mb-10">
        <h2 className="font-serif text-2xl text-[var(--charcoal)] mb-2">Enter your space dimensions</h2>
        <p className="text-sm text-[var(--muted)] mb-6">
          Measure the usable length and width of your driveway or outdoor space in metres. Include clearance space around the unit.
        </p>

        <form onSubmit={handleCheck} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[var(--muted)] mb-2">
                Length (metres)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="30"
                value={length}
                onChange={(e) => { setLength(e.target.value); setSubmitted(false); }}
                placeholder="e.g. 5.5"
                required
                className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--charcoal)] focus:outline-none focus:border-[var(--clay)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[var(--muted)] mb-2">
                Width (metres)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="30"
                value={width}
                onChange={(e) => { setWidth(e.target.value); setSubmitted(false); }}
                placeholder="e.g. 3.0"
                required
                className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--charcoal)] focus:outline-none focus:border-[var(--clay)] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[var(--muted)] mb-2">
              I need this for
            </label>
            <div className="flex flex-wrap gap-3">
              {([
                { key: "all", label: "Both domestic & commercial" },
                { key: "domestic", label: "\u{1F3E0} Home / domestic" },
                { key: "commercial", label: "\u{1F3D7}\u{FE0F} Commercial / business" },
              ] as { key: typeof market; label: string }[]).map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setMarket(opt.key)}
                  className={`text-sm px-5 py-2.5 rounded-full border transition-all duration-200 ${
                    market === opt.key
                      ? "bg-[var(--charcoal)] text-white border-[var(--charcoal)]"
                      : "border-[var(--border)] text-[var(--warm-mid)] hover:border-[var(--charcoal)]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-[var(--clay)] text-white px-8 py-3.5 rounded-full hover:bg-[var(--clay-light)] transition-all duration-300 text-sm font-medium"
          >
            Check what fits &rarr;
          </button>
        </form>
      </div>

      {/* Results */}
      {submitted && !isNaN(l) && !isNaN(w) && (
        <div>
          <div className="mb-6">
            <h2 className="font-serif text-2xl text-[var(--charcoal)] mb-1">
              Results for {l}m &times; {w}m
            </h2>
            <p className="text-sm text-[var(--muted)]">
              {perfectCount > 0
                ? `${perfectCount} unit${perfectCount > 1 ? "s" : ""} fit comfortably — ${possibleCount > 0 ? `${possibleCount} more may fit with careful placement.` : "great news."}`
                : possibleCount > 0
                ? `No units fit with ideal clearance, but ${possibleCount} may fit with careful placement.`
                : "Your space is too small for most standard units. Consider an indoor capsule kitchen instead."}
            </p>
          </div>

          <div className="space-y-4">
            {results.map(({ pod, category }) => (
              <div
                key={pod.name}
                className={`bg-white rounded-2xl border p-6 transition-all duration-200 ${
                  category === "perfect"
                    ? "border-[var(--sage)] shadow-sm"
                    : category === "possible"
                    ? "border-[var(--amber)] opacity-90"
                    : "border-[var(--border)] opacity-50"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-serif text-xl text-[var(--charcoal)]">{pod.name}</h3>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          category === "perfect"
                            ? "bg-[#EBF5EF] text-[var(--sage)]"
                            : category === "possible"
                            ? "bg-[#FFF8E1] text-[var(--amber)]"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {category === "perfect"
                          ? "\u2713 Fits comfortably"
                          : category === "possible"
                          ? "\u26A0 May fit \u2014 check carefully"
                          : "\u2717 Too small"}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--muted)]">
                      Min space needed: {pod.minLength}m &times; {pod.minWidth}m &nbsp;&middot;&nbsp; Ideal: {pod.idealLength}m &times; {pod.idealWidth}m
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full ${
                      pod.type === "domestic"
                        ? "bg-[#EBF5EF] text-[var(--sage)]"
                        : "bg-[#EBF0F9] text-[#3B65C4]"
                    }`}
                  >
                    {pod.type === "domestic" ? "Domestic" : "Commercial"}
                  </span>
                </div>

                {category !== "tooSmall" && (
                  <>
                    <p className="text-sm text-[var(--warm-mid)] leading-relaxed mb-4">{pod.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {pod.features.map((f) => (
                        <span key={f} className="text-xs bg-[var(--cream)] text-[var(--warm-mid)] px-3 py-1 rounded-full border border-[var(--border)]">
                          {f}
                        </span>
                      ))}
                    </div>

                    {pod.providerSlugs.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-2">Providers offering this</p>
                        <div className="flex flex-wrap gap-2">
                          {pod.providerSlugs.map((p) => (
                            <Link
                              key={p.slug}
                              href={`/providers/${p.slug}`}
                              className="text-xs bg-[var(--charcoal)] text-white px-4 py-1.5 rounded-full hover:bg-[var(--clay)] transition-all duration-200"
                            >
                              {p.name} &rarr;
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {category === "tooSmall" && (
                  <p className="text-sm text-slate-400">
                    Requires at least {pod.minLength}m &times; {pod.minWidth}m &mdash; your space is {Math.max(0, pod.minLength - l).toFixed(1)}m too short
                    {pod.minWidth > w ? ` and ${(pod.minWidth - w).toFixed(1)}m too narrow` : ""}.
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 bg-[var(--charcoal)] rounded-2xl p-8 text-center">
            <h3 className="font-serif text-2xl text-white mb-2">Ready to get quotes?</h3>
            <p className="text-white/50 text-sm mb-6">
              We&apos;ll match you with the right providers for your space and situation.
            </p>
            <Link
              href="/providers"
              className="bg-[var(--clay)] text-white px-8 py-3.5 rounded-full hover:bg-[var(--clay-light)] transition-all duration-300 text-sm font-medium"
            >
              Browse providers &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* How to measure tip */}
      {!submitted && (
        <div className="bg-[#F2EDE5] rounded-2xl p-6">
          <h3 className="font-serif text-lg text-[var(--charcoal)] mb-3">How to measure your driveway</h3>
          <ul className="space-y-2 text-sm text-[var(--warm-mid)]">
            <li className="flex items-start gap-2"><span className="text-[var(--clay)] mt-0.5">1.</span> Measure the clear usable length — not including gates, bins or parked cars</li>
            <li className="flex items-start gap-2"><span className="text-[var(--clay)] mt-0.5">2.</span> Measure the usable width at the narrowest point</li>
            <li className="flex items-start gap-2"><span className="text-[var(--clay)] mt-0.5">3.</span> Add at least 0.5m clearance on each side for access and ventilation</li>
            <li className="flex items-start gap-2"><span className="text-[var(--clay)] mt-0.5">4.</span> Check there&apos;s clear overhead space — most pods are 2.4–2.7m tall</li>
          </ul>
        </div>
      )}
    </div>
  );
}
