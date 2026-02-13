import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B1026",
        accent: "#6D5EF9",
        accentSoft: "#9A8CFF"
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(15, 23, 42, 0.25)"
      },
      backgroundImage: {
        "hero-grid": "radial-gradient(circle at 1px 1px, rgba(109,94,249,0.12) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
