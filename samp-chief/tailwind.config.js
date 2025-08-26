// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // default body
        sans: ["AlteHaasGrotesk", "system-ui", "sans-serif"],
        // utilities
        alte: ["AlteHaasGrotesk", "system-ui", "sans-serif"],
        ruder: ["RuderPlakatLL", "sans-serif"],
        // Add a font stack that includes symbols
        "font-symbols": [
          "AlteHaasGrotesk",
          "Arial",
          "Helvetica",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
