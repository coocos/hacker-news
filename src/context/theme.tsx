import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

function getThemeChoice() {
  const theme = localStorage.getItem("theme");
  if (theme === null || (theme !== "dark" && theme !== "light")) {
    return "light";
  }
  return theme;
}

type Theme = "light" | "dark";

type ThemeContextValueType =
  | [Theme, Dispatch<SetStateAction<Theme>>]
  | undefined;

export const ThemeContext = createContext<ThemeContextValueType>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren<unknown>) => (
  <ThemeContext.Provider value={useState(getThemeChoice())}>
    {children}
  </ThemeContext.Provider>
);
