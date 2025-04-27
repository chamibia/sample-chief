/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Jost', 'sans-serif'],
          open: ['Open Sans', 'sans-serif'],
          carlito: ['Carlito', 'sans-serif'],
          jost: ['Jost', 'sans-serif'],
        },
        colors: {
          border: "hsl(var(--border))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          ring: "hsl(var(--ring))",
        },
      },
    },
    plugins: [],
  }