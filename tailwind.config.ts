import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "pynn-blue": "var(--pynn-blue)",
        "pynn-light-blue": "var(--pynn-light-blue)",
        "pynn-sky-blue": "var(--pynn-sky-blue)",
        "pynn-cyan": "var(--pynn-cyan)",
        "pynn-indigo": "var(--pynn-indigo)",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
      },
      animation: {
        "gradient-x": "gradient-x 4s ease infinite",
        "gradient-y": "gradient-x 6s ease infinite",
        "gradient-xy": "gradient-x 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        shimmer: {
          "0%": {
            "background-position": "-200% 0",
          },
          "100%": {
            "background-position": "200% 0",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;

