/** @type {import('tailwindcss').Config} */
import nativewind from "nativewind/preset";
import { platformSelect } from "nativewind/theme";

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
      border: withOpacity("border"),
      input: withOpacity("input"),
      ring: withOpacity("ring"),
      background: withOpacity("background"),
      foreground: withOpacity("foreground"),
      zinc: withOpacity("zinc"),
      primary: {
        DEFAULT: withOpacity("primary"),
        foreground: withOpacity("primary-foreground"),
      },
      secondary: {
        DEFAULT: withOpacity("secondary"),
        foreground: withOpacity("secondary-foreground"),
      },
      destructive: {
        DEFAULT: withOpacity("destructive"),
        foreground: withOpacity("destructive-foreground"),
      },
      muted: {
        DEFAULT: withOpacity("muted"),
        foreground: withOpacity("muted-foreground"),
      },
      accent: {
        DEFAULT: withOpacity("accent"),
        foreground: withOpacity("accent-foreground"),
      },
      popover: {
        DEFAULT: withOpacity("popover"),
        foreground: withOpacity("popover-foreground"),
      },
      card: {
        DEFAULT: withOpacity("card"),
        foreground: withOpacity("card-foreground"),
      },
    },
    fontFamily: {
      jetmono: ["JetBrainsMono-Regular", "monospace"],
      "jetmono-medium": ["JetBrainsMono-Medium", "monospace"],
      "jetmono-semiBold": ["JetBrainsMono-SemiBold", "monospace"],
    },
  },
};

export const plugins = [];

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return platformSelect({
        ios: `rgb(var(--${variableName}) / ${opacityValue})`,
        android: `rgb(var(--android-${variableName}) / ${opacityValue})`,
        default: `rgb(var(--${variableName}) / ${opacityValue})`,
      });
    }
    return platformSelect({
      ios: `rgb(var(--${variableName}))`,
      android: `rgb(var(--android-${variableName}))`,
      default: `rgb(var(--${variableName}))`,
    });
  };
}
