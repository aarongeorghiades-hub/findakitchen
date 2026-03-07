"use client";

const filters = [
  { key: "all", label: "All providers" },
  { key: "domestic", label: "\u{1F3E0} Domestic" },
  { key: "commercial", label: "\u{1F3D7}\u{FE0F} Commercial" },
  { key: "insurance", label: "\u{1F512} Insurance-ready" },
  { key: "electric", label: "\u26A1 Electric only" },
];

export function FilterBar({
  activeFilter,
  onFilter,
  sticky = false,
}: {
  activeFilter: string;
  onFilter: (key: string) => void;
  sticky?: boolean;
}) {
  return (
    <div
      className={`${
        sticky ? "sticky top-[72px] z-40" : ""
      } backdrop-blur-md bg-[rgba(242,237,229,0.88)] rounded-full border border-[var(--border)] p-1.5 inline-flex flex-wrap gap-1`}
    >
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onFilter(f.key)}
          className={`text-sm px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
            activeFilter === f.key
              ? "bg-[var(--charcoal)] text-white"
              : "text-[var(--warm-mid)] hover:text-[var(--charcoal)]"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
