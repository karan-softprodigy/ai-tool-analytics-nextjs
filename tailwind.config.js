/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#15131C',
        panel: '#1D1A26',
        panelBorder: '#2C2836',
        ink: '#F5F1EA',
        inkMuted: '#A69FB0',
        amber: {
          DEFAULT: '#F2A93B',
          soft: 'rgba(242, 169, 59, 0.12)'
        },
        teal: {
          DEFAULT: '#4FD1C5',
          soft: 'rgba(79, 209, 197, 0.12)'
        },
        rose: '#E5697B'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    }
  },
  plugins: []
};
