import { cache } from "react";
import { fallbackPlaces, type Category, type Place } from "@/data/places";

// Nashik city centre. Every search is a radius around this point.
const CENTER = { lat: 19.9975, lon: 73.7898 };

const QUERIES: { category: Category; categories: string; radius: number; limit: number }[] = [
  { category: "Temple", categories: "religion.place_of_worship", radius: 70000, limit: 60 },
  { category: "Heritage", categories: "tourism.sights,heritage", radius: 70000, limit: 60 },
  { category: "Nature", categories: "natural,tourism.attraction.viewpoint", radius: 70000, limit: 40 },
  { category: "Trek", categories: "natural.mountain", radius: 70000, limit: 40 },
  { category: "Museum", categories: "entertainment.museum", radius: 30000, limit: 20 },
];

const DEVANAGARI = /[\u0900-\u097F]/;

const km = (lat: number, lon: number) => {
  const r = (d: number) => (d * Math.PI) / 180;
  const a = Math.sin(r(lat - CENTER.lat) / 2) ** 2 +
    Math.cos(r(CENTER.lat)) * Math.cos(r(lat)) * Math.sin(r(lon - CENTER.lon) / 2) ** 2;
  return Math.round(12742 * Math.asin(Math.sqrt(a)) * 10) / 10;
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/* eslint-disable @typescript-eslint/no-explicit-any */
export function featureToPlace(f: any, category: Category): Place | null {
  const p = f?.properties;
  const [lon, lat] = f?.geometry?.coordinates ?? [];
  if (!p?.name || typeof lat !== "number" || typeof lon !== "number") return null;
  const intl = p.name_international ?? {};
  const isDev = DEVANAGARI.test(p.name);
  const raw = p.datasource?.raw;
  const slug = raw?.osm_id ? `${raw.osm_type ?? "x"}${raw.osm_id}` : slugify(p.name) || String(p.place_id).slice(0, 12);
  return {
    slug,
    name: intl.en ?? p.name,
    mr: intl.mr ?? (isDev ? p.name : undefined),
    category,
    tagline: p.address_line2 || p.formatted || "Nashik region",
    address: p.formatted,
    website: typeof p.website === "string" ? p.website : undefined,
    distanceKm: km(lat, lon),
    lat, lng: lon,
    tags: (p.categories ?? []).filter((c: string) => c.includes(".")).map((c: string) => c.split(".").slice(-1)[0]),
    source: "live",
  };
}

async function fetchCategory(q: (typeof QUERIES)[number], key: string): Promise<Place[]> {
  const url = new URL("https://api.geoapify.com/v2/places");
  url.search = new URLSearchParams({
    categories: q.categories,
    filter: `circle:${CENTER.lon},${CENTER.lat},${q.radius}`,
    bias: `proximity:${CENTER.lon},${CENTER.lat}`,
    limit: String(q.limit),
    apiKey: key,
  }).toString();
  const res = await fetch(url, { next: { revalidate: 86400 }, signal: AbortSignal.timeout(10000) });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.features ?? []).map((f: unknown) => featureToPlace(f, q.category)).filter(Boolean) as Place[];
}

// Server-only. The API key never reaches the browser.
export const getPlaces = cache(async (): Promise<{ places: Place[]; live: boolean }> => {
  const key = process.env.GEOAPIFY_API_KEY;
  if (key) {
    try {
      const groups = await Promise.all(QUERIES.map((q) => fetchCategory(q, key)));
      const seen = new Set<string>();
      const places = groups.flat().filter((p) => (seen.has(p.slug) ? false : seen.add(p.slug)));
      if (places.length) return { places, live: true };
    } catch {
      /* fall through to sample data */
    }
  }
  return { places: fallbackPlaces.map((p) => ({ ...p, source: "sample" as const })), live: false };
});

export async function getPlace(slug: string) {
  return (await getPlaces()).places.find((p) => p.slug === slug);
}
