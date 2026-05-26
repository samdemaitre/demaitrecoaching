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
        cream: "#FAF7F2",
        cream2: "#F0EBE1",
        cream3: "#E8E0D4",
        gold: "#C4A96B",
        "gold-soft": "#DCCFA0",
        "gold-pale": "#F0E8D0",
        "green-dark": "#0C1E10",
        "green-mid": "#1A3520",
        "green-soft": "#3D6648",
        text: "#2A2218",
        "text-soft": "#7A6E62",
        "text-muted": "#A89E94",
        border: "#E0D8CC",
        "border-soft": "#EDE8E0",
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
