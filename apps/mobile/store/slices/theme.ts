import type { ThemeSliceType } from "@/types/store/theme";
import { StateCreator } from "zustand";

export const createThemeSlice: StateCreator<ThemeSliceType> = (set) => ({
  darkMode: true,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
});
