interface TrustSignalsProps {
  providerCount: number;
}

const signals = [
  {
    icon: (
      <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    label: "providers nationwide",
    usesCount: true,
  },
  {
    icon: (
      <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Covering commercial & domestic needs",
    usesCount: false,
  },
  {
    icon: (
      <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "From 24-hour emergency to long-term hire",
    usesCount: false,
  },
  {
    icon: (
      <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Free, no-obligation quotes",
    usesCount: false,
  },
];

export default function TrustSignals({ providerCount }: TrustSignalsProps) {
  return (
    <section className="py-12 sm:py-16 border-b border-slate-100">
      <div className="container-page">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {signals.map((signal, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary-50">
                {signal.icon}
              </div>
              <p className="text-sm sm:text-base font-medium text-slate-700">
                {signal.usesCount && (
                  <span className="text-2xl font-bold text-primary-700 block mb-1">
                    {providerCount > 0 ? providerCount : "Growing network of"}
                  </span>
                )}
                {signal.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
