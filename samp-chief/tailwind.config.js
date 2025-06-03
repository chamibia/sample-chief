/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Your default sans → MyFont
        sans: ['MyFont', 'sans-serif'],

        radikal: ['RadikalTrial', 'sans-serif'],
      },
      colors: {
        border:      'hsl(var(--border))',
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        ring:        'hsl(var(--ring))',
      },
    },
  },
  plugins: [],
}
