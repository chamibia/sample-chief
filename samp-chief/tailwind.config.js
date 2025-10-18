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
            // default body and headings
            sans: ["AlteHaasGrotesk", "system-ui", "sans-serif"],
            ruder: ["RuderPlakatLL", "sans-serif"],
            // Symbol fallback font stack
            symbols: ["AlteHaasGrotesk", "system-ui", "sans-serif"],
                },
            fontWeight: {
              // Radikal font weights
              "ultra-thin": "100",
              thin: "200",
              light: "300",
              normal: "400",
              medium: "500",
              bold: "700",
              black: "900",
            },
          },
        },
  plugins: [],
};