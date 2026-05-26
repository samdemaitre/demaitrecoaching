export { en } from "./en";
export { nl } from "./nl";
export { es } from "./es";
export { fr } from "./fr";
export { de } from "./de";
export type { Translations } from "./en";

export type Language = "en" | "nl" | "es" | "fr" | "de";

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  nl: "Nederlands",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
};

export const LANGUAGE_FLAGS: Record<Language, string> = {
  en: "🇬🇧",
  nl: "🇳🇱",
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
};
