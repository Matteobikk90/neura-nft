/** @type {import('tailwindcss').Config} */
import nativewind from "nativewind/preset";

export const content = [
  "./app/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
  "./lib/**/*.{js,jsx,ts,tsx}",
  "./screens/**/*.{js,jsx,ts,tsx}",
];

export const presets = [nativewind];

export const theme = {
  extend: {
    colors: {
      background: "rgb(var(--background) / <alpha-value>)",
      foreground: "rgb(var(--foreground) / <alpha-value>)",
      primary: "rgb(var(--primary) / <alpha-value>)",
      secondary: "rgb(var(--secondary) / <alpha-value>)",
      accent: "rgb(var(--accent) / <alpha-value>)",
      error: "rgb(var(--error) / <alpha-value>)",
      success: "rgb(var(--success) / <alpha-value>)",
    },
    fontFamily: {
      jetmono: ["JetBrainsMono-Regular"],
      "jetmono-medium": ["JetBrainsMono-Medium"],
      "jetmono-semiBold": ["JetBrainsMono-SemiBold"],
    },
  },
};

export const plugins = [
  ({ addBase }) =>
    addBase({
      ":root": {
        "--background": "255 255 255",
        "--foreground": "23 21 34",
        "--primary": "139 92 246",
        "--secondary": "100 160 255",
        "--accent": "168 85 247",
        "--error": "255 82 144",
        "--success": "0 200 100",
      },
      ".dark": {
        "--background": "23 21 34",
        "--foreground": "255 255 255",
        "--primary": "139 92 246",
        "--secondary": "9 254 155",
        "--accent": "124 58 237",
        "--error": "255 82 144",
        "--success": "205 255 0",
      },
    }),
];
