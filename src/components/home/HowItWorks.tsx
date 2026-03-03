const steps = [
  {
    number: "1",
    title: "Tell us your situation",
    description:
      "Are you a homeowner mid-renovation? A school that needs to keep feeding students? An insurer arranging emergency cover? Select your situation and we'll narrow down the options.",
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "We match you with the right providers",
    description:
      "Based on your needs, location, and timeline, we identify the providers who can actually help — not a generic list, but targeted matches for your exact situation.",
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Get quotes and compare",
    description:
      "Receive no-obligation quotes from matched providers. Compare options, ask questions, and choose the solution that's right for you — at the right price.",
    icon: (
      <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            How it works
          </h2>
          <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
            Finding the right temporary kitchen doesn&apos;t have to be complicated.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary-700">
                {step.icon}
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-0 flex h-7 w-7 items-center justify-center rounded-full bg-accent-500 text-sm font-bold text-white">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
