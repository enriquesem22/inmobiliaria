import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fondo calido y limpio
        bone: "#F7F5F0",
        cream: "#FBFAF6",
        // Verde profundo: confianza, patrimonio, inversion (color principal de marca)
        pine: {
          50: "#F0F4F1",
          100: "#D8E3DB",
          200: "#B0C7B7",
          300: "#83A78E",
          400: "#5A8368",
          500: "#3D664B",
          600: "#2E5039",
          700: "#243F2E",
          800: "#1E3327",
          900: "#182A20",
          950: "#0E1912",
        },
        // Terracota calido: acento andaluz, usado con moderacion en CTAs
        clay: {
          50: "#FAF1EC",
          100: "#F1DBCE",
          200: "#E2B79E",
          300: "#D2926F",
          400: "#C57249",
          500: "#B65A34",
          600: "#A24B2A",
          700: "#853C24",
          800: "#663020",
          900: "#4F281C",
        },
        // Grises calidos neutros
        stone: {
          50: "#F6F5F2",
          100: "#ECEAE4",
          200: "#D9D5CB",
          300: "#BEB8AB",
          400: "#9C9484",
          500: "#7E7666",
          600: "#645D50",
          700: "#4E483E",
          800: "#33302A",
          900: "#1C1A16",
        },
        ink: "#191814",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 2px 24px -8px rgba(24, 42, 32, 0.12)",
        card: "0 1px 2px rgba(24, 42, 32, 0.04), 0 8px 32px -12px rgba(24, 42, 32, 0.14)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
