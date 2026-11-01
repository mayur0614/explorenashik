import Image from "next/image";
import Explorer from "@/components/Explorer";
import { getPlaces } from "@/lib/places";
import LanguageSelector from "@/components/LanguageSelector";

export default async function Home() {
  const { places, live } = await getPlaces();
  return (
    <main className="mx-auto max-w-5xl px-5 py-6 sm:py-10">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/20 pb-4">
        <a href="#home" className="font-display text-lg font-bold tracking-wide">NASHIK <span className="text-saffron">✦</span> GODAVARI</a>
        <LanguageSelector />
      </header>
      <section id="home" className="kumbh-hero relative mt-7 overflow-hidden rounded-sm px-6 py-14 text-paper sm:px-12 sm:py-20">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#ffd58c]">A river city, a sacred gathering</p>
          <h1 className="font-display text-6xl font-bold leading-none sm:text-8xl">Explore Nashik</h1>
          <p className="mt-6 max-w-xl text-lg sm:text-xl">
            Follow the Godavari through the living heritage of Simhastha Kumbh: from Ramkund and Panchavati to Trimbakeshwar, hill trails and vineyards.
          </p>
          <a href="#explore" className="mt-8 inline-flex rounded-full bg-saffron px-6 py-3 font-bold text-ink transition hover:bg-[#f5bd63]">Explore the city ↓</a>
        </div>
        <span aria-hidden="true" className="hero-ornament">ॐ</span>
      </section>
      <section className="mt-8 grid gap-5 sm:grid-cols-2" aria-label="Nashik in pictures">
        <figure className="overflow-hidden rounded-sm border border-ink/15 bg-white/50">
          <div className="relative aspect-[16/10]">
            <Image src="/images/ramkund.webp" alt="The Godavari river and ghats at Ramkund in Nashik" fill priority sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
          </div>
          <figcaption className="p-4">
            <h2 className="font-display text-xl font-semibold">Ramkund &amp; the Godavari</h2>
            <p className="mt-1 text-sm text-ink/70">
              Photo by <a className="underline" href="https://commons.wikimedia.org/wiki/File:Ramkund,nashik_(2).jpg" target="_blank" rel="noreferrer">K. Venkataramana</a> · CC0
            </p>
          </figcaption>
        </figure>
        <figure className="overflow-hidden rounded-sm border border-ink/15 bg-white/50">
          <div className="relative aspect-[16/10]">
            <Image src="/images/trimbakeshwar.webp" alt="The stone temple at Trimbakeshwar near Nashik" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
          </div>
          <figcaption className="p-4">
            <h2 className="font-display text-xl font-semibold">Trimbakeshwar Temple</h2>
            <p className="mt-1 text-sm text-ink/70">
              Photo by <a className="underline" href="https://commons.wikimedia.org/wiki/File:Trimbakeshwar_Shiva_Temple,_Trimbak,_Nashik_District,_Maharastra_(2).jpg" target="_blank" rel="noreferrer">K. Venkataramana</a> · CC0
            </p>
          </figcaption>
        </figure>
      </section>
      {!live && process.env.NODE_ENV !== "production" && (
        <p className="mt-6 border-l-4 border-saffron pl-3 text-sm">
          Showing the bundled Nashik heritage dataset. Set GEOAPIFY_API_KEY in .env.local to add live place listings.
        </p>
      )}
      <div id="explore" className="mt-10"><Explorer places={places} /></div>

      <footer className="mt-16 border-t border-ink/20 pt-6 text-sm text-ink/70">
        <p>Map data © <a className="underline" href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>. Heritage places are from the bundled Nashik dataset{live ? " and Geoapify" : ""}. Distances are straight-line from the city centre.</p>
        <p className="mt-1">Check opening hours and entry rules before you go.</p>
      </footer>
    </main>
  );
}
