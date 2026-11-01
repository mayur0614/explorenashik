export type Category =
  | "Temple"
  | "Heritage"
  | "Nature"
  | "Trek"
  | "Wine"
  | "Museum"
  | "Agriculture / Tourism"
  | "Fort"
  | "Historical"
  | "Market"
  | "Memorial"
  | "Natural"
  | "Religious"
  | "Religious / Historical"
  | "Religious / Natural"
  | "Tourist"
  | "Transport"
  | "Water body";

export type Place = {
  slug: string;
  name: string;
  mr?: string; // Marathi name, when known
  category: Category;
  tagline: string;
  description?: string;
  highlights?: string[];
  address?: string;
  website?: string;
  source?: "live" | "sample" | "heritage";
  era?: string;
  verificationStatus?: string;
  sourceDetails?: string;
  distanceKm: number; // approx. from Nashik city centre
  bestSeason?: string;
  timeNeeded?: string;
  lat: number;
  lng: number;
  tags?: string[];
};


// Tailwind classes written in full so they are picked up at build time.
export const CHIP: Record<Category, string> = {
  Temple: "bg-saffron text-ink",
  Heritage: "bg-grape text-white",
  Nature: "bg-river text-white",
  Trek: "bg-ink text-white",
  Wine: "bg-[#9b2d4f] text-white",
  Museum: "bg-[#8a5a2b] text-white",
  "Agriculture / Tourism": "bg-[#9b2d4f] text-white",
  Fort: "bg-ink text-white",
  Historical: "bg-grape text-white",
  Market: "bg-[#8a5a2b] text-white",
  Memorial: "bg-grape text-white",
  Natural: "bg-river text-white",
  Religious: "bg-saffron text-ink",
  "Religious / Historical": "bg-grape text-white",
  "Religious / Natural": "bg-river text-white",
  Tourist: "bg-river text-white",
  Transport: "bg-[#8a5a2b] text-white",
  "Water body": "bg-river text-white",
};

// Sample places shown only when the live Geoapify request is unavailable (no key or an error).
export const fallbackPlaces: Place[] = [
  { slug: "ramkund", name: "Ramkund", mr: "रामकुंड", category: "Temple", distanceKm: 2, bestSeason: "Oct to Mar", timeNeeded: "1 hour", lat: 20.0072, lng: 73.7925,
    tagline: "The bathing ghat on the Godavari in Panchavati.",
    description: "Ramkund is the heart of Panchavati and the main bathing ghat of Nashik. It is the centre of the Kumbh Mela here and a quiet place for the evening aarti on the river steps.",
    highlights: ["Ghat steps on the Godavari", "Evening aarti", "Walk to Kalaram and Sita Gufaa"], tags: ["river", "ghat", "kumbh", "panchavati"] },
  { slug: "kalaram-temple", name: "Kalaram Temple", mr: "कालाराम मंदिर", category: "Temple", distanceKm: 2, bestSeason: "Oct to Mar", timeNeeded: "1 hour", lat: 20.0063, lng: 73.7915,
    tagline: "A black stone temple of Lord Ram in Panchavati.",
    description: "Kalaram is known for its black stone idols of Ram, Sita and Lakshman and its tall stone walls. It is one of the most visited temples in the city.",
    highlights: ["Black stone idols", "Stone architecture", "Close to Ramkund"], tags: ["ram", "panchavati", "stone"] },
  { slug: "sita-gufaa", name: "Sita Gufaa", mr: "सीता गुफा", category: "Heritage", distanceKm: 2, bestSeason: "Oct to Mar", timeNeeded: "30 minutes", lat: 20.0055, lng: 73.7915,
    tagline: "A narrow cave linked to the Ramayana.",
    description: "A small cave in Panchavati reached by a narrow stair, tied by tradition to Sita's stay during the exile. Expect a short queue and a tight passage.",
    highlights: ["Narrow cave passage", "Ramayana connection", "Short walk from Kalaram"], tags: ["cave", "ramayana", "panchavati"] },
  { slug: "pandavleni-caves", name: "Pandavleni Caves", mr: "पांडवलेणी", category: "Heritage", distanceKm: 8, bestSeason: "Jul to Feb", timeNeeded: "2 to 3 hours", lat: 19.94, lng: 73.754,
    tagline: "Rock-cut Buddhist caves on Trirashmi hill.",
    description: "A group of about 24 caves cut into the hill, with viharas, chaityas and inscriptions from roughly the 1st century BCE onward. A stair climb leads to the caves and a wide view of the city and Gangapur road.",
    highlights: ["Ancient viharas and inscriptions", "Stair climb with city views", "Green hill after the monsoon"], tags: ["buddhist", "caves", "history", "asi"] },
  { slug: "muktidham", name: "Muktidham", mr: "मुक्तिधाम", category: "Temple", distanceKm: 9, bestSeason: "Oct to Mar", timeNeeded: "1 hour", lat: 19.959, lng: 73.831,
    tagline: "A white marble temple with replicas of the twelve Jyotirlingas.",
    description: "Muktidham, near Nashik Road, is a marble complex with replicas of the twelve Jyotirlingas and the verses of the Bhagavad Gita carved on its walls.",
    highlights: ["Twelve Jyotirlinga replicas", "Gita verses on the walls", "Easy stop near Nashik Road station"], tags: ["marble", "jyotirlinga", "nashik road"] },
  { slug: "someshwar-waterfall", name: "Someshwar Waterfall", mr: "सोमेश्वर धबधबा", category: "Nature", distanceKm: 9, bestSeason: "Jul to Sep", timeNeeded: "2 hours", lat: 20.022, lng: 73.737,
    tagline: "A monsoon waterfall on the Godavari near the Someshwar temple.",
    description: "A quick escape from the city. The falls are full during the monsoon and mostly dry in summer. Rocks near the water are slippery, so go early and stay on the marked paths.",
    highlights: ["Full flow in monsoon", "Someshwar temple nearby", "Short drive from the centre"], tags: ["waterfall", "monsoon", "godavari"] },
  { slug: "sula-vineyards", name: "Sula Vineyards", mr: "सुला वाइनयार्ड्स", category: "Wine", distanceKm: 15, bestSeason: "Nov to Mar", timeNeeded: "3 hours", lat: 20.0, lng: 73.689,
    tagline: "Vineyard tours and tastings by the Gangapur Dam backwaters.",
    description: "Nashik is India's best known wine region and Sula is its most visited estate. Tours, tastings and a lakeside restaurant fill an easy half day. Harvest season brings grape crush events.",
    highlights: ["Vineyard walk and cellar tour", "Wine tasting", "Lake view dining"], tags: ["wine", "grapes", "vineyard", "tasting"] },
  { slug: "anjaneri-hill", name: "Anjaneri Hill", mr: "अंजनेरी", category: "Trek", distanceKm: 20, bestSeason: "Jul to Dec", timeNeeded: "4 to 5 hours", lat: 19.944, lng: 73.593,
    tagline: "A flat-topped hill believed to be Hanuman's birthplace.",
    description: "A moderate trek on the Trimbak road with caves, temples and a plateau top. In the monsoon the slopes are green and often wrapped in cloud.",
    highlights: ["Plateau summit", "Temples and caves on the way", "Misty monsoon views"], tags: ["trek", "hanuman", "monsoon"] },
  { slug: "trimbakeshwar", name: "Trimbakeshwar Temple", mr: "त्र्यंबकेश्वर", category: "Temple", distanceKm: 28, bestSeason: "Oct to Feb", timeNeeded: "Half day", lat: 19.9323, lng: 73.5303,
    tagline: "One of the twelve Jyotirlingas, at the source of the Godavari.",
    description: "Trimbakeshwar sits at the foot of the Brahmagiri hills in a black stone temple. It is also the second venue of the Nashik Simhastha Kumbh. Mondays and the month of Shravan are crowded, so go early.",
    highlights: ["Jyotirlinga darshan", "Kushavarta kund", "Base for the Brahmagiri trek"], tags: ["jyotirlinga", "shiva", "godavari", "kumbh"] },
  { slug: "brahmagiri", name: "Brahmagiri Hill", mr: "ब्रह्मगिरी", category: "Trek", distanceKm: 30, bestSeason: "Jul to Feb", timeNeeded: "3 to 4 hours", lat: 19.942, lng: 73.524,
    tagline: "A stone staircase trek above Trimbak to the Godavari's origin.",
    description: "A well-built stone stair climbs the hill above Trimbakeshwar to the origin point of the Godavari. It is a steady climb with a wide view at the top. Start early to beat the heat and the crowds.",
    highlights: ["Stone steps nearly all the way", "Godavari origin point", "Fort ruins on top"], tags: ["trek", "godavari", "trimbak"] },
  { slug: "harihar-fort", name: "Harihar Fort", mr: "हरिहर किल्ला", category: "Trek", distanceKm: 48, bestSeason: "Oct to Feb", timeNeeded: "5 to 6 hours", lat: 19.862, lng: 73.476,
    tagline: "A fort known for its near-vertical rock-cut staircase.",
    description: "Harihar is famous for the steep carved steps on its final climb. Handholds and care are needed, and the stairs are slippery in the monsoon. Not suited to anyone afraid of heights.",
    highlights: ["Rock-cut staircase", "Panoramic summit", "Photography favourite"], tags: ["fort", "trek", "steep", "photography"] },
  { slug: "saptashrungi-gad", name: "Saptashrungi Gad", mr: "सप्तशृंगी गड", category: "Temple", distanceKm: 65, bestSeason: "Oct to Mar", timeNeeded: "Full day", lat: 20.383, lng: 73.887,
    tagline: "A hill shrine of the goddess in the Sahyadris near Vani.",
    description: "Saptashrungi Gad is a major Devi shrine set among seven peaks. Devotees climb the steps or take the funicular. Navratri brings very large crowds.",
    highlights: ["Hill shrine of the goddess", "Steps or funicular to the top", "Mountain views"], tags: ["devi", "hill", "navratri", "vani"] },
];
