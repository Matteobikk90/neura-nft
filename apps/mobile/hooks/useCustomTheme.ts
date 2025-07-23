import { useTheme } from "@react-navigation/native";

export const useCustomTheme = () => {
  return useTheme() as ReturnType<typeof useTheme> & {
    colors: {
      gray: string;
      zinc: string;
      foreground: string;
    };
  };
};
