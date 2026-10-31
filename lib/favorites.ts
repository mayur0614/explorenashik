"use client";
import { useCallback, useEffect, useState } from "react";

const KEY = "nashik:saved";
const read = (raw: string | null): string[] => {
  try { const v = JSON.parse(raw ?? "[]"); return Array.isArray(v) ? v : []; } catch { return []; }
};

export function useSaved() {
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => {
    setSaved(read(localStorage.getItem(KEY)));
    const sync = (e: StorageEvent) => { if (e.key === KEY) setSaved(read(e.newValue)); };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const toggle = useCallback((slug: string) => {
    setSaved((cur) => {
      const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug];
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);
  return { saved, toggle };
}
