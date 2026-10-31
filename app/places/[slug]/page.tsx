import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SaveButton from "@/components/SaveButton";
import { CHIP } from "@/data/places";
import { getPlace, getPlaces } from "@/lib/places";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPlaces()).places.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPlace((await params).slug);
  return p ? { title: p.name, description: p.tagline } : {};
}

export default async function PlacePage({ params }: Props) {
  const { slug } = await params;
  const p = await getPlace(slug);
  if (!p) notFound();
  const { places } = await getPlaces();
  const more = places.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  const facts: [string, string][] = [["Distance", `${p.distanceKm} km`]];
  if (p.bestSeason) facts.push(["Best time", p.bestSeason]);
  if (p.timeNeeded) facts.push(["Time needed", p.timeNeeded]);

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 sm:py-16">
      <Link href="/" className="font-semibold underline underline-offset-4">All places</Link>
      {p.mr && <p lang="mr" className="mt-10 text-5xl font-semibold text-river sm:text-7xl">{p.mr}</p>}
      <h1 className={`${p.mr ? "mt-2" : "mt-10"} font-display text-4xl font-bold sm:text-6xl`}>{p.name}</h1>
      <p className="mt-4 text-xl">{p.tagline}</p>
      <span className={`mt-4 inline-block rounded px-2 py-0.5 text-sm font-semibold ${CHIP[p.category]}`}>{p.category}</span>

      <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y border-ink/20 py-5 text-sm">
        {facts.map(([k, v]) => (
          <div key={k}><dt className="text-ink/70">{k}</dt><dd className="text-lg font-semibold">{v}</dd></div>
        ))}
      </dl>

      {p.address && <p className="mt-8 text-lg">{p.address}</p>}
      {p.description && <p className="mt-6 max-w-prose text-lg leading-relaxed">{p.description}</p>}
      {p.highlights && (
        <>
          <h2 className="mt-8 font-display text-2xl font-semibold">What to see</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-lg">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
        </>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`} target="_blank" rel="noopener noreferrer"
          className="rounded-full bg-river px-5 py-2 font-semibold text-white hover:bg-river/90"
        >Open in Google Maps</a>
        {p.website && (
          <a href={p.website} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink px-5 py-2 font-semibold hover:bg-ink/10">Website</a>
        )}
        <SaveButton slug={p.slug} />
      </div>

      {more.length > 0 && (
        <>
          <h2 className="mt-14 font-display text-2xl font-semibold">More {p.category.toLowerCase()} places</h2>
          <ul className="mt-3 space-y-2 text-lg">
            {more.map((m) => <li key={m.slug}><Link className="underline underline-offset-4" href={`/places/${m.slug}`}>{m.name}</Link></li>)}
          </ul>
        </>
      )}
      <p className="mt-16 border-t border-ink/20 pt-6 text-sm text-ink/70">
        Place data © <a className="underline" href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, via <a className="underline" href="https://www.geoapify.com/">Geoapify</a>.
      </p>
    </main>
  );
}
