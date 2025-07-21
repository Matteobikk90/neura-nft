import { COLORS } from "@/lib/theme/colors";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

export const navTheme = {
  light: {
    ...DefaultTheme,
    colors: {
      background: COLORS.light.background,
      foreground: COLORS.light.foreground,
      border: COLORS.light.grey5,
      card: COLORS.light.card,
      notification: COLORS.light.destructive,
      primary: COLORS.light.primary,
      text: COLORS.black,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: COLORS.dark.background,
      foreground: COLORS.dark.foreground,
      border: COLORS.dark.grey5,
      card: COLORS.dark.grey6,
      notification: COLORS.dark.destructive,
      primary: COLORS.dark.primary,
      text: COLORS.white,
    },
  },
};
