export type HeritageSite = { id: number; name: string; location: string; description: string; year: number };

// The public dataset is mostly generated placeholder text. Drop entries that read as Latin filler.
const FILLER = /\b(dolor|quia|quos|eum|nam|sunt|aut|vel|illo|ipsa|ipsum|eius|iusto|quae|neque|nemo|quas|eos)\b/i;

export async function getHeritageSites(state = "Maharashtra"): Promise<HeritageSite[]> {
  const base = process.env.HERITAGE_API_URL ?? "https://indian-heritage-api.onrender.com";
  try {
    // The free host can take a while to wake up, so give it a generous timeout.
    const res = await fetch(`${base}/sites/`, { next: { revalidate: 86400 }, signal: AbortSignal.timeout(15000) });
    if (!res.ok) return [];
    const all = (await res.json()) as Array<{ id: number; name: string; location: string; state: string; description: string; established_year: number }>;
    return all
      .filter((s) => s.state === state && !FILLER.test(s.description) && !FILLER.test(s.name))
      .map((s) => ({ id: s.id, name: s.name, location: s.location, description: s.description, year: s.established_year }));
  } catch {
    return [];
  }
}
