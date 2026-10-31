"use client";
import { useSaved } from "@/lib/favorites";

export default function SaveButton({ slug, className = "" }: { slug: string; className?: string }) {
  const { saved, toggle } = useSaved();
  const on = saved.includes(slug);
  return (
    <button
      onClick={() => toggle(slug)}
      aria-pressed={on}
      className={`rounded-full border border-ink px-4 py-2 text-sm font-semibold transition-colors ${on ? "bg-ink text-paper" : "hover:bg-ink/10"} ${className}`}
    >
      {on ? "Saved to my trip" : "Save to my trip"}
    </button>
  );
}
