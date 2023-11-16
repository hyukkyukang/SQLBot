import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/theme");

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily: {
                display: ["var(--font-sf)", "system-ui", "sans-serif"],
                default: ["var(--font-inter)", "system-ui", "sans-serif"],
              },
              animation: {
                // Fade up and down
                "fade-up": "fade-up 0.5s",
                "fade-down": "fade-down 0.5s",
                // Tooltip
                "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              },
              keyframes: {
                // Fade up and down
                "fade-up": {
                  "0%": {
                    opacity: "0",
                    transform: "translateY(10px)",
                  },
                  "80%": {
                    opacity: "0.6",
                  },
                  "100%": {
                    opacity: "1",
                    transform: "translateY(0px)",
                  },
                },
                "fade-down": {
                  "0%": {
                    opacity: "0",
                    transform: "translateY(-10px)",
                  },
                  "80%": {
                    opacity: "0.6",
                  },
                  "100%": {
                    opacity: "1",
                    transform: "translateY(0px)",
                  },
                },
                // Tooltip
                "slide-up-fade": {
                  "0%": { opacity: "0", transform: "translateY(6px)" },
                  "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "slide-down-fade": {
                  "0%": { opacity: "0", transform: "translateY(-6px)" },
                  "100%": { opacity: "1", transform: "translateY(0)" },
                },
              },
        },
    },
    darkMode: "class",
    plugins: [nextui()],
};
export default config;
