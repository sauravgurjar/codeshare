/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Inter", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "monospace"],
      },
      colors: {
        "panel-dark": "rgb(15 23 42 / 0.6)",
        "panel-light": "rgb(255 255 255 / 0.6)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(148 163 184 / 0.35), 0 10px 30px rgb(2 6 23 / 0.35)",
      },
    },
  },
  plugins: [],
};

