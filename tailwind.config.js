/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.tsx",
    "./app/**/**/*.tsx",
    "./components/*.tsx",
    "./components/**/*.tsx",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      spacing: {
        7.5: "1.875rem",
        11.5: "2.8125rem",
        12.5: "3.125rem",
        13: "3.25rem",
        15: "3.75rem",
        22: "5.5rem",
        23: "5.625rem",
        25: "6.25rem",
        29: "7.25rem",
        30: "7.5rem",
        33.5: "8.375rem",
        50: "12.5rem",
        100: "25rem",
      },
      backgroundImage: {
        "card-blue": "url('/assets/background/bg_blue.png')",
        "card-red": "url('/assets/background/bg_red.png')",
        "card-yellow": "url('/assets/background/bg_yellow.png')",
      },
      colors: {
        appBlue: "var(--app-blue)",
        appLightBlue: "var(--app-light-blue)",
        appBG: "var(--app-bg)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
  },
  plugins: [],
};
