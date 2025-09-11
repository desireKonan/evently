/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
     extend: {
      colors: {
        primary: {
          DEFAULT: '#38e07b',
          foreground: '#111714',
        },
        background: '#111714',
        foreground: '#ffffff',
        card: {
          DEFAULT: '#1a231d',
          foreground: '#ffffff',
        },
        popover: {
          DEFAULT: '#1a231d',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#29382f',
          foreground: '#9eb7a8',
        },
        accent: {
          DEFAULT: '#3d5245',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        border: '#3d5245',
        input: '#3d5245',
        ring: '#38e07b',
      },
      fontFamily: {
        sans: ['Spline Sans', 'Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}