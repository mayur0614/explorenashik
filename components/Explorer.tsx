"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CHIP, type Place } from "@/data/places";
import { useSaved } from "@/lib/favorites";

export default function Explorer({ places }: { places: Place[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState<"near" | "az">("near");
  const [onlySaved, setOnlySaved] = useState(false);
  const { saved, toggle } = useSaved();
  const categories = useMemo(() => Array.from(new Set(places.map((p) => p.category))).sort(), [places]);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return places
      .filter((p) => cat === "All" || p.category === cat)
      .filter((p) => !onlySaved || saved.includes(p.slug))
      .filter((p) => !t || [p.name, p.mr ?? "", p.tagline, p.category, ...(p.tags ?? [])].join(" ").toLowerCase().includes(t))
      .sort((a, b) => (sort === "near" ? a.distanceKm - b.distanceKm : a.name.localeCompare(b.name)));
  }, [places, q, cat, sort, onlySaved, saved]);

  const pill = (on: boolean) =>
    `rounded-full border border-ink px-4 py-1.5 text-sm font-semibold transition-colors ${on ? "bg-ink text-paper" : "hover:bg-ink/10"}`;

  return (
    <section>
      <label htmlFor="q" className="sr-only">Search places</label>
      <input
        id="q" value={q} onChange={(e) => setQ(e.target.value)} type="search"
        placeholder="Search a place, a river, a trek, a wine…"
        className="w-full border-b-4 border-ink bg-transparent py-4 font-display text-2xl outline-none placeholder:text-ink/40 sm:text-4xl"
      />
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {["All", ...categories].map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={pill(cat === c)}>{c}</button>
        ))}
        <button onClick={() => setOnlySaved((v) => !v)} aria-pressed={onlySaved} className={pill(onlySaved) + " ml-0 sm:ml-4"}>
          My trip ({saved.length})
        </button>
        <select
          value={sort} onChange={(e) => setSort(e.target.value as "near" | "az")} aria-label="Sort places"
          className="ml-auto rounded-full border border-ink bg-transparent px-3 py-1.5 text-sm font-semibold"
        >
          <option value="near">Nearest first</option>
          <option value="az">A to Z</option>
        </select>
      </div>

      <p className="mt-6 text-sm text-ink/70" aria-live="polite">{list.length} places</p>
      {list.length === 0 && (
        <p className="mt-6 text-lg">
          {onlySaved ? "Nothing saved yet. Tap the heart on any place to add it to your trip." : "No place matches that search. Clear the filters to see all places."}
        </p>
      )}
      <ul className="mt-2 divide-y divide-ink/20 border-t border-ink/20">
        {list.map((p) => (
          <li key={p.slug} className="group relative">
            <Link href={`/places/${p.slug}`} className="flex items-center gap-4 py-5 pr-14 transition-colors group-hover:bg-white/60 sm:gap-8">
              <span lang={p.mr ? "mr" : "en"} className="w-28 shrink-0 text-2xl font-semibold leading-tight text-river sm:w-56 sm:text-4xl">{p.mr ?? p.category}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-xl font-semibold sm:text-2xl">{p.name}</span>
                <span className="block text-ink/75">{p.tagline}</span>
                <span className="mt-2 flex items-center gap-3 text-sm">
                  <span className={`rounded px-2 py-0.5 font-semibold ${CHIP[p.category]}`}>{p.category}</span>
                  <span>{p.distanceKm} km from the city</span>
                </span>
              </span>
            </Link>
            <button
              onClick={() => toggle(p.slug)} aria-pressed={saved.includes(p.slug)}
              aria-label={`${saved.includes(p.slug) ? "Remove" : "Save"} ${p.name}`}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-2xl text-grape"
            >
              {saved.includes(p.slug) ? "♥" : "♡"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
