import type { MintSliceType } from "@/types/store/mint";
import type { StateCreator } from "zustand";

export const createMintSlice: StateCreator<MintSliceType> = (set) => ({
  title: "",
  description: "",
  image: null,
  prompt: "",
  isAImintMode: false,
  toggleMintMode: () =>
    set((state) => ({
      isAImintMode: !state.isAImintMode,
    })),
  setMintInfo: (info) =>
    set((state) => ({
      ...state,
      ...info,
    })),
  clearMintForm: () =>
    set({ title: "", description: "", image: null, prompt: "" }),
  selectedCategory: "Art",
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
});
