# Explore Nashik

Interactive guide to places around Nashik. Next.js (App Router), React, TypeScript, Tailwind CSS v4.

## Run
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Data sources
- **Geoapify Places API** supplies the places (temples, sights, nature, treks, museums within 70 km of Nashik). Calls run on the server and are cached for 24 hours, so the key never reaches the browser.
- **India Heritage API** (`/sites/`) is read for Maharashtra entries. Its public dataset is mostly placeholder text, so entries that look like filler are dropped and the section stays hidden when nothing real remains.
- If `GEOAPIFY_API_KEY` is missing or the request fails, the site falls back to the 12 sample places in `data/places.ts`.

Get a free Geoapify key at https://myprojects.geoapify.com, then:
```bash
cp .env.example .env.local   # paste your key after GEOAPIFY_API_KEY=
```
Tune the searches in the `QUERIES` list in `lib/places.ts`.

## Deploy
1. `git init && git add . && git commit -m "Explore Nashik"`
2. Create a GitHub repo and push.
3. On vercel.com, choose Add New > Project and import the repo.
4. Under Environment Variables add `GEOAPIFY_API_KEY`, then click Deploy.

Saved places ("My trip") are stored in the visitor's browser with localStorage.
