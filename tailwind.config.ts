import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F7F2E8",
        cream2: "#EDE5D4",
        cream3: "#E2D8C4",
        gold: "#B8953E",
        "gold-soft": "#CDA84E",
        "gold-pale": "#F0E8D0",
        "green-dark": "#1A1510",
        "green-mid": "#2A2018",
        "green-soft": "#8B7355",
        ink: "#1A1510",
        ink2: "#2A2018",
        terr: "#9B4E3A",
        text: "#1A1510",
        "text-soft": "#6B5F50",
        "text-muted": "#A8998A",
        border: "#D8CEBC",
        "border-soft": "#E8E0D0",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        dmsans: ["var(--font-dmsans)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
export default config;
