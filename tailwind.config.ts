import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        deep: '#0A0A0F',
        surface: '#141428',
        primary: { start: '#6C3CE1', end: '#8B5CF6' },
        accent: '#00D4FF',
        cta: '#E50914',
        text: { primary: '#FFFFFF', secondary: '#B3B3B3' },
        success: '#2ECC71'
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        title: ['Poppins', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      }
    }
  },
  plugins: []
}
export default config