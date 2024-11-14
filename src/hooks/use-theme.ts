// originally written by @imoaazahmed
"use client";

import { useEffect, useMemo, useState } from "react";

const ThemeProps = {
  key: "theme",
  light: "light",
  dark: "dark",
} as const;

type Theme = typeof ThemeProps.light | typeof ThemeProps.dark;

export const useTheme = (defaultTheme?: Theme) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // const storedTheme = Cookies.get(ThemeProps.key) as Theme | null;

    // const storedTheme = Cookies.get(ThemeProps.key) as Theme | null;

    let storedTheme = null;

    if (typeof window !== "undefined" && window.localStorage) {
      storedTheme = window.localStorage.getItem(ThemeProps.key) as Theme | null;
    }

    return storedTheme || (defaultTheme ?? ThemeProps.light);
  });

  const isDark = useMemo(() => {
    return theme === ThemeProps.dark;
  }, [theme]);

  const isLight = useMemo(() => {
    return theme === ThemeProps.light;
  }, [theme]);

  const _setTheme = (theme: Theme) => {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(ThemeProps.key, theme);
    }

    document.documentElement.classList.remove(
      ThemeProps.light,
      ThemeProps.dark
    );

    document.documentElement.classList.add(theme);

    // Dynamically update CSS variables
    document.documentElement.style.setProperty(
      "--background",
      theme === ThemeProps.light
        ? "var(--background-light)"
        : "var(--background-dark)"
    );

    document.documentElement.style.setProperty(
      "--foreground",
      theme === ThemeProps.light
        ? "var(--foreground-light)"
        : "var(--foreground-dark)"
    );

    setTheme(theme);
  };

  const setLightTheme = () => _setTheme(ThemeProps.light);

  const setDarkTheme = () => _setTheme(ThemeProps.dark);

  const toggleTheme = () =>
    theme === ThemeProps.dark ? setLightTheme() : setDarkTheme();

  useEffect(() => {
    _setTheme(theme);
  });

  return { theme, isDark, isLight, setLightTheme, setDarkTheme, toggleTheme };
};
