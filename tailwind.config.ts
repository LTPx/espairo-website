import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xl-flex': { raw: '(min-width: 1280px) and (max-width: 1535px)' },
        'mac': { 'raw': '(min-width: 1280px) and (max-width: 1330px)' },
      },
      colors: {
        primary: {
          100: "#ffd5eb",
          200: "#ffafda",
          300: "#ff8ac8",
          400: "#ff64b7",
          500: "#ff3ea5",
          600: "#ff1993",
          DEFAULT: "#3E444D",
          800: "#ca026d",
        },
        secondary: {
          100: "#82a7e2",
          200: "#6591d9",
          300: "#497cd0",
          400: "#3469be",
          500: "#2e599f",
          600: "#274980",
          700: "#1f3962",
          800: "#172945",
          DEFAULT: "#E0E0E0",
        },
        black: {
          DEFAULT: "#000000",
          light: "#e3e4eb",
          footer: "#262626",
          "dark-light": "rgba(14,23,38,.15)",
        },
        white: {
          DEFAULT: "#ffffff",
          beige: "#F4F4F2",
          light: "#b9bdc4",
          dark: "#888ea8",
        },
        body: {
          DEFAULT: "#E0E0E0",
        },
      },
      fontFamily: {
        regular: ["Regular", "sans-serif"],
        bold: ["Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
