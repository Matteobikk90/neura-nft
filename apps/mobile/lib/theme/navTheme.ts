import { fonts } from "@/lib/theme/fonts";

export const navTheme = {
  light: {
    dark: false,
    colors: {
      primary: "rgb(139 92 246)",
      background: "rgb(255 255 255)",
      card: "rgb(255 255 255)",
      text: "rgb(23 21 34)",
      foreground: "rgb(23 21 34)",
      border: "rgb(39 39 42)",
      notification: "rgb(255 56 43)",
      gray: "rgb(147 154 165)",
      green: "rgb(18 185 129)",
      red: "rgb(239 68 68)",
      yellow: "rgb(245 158 12)",
    },
    fonts,
  },
  dark: {
    dark: true,
    colors: {
      primary: "rgb(139 92 246)",
      background: "rgb(23 21 34)",
      card: "rgb(23 21 34)",
      text: "rgb(255 255 255)",
      foreground: "rgb(255 255 255)",
      border: "rgb(228 228 231)",
      notification: "rgb(254 67 54)",
      gray: "rgb(147 154 165)",
      green: "rgb(18 185 129)",
      red: "rgb(239 68 68)",
      yellow: "rgb(245 158 12)",
    },
    fonts,
  },
};
