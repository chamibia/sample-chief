// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Grid spans for optimized layout
    'col-span-2', 'col-span-3', 'col-span-4',
    'row-span-2', 'row-span-3', 'row-span-4',
    'grid-cols-2', 'grid-cols-4', 'grid-cols-12',
    // Responsive grid classes
    'md:col-span-1', 'md:col-span-2', 'md:col-span-3',
    'md:row-span-1', 'md:row-span-2', 'md:row-span-3',
    'md:grid-cols-3',
    // Text truncation
    'line-clamp-3'
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
}