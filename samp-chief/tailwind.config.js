// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /col-span-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
    {
      pattern: /row-span-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
    {
      pattern: /col-start-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
    {
      pattern: /row-start-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
    {
      pattern: /grid-rows-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
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
