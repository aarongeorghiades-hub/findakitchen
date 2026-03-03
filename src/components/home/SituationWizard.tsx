"use client";

import { useRouter } from "next/navigation";

const situations = [
  {
    icon: "\u{1F3E0}",
    title: "My kitchen is being renovated",
    subtitle: "Keep cooking through your remodel with a temporary setup",
    value: "renovation",
  },
  {
    icon: "\u{1F4A7}",
    title: "Flood, fire, or water damage",
    subtitle: "Emergency solutions available — many delivered within 24 hours",
    value: "flood_fire_damage",
  },
  {
    icon: "\u{1F4CB}",
    title: "I'm making an insurance claim",
    subtitle: "Your insurer may cover the full cost — we'll help you find out",
    value: "insurance_claim",
  },
  {
    icon: "\u{1F3EB}",
    title: "School or hospital refurbishment",
    subtitle: "Keep feeding hundreds of people while your main kitchen is offline",
    value: "school_hospital_refurb",
  },
  {
    icon: "\u{1F3AA}",
    title: "Event or festival catering",
    subtitle: "From intimate gatherings to large-scale festivals",
    value: "event_festival",
  },
  {
    icon: "\u{1F3D7}\u{FE0F}",
    title: "Construction site or temporary facility",
    subtitle: "Self-contained units that work off-grid on remote sites",
    value: "construction_site",
  },
  {
    icon: "\u{1F373}",
    title: "Restaurant refurbishment",
    subtitle: "Stay open and trading while your kitchen is rebuilt",
    value: "restaurant_refurb",
  },
  {
    icon: "\u{2753}",
    title: "Something else",
    subtitle: "We'll help you work out what you need",
    value: "other",
  },
];

export default function SituationWizard() {
  const router = useRouter();

  const handleSelect = (situation: string) => {
    router.push(`/get-quotes?situation=${encodeURIComponent(situation)}`);
  };

  return (
    <section id="wizard" className="py-16 sm:py-20 bg-slate-50">
      <div className="container-page">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            What&apos;s happened?
          </h2>
          <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
            Tell us your situation and we&apos;ll guide you to the right temporary
            kitchen solution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {situations.map((s) => (
            <button
              key={s.value}
              onClick={() => handleSelect(s.value)}
              className="group flex flex-col items-start rounded-xl border-2 border-slate-200 bg-white p-5 text-left transition-all hover:border-primary-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <span className="text-3xl mb-3">{s.icon}</span>
              <h3 className="font-semibold text-slate-800 group-hover:text-primary-700 transition-colors">
                {s.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                {s.subtitle}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
