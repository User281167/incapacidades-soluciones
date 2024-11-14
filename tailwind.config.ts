import { colors, nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "main-blue": "var(--main-blue)",
        "main-blue-80": "var(--main-blue-80)",
        "main-light-blue": "var(--main-light-blue)",
        "main-dark-blue": "var(--main-dark-blue)",
        "main-white": "var(--main-white)",
        "main-gray": "var(--main-gray)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#80D9EA",
              foreground: colors.black,
            },
            secondary: {
              DEFAULT: "#1c3850",
              foreground: colors.black,
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#56A4C1",
              foreground: colors.white,
            },
            secondary: {
              DEFAULT: "#fafeff",
              foreground: colors.white,
            },
          },
        },
      },
    }),
  ],
} satisfies Config;
