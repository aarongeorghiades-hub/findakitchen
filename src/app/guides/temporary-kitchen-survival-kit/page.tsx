import { Metadata } from "next";
import Link from "next/link";
import CTABanner from "@/components/shared/CTABanner";

// ---------------------------------------------------------------------------
// Affiliate links. Every "Check price on Amazon" button reads its href from
// this map. Values are intentionally empty until the real Amazon SiteStripe
// affiliate URLs are pasted in — until then each button renders disabled so we
// never ship a broken or guessed link. Do NOT hardcode product URLs or ASINs.
// ---------------------------------------------------------------------------
const AFFILIATE_LINKS: Record<string, string> = {
  inductionHob: "", // TODO: Aaron to paste Amazon SiteStripe affiliate URL
  airFryer: "", // TODO: Aaron to paste Amazon SiteStripe affiliate URL
  kettle: "", // TODO: Aaron to paste Amazon SiteStripe affiliate URL
  miniFridge: "", // TODO: Aaron to paste Amazon SiteStripe affiliate URL
  microwave: "", // TODO: Aaron to paste Amazon SiteStripe affiliate URL
  slowCooker: "", // TODO: Aaron to paste Amazon SiteStripe affiliate URL
  dishwasher: "", // TODO: Aaron to paste Amazon SiteStripe affiliate URL
  toaster: "", // TODO: Aaron to paste Amazon SiteStripe affiliate URL
};

// Non-public for now: keep it out of the index until the affiliate links are in.
export const metadata: Metadata = {
  title: "Temporary Kitchen Survival Kit: How to Cook During a Renovation",
  description:
    "The countertop kit that makes cooking through a kitchen renovation or insurance repair bearable when you're not hiring a full pod — what to get, and how to set it up safely.",
  robots: { index: false },
};

type Product = {
  key: keyof typeof AFFILIATE_LINKS;
  name: string;
  why: string;
};

const ESSENTIALS: Product[] = [
  {
    key: "inductionHob",
    name: "Twin / double portable induction hob",
    why: "Your main cooking surface. Two zones let you boil and fry at the same time, and there's no gas to plumb in — it runs off a wall socket and heats fast.",
  },
  {
    key: "airFryer",
    name: "Large air fryer (ideally dual-basket)",
    why: "Your stand-in oven. It roasts, bakes and reheats, and a dual-basket model cooks two things at once — enough to put a proper meal on the table without a real oven.",
  },
  {
    key: "kettle",
    name: "Electric kettle",
    why: "Hot drinks, obviously — but also the fastest way to get hot water for cooking pasta, rice or anything you'd normally start on the hob.",
  },
  {
    key: "miniFridge",
    name: "Mini / under-counter fridge",
    why: "Cold storage for the weeks your main fridge is disconnected. Keeps milk, leftovers and a few days' food to hand so you're not living out of a cool box.",
  },
];

const NICE_TO_HAVE: Product[] = [
  {
    key: "microwave",
    name: "Microwave",
    why: "Fast reheating and simple cooking — steaming veg, warming leftovers, or a quick jacket potato when you don't want to wait on the air fryer.",
  },
  {
    key: "slowCooker",
    name: "Slow cooker or multi-cooker",
    why: "Set-and-forget meals. Load it in the morning and dinner cooks itself, which frees up your single hob for everything else.",
  },
  {
    key: "dishwasher",
    name: "Countertop (tank-fill) dishwasher",
    why: "Washing up without plumbing. The tank-fill type just needs filling by hand, so you can keep on top of dishes even with the sink out of action.",
  },
  {
    key: "toaster",
    name: "Toaster or sandwich maker",
    why: "Quick breakfasts and lunches that don't tie up the hob — toast, paninis and toasties when you just need to feed people fast.",
  },
];

function ProductCard({ product }: { product: Product }) {
  const href = AFFILIATE_LINKS[product.key];
  const hasLink = href.trim().length > 0;

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-[var(--charcoal)] mb-2">
        {product.name}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed flex-1">
        {product.why}
      </p>
      {hasLink ? (
        <a
          href={href}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-[var(--clay)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--clay-light)]"
        >
          Check price on Amazon
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="mt-5 inline-flex cursor-not-allowed items-center justify-center rounded-full bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-400"
        >
          Check price on Amazon
        </span>
      )}
    </div>
  );
}

export default function SurvivalKitPage() {
  return (
    <>
      {/* Hero — mirrors the DB guide hero styling */}
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
            <Link href="/guides" className="hover:text-white/60 transition-colors">
              Guides
            </Link>
            <span>/</span>
            <span className="text-white/60 truncate max-w-xs">
              Temporary Kitchen Survival Kit
            </span>
          </nav>
          <p className="text-xs uppercase tracking-widest text-[var(--clay-light)] mb-4">
            Guide
          </p>
          <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-5">
            Temporary Kitchen Survival Kit: How to Cook During a Renovation
          </h1>
          <p className="text-lg text-white/50 font-light leading-relaxed max-w-2xl">
            When your kitchen is out of action and you&apos;re not hiring a full
            pod, the right countertop kit is the difference between weeks of
            takeaways and actually cooking for your family.
          </p>
        </div>
      </section>

      <div className="container-page py-10">
        <article className="max-w-3xl">
          {/* Affiliate disclosure — both lines required, visible up top */}
          <div className="mb-10 rounded-lg border border-slate-200 bg-[var(--cream)] p-4 text-sm text-slate-600">
            <p>
              This page contains affiliate links. If you buy through them we may
              earn a small commission, and you pay no more than you would
              otherwise.
            </p>
            <p className="mt-2">
              As an Amazon Associate, FindAKitchen earns from qualifying
              purchases.
            </p>
          </div>

          {/* Intro */}
          <div className="prose prose-slate prose-lg max-w-none">
            <p>
              Whether you&apos;re mid-renovation or waiting on an insurance
              repair, going without a kitchen is harder than most people expect.
              The fridge is unplugged, the hob&apos;s gone, and the kettle is
              living on a dusty worktop somewhere. If hiring a full temporary
              kitchen pod isn&apos;t the right fit for your situation, the good
              news is that a handful of well-chosen countertop appliances can
              cover almost everything a real kitchen does — you just need the
              right ones, set up sensibly.
            </p>
            <p>
              Below is the kit we&apos;d actually buy, split into the essentials
              that do the heavy lifting and the nice-to-haves that make life
              easier — followed by the bit most lists skip: how to run it all
              safely without tripping your electrics.
            </p>
          </div>

          {/* Essentials */}
          <h2 className="mt-12 mb-2 text-2xl font-bold text-[var(--charcoal)]">
            The essentials
          </h2>
          <p className="mb-6 text-slate-600">
            Four appliances that, between them, replace the hob, oven and fridge.
            If you buy nothing else, buy these.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ESSENTIALS.map((product) => (
              <ProductCard key={product.key} product={product} />
            ))}
          </div>

          {/* Nice to have */}
          <h2 className="mt-14 mb-2 text-2xl font-bold text-[var(--charcoal)]">
            Nice to have
          </h2>
          <p className="mb-6 text-slate-600">
            Not strictly necessary, but each one takes real pressure off your
            single hob and makes the weeks ahead more bearable.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {NICE_TO_HAVE.map((product) => (
              <ProductCard key={product.key} product={product} />
            ))}
          </div>

          {/* Setting it up safely */}
          <h2 className="mt-14 mb-4 text-2xl font-bold text-[var(--charcoal)]">
            Setting it up safely
          </h2>
          <div className="prose prose-slate prose-lg max-w-none">
            <h3>Power: don&apos;t overload one socket</h3>
            <p>
              This is the mistake that catches people out. An induction hob, a
              large air fryer and a kettle can each pull well over 2,000 watts.
              Run two or three of them from the same socket or a single extension
              lead and you can easily exceed what a 13A socket is rated for —
              which trips the breaker at best, and overheats the lead at worst.
              Spread your high-wattage appliances across separate wall sockets on
              different circuits where you can, and avoid daisy-chaining extension
              leads.
            </p>
            <h3>Water: set up near a source</h3>
            <p>
              If you have the choice, site your kit near a working water supply —
              a utility room or bathroom is ideal. Keep a couple of large
              containers on hand for filling pans and rinsing up, so you&apos;re
              not trekking back and forth for every task.
            </p>
            <h3>Where to put it</h3>
            <p>
              A sturdy table in a dining room, utility or garage works well —
              somewhere with a bit of space and, ideally, away from the building
              dust if work is ongoing. Cover the appliances when they&apos;re not
              in use so they don&apos;t get coated in debris.
            </p>
            <h3>Food and waste</h3>
            <p>
              Lean into simple one-pan and one-basket meals — they cut down on
              washing up and play to the strengths of this kind of setup. And
              plan for rubbish: with the kitchen out of action your usual bin
              routine goes out the window, so keep bags handy and clear waste
              often.
            </p>
          </div>

          {/* Closing funnel CTA — conditional, complements rather than undercuts */}
          <div className="prose prose-slate prose-lg max-w-none mt-12">
            <h2>When a kitchen pod makes more sense</h2>
            <p>
              A countertop kit is a great fix for a few weeks. But if your
              kitchen is going to be out for longer, or you&apos;re dealing with
              an insurance claim, a full temporary kitchen pod — with a real
              oven, hob, sink and fridge-freezer — can be the more comfortable
              way through. The cost of a pod is often covered as part of a claim,
              so it&apos;s worth checking your policy before you rule it out.
            </p>
          </div>
        </article>
      </div>

      <CTABanner
        headline="Think a full kitchen pod might suit you better?"
        subline="Tell us your situation and we'll match you with the right providers — free, no-obligation quotes."
      />
    </>
  );
}
