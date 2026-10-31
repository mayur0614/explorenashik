"use client";

import { useEffect, useState, type ChangeEvent } from "react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
] as const;

export default function LanguageSelector() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [selectedLanguage, setSelectedLanguage] = useState<(typeof LANGUAGES)[number]["code"]>("en");

  useEffect(() => {
    const win = window as Window & {
      google?: { translate?: { TranslateElement: new (options: object, id: string) => unknown } };
      googleTranslateElementInit?: () => void;
      __nashikTranslateInitialized?: boolean;
    };

    const mount = () => {
      const TranslateElement = win.google?.translate?.TranslateElement;
      const container = document.getElementById("google_translate_element");
      if (TranslateElement && container && !win.__nashikTranslateInitialized) {
        win.__nashikTranslateInitialized = true;
        new TranslateElement({
          pageLanguage: "en",
          includedLanguages: LANGUAGES.map((language) => language.code).join(","),
          autoDisplay: false,
          layout: 0,
        }, "google_translate_element");
        window.setTimeout(() => {
          const combo = container.querySelector("select.goog-te-combo") as HTMLSelectElement | null;
          if (combo) {
            combo.value = selectedLanguage;
            setStatus("ready");
          }
        }, 1200);
      }
    };

    win.googleTranslateElementInit = mount;
    const existing = document.getElementById("google-translate-script") as HTMLScriptElement | null;

    if (win.google?.translate?.TranslateElement) {
      mount();
    } else if (!existing) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => setStatus("error");
      document.body.appendChild(script);
    } else {
      existing.addEventListener("load", mount, { once: true });
      existing.addEventListener("error", () => setStatus("error"), { once: true });
    }

    window.setTimeout(() => {
      const container = document.getElementById("google_translate_element");
      if (!container?.querySelector("select.goog-te-combo")) {
        setStatus((current) => (current === "ready" ? current : "error"));
      }
    }, 8000);
  }, []);

  const syncGoogleTranslate = (language: string) => {
    const combo = document.querySelector("select.goog-te-combo") as HTMLSelectElement | null;
    if (!combo) return false;
    combo.value = language;
    combo.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLanguage = event.target.value as (typeof LANGUAGES)[number]["code"];
    setSelectedLanguage(nextLanguage);

    if (!syncGoogleTranslate(nextLanguage)) {
      const target = encodeURIComponent(window.location.href);
      window.location.href = `https://translate.google.com/translate?sl=en&tl=${nextLanguage}&u=${target}`;
    }
  };

  return (
    <div className="language-picker" aria-label="Translate this page">
      <label htmlFor="language-select" className="mr-2 text-sm font-semibold">Translate</label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="rounded-full border border-ink/40 bg-paper px-3 py-1.5 text-sm font-semibold text-ink shadow-sm outline-none transition focus:border-saffron"
        aria-label="Select a language for page translation"
      >
        {LANGUAGES.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
      <div id="google_translate_element" className="sr-only" aria-hidden="true" />
      {status === "loading" && <span className="ml-2 text-xs text-ink/60" role="status">Loading languages…</span>}
      {status === "error" && <span className="ml-2 text-xs text-ink/70" role="status">Translation is unavailable. Check your connection and reload.</span>}
    </div>
  );
}
