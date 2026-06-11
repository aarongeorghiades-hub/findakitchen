"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";

// Facts assembled ONLY from existing site content (kitchen_types table +
// /compare prose pages) and the canonical pricing rule. Where a specific
// figure isn't available for a type, we hedge honestly ("varies by provider")
// rather than inventing one. Types only — no providers are named here.
type TypeId = "driveway-pod" | "indoor-capsule" | "container-kitchen" | "trailer-kitchen";

interface KitchenType {
  id: TypeId;
  name: string;
  emoji: string;
  tagline: string;
  ctaLabel: string; // aria-label for the per-column CTA
  cells: Record<RowKey, ReactNode>;
}

type RowKey =
  | "whatItIs"
  | "whereItGoes"
  | "space"
  | "household"
  | "appliances"
  | "power"
  | "install"
  | "cost"
  | "bestFor"
  | "watchOuts";

const ROWS: { key: RowKey; label: string }[] = [
  { key: "whatItIs", label: "What it is" },
  { key: "whereItGoes", label: "Where it goes" },
  { key: "space", label: "Space / footprint" },
  { key: "household", label: "Suitable household" },
  { key: "appliances", label: "Appliances included" },
  { key: "power", label: "Power & water" },
  { key: "install", label: "Install & removal" },
  { key: "cost", label: "Typical cost" },
  { key: "bestFor", label: "Best for" },
  { key: "watchOuts", label: "Watch-outs" },
];

const TYPES: KitchenType[] = [
  {
    id: "driveway-pod",
    name: "Driveway Pod",
    emoji: "\u{1F69A}",
    tagline: "Delivered to your driveway",
    ctaLabel: "Get quotes for a driveway pod",
    cells: {
      whatItIs:
        "A fully equipped kitchen delivered to your driveway or garden while your own kitchen is out of action.",
      whereItGoes: "Outside, on your driveway or garden.",
      space:
        "A driveway or garden space. Compact pods suit tighter spots and narrow access — some fit through a standard garden gate.",
      household:
        "Family household. Large pods suit families of 4+; compact pods suit couples and smaller households.",
      appliances:
        "Large pods: fridge-freezer, oven or hob, microwave, kettle, toaster, sink with hot & cold water, worktop and storage. Compact pods carry the essentials in a smaller footprint.",
      power: "Connects to your home's mains electricity and water (some hobs run on LPG).",
      install:
        "Delivered by lorry and placed in position, typically within 24–48 hours. Low disruption.",
      cost: (
        <>
          <strong>£350–800/week</strong> (£70–150/day), delivery &amp;
          collection included. Broadly similar across pod sizes; varies by size
          and provider.
        </>
      ),
      bestFor:
        "A kitchen renovation, extension or insurance repair when you have driveway or garden space.",
      watchOuts: (
        <>
          You go outside to cook, and you need suitable space and access. Check
          the fit first with the{" "}
          <Link href="/tools/driveway-fit-checker" className="text-[var(--clay)] underline underline-offset-2 hover:text-[var(--charcoal)]">
            Driveway Fit Checker
          </Link>
          .
        </>
      ),
    },
  },
  {
    id: "indoor-capsule",
    name: "Indoor Capsule",
    emoji: "\u{1F3E0}",
    tagline: "Installed inside your home",
    ctaLabel: "Get quotes for an indoor capsule kitchen",
    cells: {
      whatItIs:
        "A pop-up kitchen carried in and assembled inside your home — no driveway needed, no going outside.",
      whereItGoes: "Indoors — a living room, dining room or spare room.",
      space:
        "An internal room. Carried through your front door, so no outdoor space is required at all.",
      household:
        "Family household. Ideal for flats, apartments and homes with no driveway.",
      appliances:
        "Microwave, mini fridge, kettle, toaster and a portable hob, with a built-in splashback and sink.",
      power: "Runs off standard household power — all-electric, with no outdoor connection.",
      install: "Carried in and assembled in around 2 hours. Very low disruption.",
      cost: (
        <>
          Broadly similar to a driveway pod — about{" "}
          <strong>£350–800/week</strong> (£70–150/day), delivery &amp;
          collection included; varies by provider.
        </>
      ),
      bestFor:
        "Homes with no driveway, flats and apartments, or anyone who would rather not go outside to cook — handy in winter.",
      watchOuts:
        "Takes up an internal room for the duration, and the worktop and appliance set is smaller than a large driveway pod.",
    },
  },
  {
    id: "container-kitchen",
    name: "Container Kitchen",
    emoji: "\u{1F4E6}",
    tagline: "Self-contained, off-grid capable",
    ctaLabel: "Get quotes for a container kitchen",
    cells: {
      whatItIs:
        "A converted shipping container fitted out as a complete kitchen — self-contained and able to run off-grid.",
      whereItGoes: "Outside, on firm, level ground with crane access.",
      space:
        "Room for a 20–40ft unit on firm, level ground, plus space for crane delivery.",
      household:
        "More commonly a commercial unit (around 200–600 meals/day) — suits larger or longer requirements rather than a typical home.",
      appliances:
        "Full cooking line, extraction, refrigeration and hot & cold water. Exact fit-out varies by provider.",
      power:
        "Can run off-grid — many have a built-in generator, water tank and waste system — or connect to mains.",
      install: "Craned into position; allow 1–2 days. Needs crane access.",
      cost: "Commercial-scale pricing — usually more than a domestic pod. Varies by provider; confirm directly.",
      bestFor:
        "Off-grid, remote or emergency situations, or larger/longer needs where mains aren't easily available.",
      watchOuts:
        "Needs crane access and firm, level ground, and is usually more than a single household requires.",
    },
  },
  {
    id: "trailer-kitchen",
    name: "Trailer Kitchen",
    emoji: "\u{1F3D5}\u{FE0F}",
    tagline: "Towable, no crane needed",
    ctaLabel: "Get quotes for a trailer kitchen",
    cells: {
      whatItIs:
        "A towable, self-contained kitchen on a chassis that can be moved between sites without a crane.",
      whereItGoes: "Outside, on level ground; towed into position.",
      space: "Level ground with towing access. No crane required.",
      household:
        "Commercial-scale (around 100–500 meals/day) — more common for events and multi-site catering than for homes.",
      appliances:
        "Full cooking equipment and extraction. Exact fit-out varies by provider.",
      power: "Connects to mains utilities or runs from a generator.",
      install: "Towed in and set up the same day. No crane.",
      cost: "Commercial-scale pricing — varies by provider; confirm directly.",
      bestFor:
        "Situations needing a unit that can move between sites — more often events or commercial use than a home renovation.",
      watchOuts:
        "Event- and commercial-oriented; needs towing access and level ground, and is rarely the right fit for a home renovation.",
    },
  },
];

const DEFAULT_MOBILE: TypeId[] = ["driveway-pod", "indoor-capsule"];

export function CompareKitchenTypesClient() {
  // Selection only governs the MOBILE view (pick 2 to compare). On md+ every
  // column is shown regardless, so the full comparison is always in the DOM.
  const [mobileSelected, setMobileSelected] = useState<TypeId[]>(DEFAULT_MOBILE);

  function toggleMobile(id: TypeId) {
    setMobileSelected((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev; // keep at least one
        return prev.filter((x) => x !== id);
      }
      const next = [...prev, id];
      while (next.length > 2) next.shift(); // keep the two most-recent picks
      return next;
    });
  }

  // Hidden on mobile when not selected; always visible from md up.
  const visClass = (id: TypeId) =>
    mobileSelected.includes(id) ? "table-cell" : "hidden md:table-cell";

  return (
    <div>
      {/* Mobile "pick 2 to compare" control */}
      <div className="md:hidden mb-4">
        <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
          Pick 2 to compare
        </p>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => {
            const on = mobileSelected.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => toggleMobile(t.id)}
                aria-pressed={on}
                className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                  on
                    ? "bg-[var(--clay)] text-white border-[var(--clay)]"
                    : "bg-white text-[var(--warm-mid)] border-[var(--border)]"
                }`}
              >
                <span aria-hidden="true" className="mr-1">
                  {t.emoji}
                </span>
                {t.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-white">
        <table className="w-full border-collapse text-left align-top">
          <caption className="sr-only">
            Side-by-side comparison of temporary kitchen types: driveway pod,
            indoor capsule, container kitchen and trailer kitchen.
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 z-20 bg-[var(--cream)] border-b border-[var(--border)] p-3 sm:p-4 text-xs uppercase tracking-wider text-[var(--muted)] font-medium align-bottom min-w-[7.5rem] w-[34%] md:w-[16%]"
              >
                Compare
              </th>
              {TYPES.map((t) => (
                <th
                  key={t.id}
                  scope="col"
                  className={`${visClass(
                    t.id
                  )} border-b border-l border-[var(--border)] p-3 sm:p-4 align-bottom`}
                >
                  <span aria-hidden="true" className="text-2xl block mb-1">
                    {t.emoji}
                  </span>
                  <span className="font-serif text-base sm:text-lg text-[var(--charcoal)] block leading-tight">
                    {t.name}
                  </span>
                  <span className="text-xs text-[var(--muted)] block mt-0.5">
                    {t.tagline}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={row.key} className={i % 2 === 1 ? "bg-[var(--cream)]/40" : ""}>
                <th
                  scope="row"
                  className={`sticky left-0 z-10 ${
                    i % 2 === 1 ? "bg-[#F4EFE7]" : "bg-white"
                  } border-b border-[var(--border)] p-3 sm:p-4 text-sm font-medium text-[var(--warm-mid)] align-top min-w-[7.5rem] w-[34%] md:w-[16%]`}
                >
                  {row.label}
                </th>
                {TYPES.map((t) => (
                  <td
                    key={t.id}
                    className={`${visClass(
                      t.id
                    )} border-b border-l border-[var(--border)] p-3 sm:p-4 text-sm text-[var(--warm-mid)] leading-relaxed align-top`}
                  >
                    {t.cells[row.key]}
                  </td>
                ))}
              </tr>
            ))}
            {/* CTA row */}
            <tr>
              <th
                scope="row"
                className="sticky left-0 z-10 bg-white p-3 sm:p-4 text-sm font-medium text-[var(--warm-mid)] align-top min-w-[7.5rem] w-[34%] md:w-[16%]"
              >
                Next step
              </th>
              {TYPES.map((t) => (
                <td
                  key={t.id}
                  className={`${visClass(
                    t.id
                  )} border-l border-[var(--border)] p-3 sm:p-4 align-top`}
                >
                  <Link
                    href="/get-quotes"
                    aria-label={t.ctaLabel}
                    className="inline-flex items-center justify-center text-center text-sm bg-[var(--clay)] text-white px-4 py-2.5 rounded-full hover:bg-[var(--clay-light)] transition-colors w-full"
                  >
                    Get quotes &rarr;
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-[var(--muted)] mt-3">
        Specifics vary by provider — always confirm details directly. Hire
        is often covered by your insurance when your kitchen loss is an
        insurance claim (flood, fire or escape of water) — check your policy.
      </p>
    </div>
  );
}
