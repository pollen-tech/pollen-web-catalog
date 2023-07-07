/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'pollen-purple': '#8431E7',
        'pollen-purple-bg': '#FAF5FF',
      },
      container: {
        padding: '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  daisyui: {
		themes: ["light"]
  },
  darkMode: 'class',

}
