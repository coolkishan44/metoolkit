import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF7",
        surface: "#FFFFFF",
        ink: "#1A1B23",
        muted: "#6B6E7C",
        line: "#E4E3DD",
        indigo: {
          DEFAULT: "#2D5BFF",
          dark: "#1F3FCB",
          soft: "#EEF1FF"
        },
        amber: {
          DEFAULT: "#E8A33D",
          dark: "#C4841F",
          soft: "#FCF1DF"
        }
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      maxWidth: {
        content: "1200px"
      }
    }
  },
  plugins: []
};

export default config;
