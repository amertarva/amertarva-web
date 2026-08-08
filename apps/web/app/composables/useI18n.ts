import { translations } from "~/data/translations";

export type Locale = "id" | "en";

export const useI18n = () => {
  const locale = useState<Locale>("locale", () => "en");

  const setLocale = (val: Locale) => {
    locale.value = val;
    if (import.meta.client) {
      localStorage.setItem("amertarva-locale", val);
      document.documentElement.setAttribute("lang", val);
    }
  };

  const initLocale = () => {
    if (!import.meta.client) return;
    const saved = localStorage.getItem("amertarva-locale") as Locale | null;
    if (saved && (saved === "id" || saved === "en")) {
      setLocale(saved);
    } else {
      setLocale("en");
    }
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let current: any = translations[locale.value];

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        // Fallback to default (en) or key itself
        let fallback: any = translations["en"];
        for (const fk of keys) {
          if (fallback && typeof fallback === "object" && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return key;
          }
        }
        return typeof fallback === "string" ? fallback : key;
      }
    }

    return typeof current === "string" ? current : key;
  };

  return { locale, setLocale, initLocale, t };
};
