import { useContext } from "react";
import { ThemeContext } from "../context/theme";

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("Theme context value not set");
  }
  const [theme, setTheme] = value;
  return [
    theme,
    () => {
      const toggledTheme = theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", toggledTheme);
      setTheme(toggledTheme);
    },
  ] as const;
}
