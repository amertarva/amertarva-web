export type ThemeName = "amerta-day" | "amerta-night";

export const useTheme = () => {
  const theme = useState<ThemeName>("theme", () => "amerta-day");

  const applyTheme = (value: ThemeName) => {
    theme.value = value;
    if (import.meta.client) {
      document.documentElement.setAttribute("data-theme", value);
      localStorage.setItem("amertarva-theme", value);
    }
  };

  const toggleTheme = () => {
    applyTheme(theme.value === "amerta-day" ? "amerta-night" : "amerta-day");
  };

  const initTheme = () => {
    if (!import.meta.client) return;
    const saved = localStorage.getItem("amertarva-theme") as ThemeName | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "amerta-night"
      : "amerta-day";
    applyTheme(saved ?? preferred);
  };

  return { theme, applyTheme, toggleTheme, initTheme };
};
