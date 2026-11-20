import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FBF9F4",
          50: "#FFFFFF",
          100: "#FAF7F2",
          200: "#F5F1E8",
          300: "#EAE3D5",
          400: "#D8CFBF",
          500: "#A89F8E",
          600: "#787164",
          700: "#4F4A40",
          800: "#302D27",
          900: "#1C1B18",
        },
        stone: {
          50: "#FAF8F5",
          100: "#F5F2EC",
          200: "#E8E2D6",
          300: "#D5CCC0",
          400: "#A89F91",
          500: "#787063",
          600: "#575147",
          700: "#443F37",
          800: "#2B2823",
          900: "#1C1A17",
          950: "#12110F",
        },
        cobalt: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#172554",
          950: "#0c183d",
        },
        lime: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        cream: {
          50: "#FFFFFF",
          100: "#FDFBF7",
          200: "#FBF9F4",
          300: "#F5F1E8",
          400: "#EAE3D5",
          500: "#D8CFBF",
        },
      },
      fontFamily: {
        // Strict compliance: Only DM Sans, Montserrat, and Sora
        sans: ["'DM Sans'", "var(--font-dm-sans)", "-apple-system", "sans-serif"],
        display: ["'Montserrat'", "var(--font-montserrat)", "sans-serif"],
        heading: ["'Montserrat'", "var(--font-montserrat)", "sans-serif"],
        sora: ["'Sora'", "var(--font-sora)", "sans-serif"],
        mono: ["'Sora'", "var(--font-sora)", "monospace"], // Map mono strictly to Sora tabular figures
        serif: ["'Montserrat'", "var(--font-montserrat)", "sans-serif"], // Overwrite serif strictly to Montserrat
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(28, 27, 24, 0.04)",
        card: "0 10px 30px -10px rgba(44, 38, 28, 0.05), 0 2px 8px -2px rgba(44, 38, 28, 0.03)",
        glass: "0 14px 35px -8px rgba(44, 38, 28, 0.06), 0 2px 6px -1px rgba(44, 38, 28, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
        "glass-hover": "0 20px 45px -10px rgba(44, 38, 28, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1)",
        dropdown: "0 20px 35px -5px rgba(44, 38, 28, 0.08), 0 8px 16px -6px rgba(44, 38, 28, 0.04)",
      },
      borderRadius: {
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.25rem",
        xl: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
