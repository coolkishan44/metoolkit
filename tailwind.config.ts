import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAF9F5",
        surface: "#FFFFFF",
        ink: "#16231D",
        muted: "#69746A",
        line: "#E2E5DE",
        indigo: { DEFAULT: "#0E7C56", dark: "#0A5F42", soft: "#E6F4EE" },
        amber: { DEFAULT: "#D4A017", dark: "#A87D12", soft: "#FBF1D6" }
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      maxWidth: {
        content: "1200px"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "drift": {
          "0%,100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(30px,-20px)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.6s ease-out both",
        "drift": "drift 14s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
