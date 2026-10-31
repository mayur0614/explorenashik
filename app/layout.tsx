import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/hind/400.css";
import "@fontsource/hind/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Explore Nashik", template: "%s | Explore Nashik" },
  description: "Temples, caves, treks, vineyards and ghats around Nashik. Search, filter and save places for your trip.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
