import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-image": "url('/images/hero-image.jpg')",
      },
      fontFamily: {
        heading: ["var(--font-noto-sans-mono)","Courier New", "Courier", "monospace"],
        main: ["var(--font-libre-franklin)", "Tahoma", "Verdana", "sans-serif"],
      }
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
export default config;
