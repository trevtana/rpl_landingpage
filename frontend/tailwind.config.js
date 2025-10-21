/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rpl-blue': '#009FE3', // RPL Blue
        'rpl-orange': '#F47B20', // RPL Orange
        'soft-white': '#F5F7FA', // Soft White background
        'dark-grey': '#1E293B', // Elegant Dark Grey for text
        'navy-blue': '#0F172A', // Subtle Navy Blue for shadows/footer
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
