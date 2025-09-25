import type { MintSliceType } from "@/types/store/mint";
import type { StateCreator } from "zustand";

export const createMintSlice: StateCreator<MintSliceType> = (set) => ({
  title: "",
  description: "",
  image: null,
  prompt: "",
  isAImintMode: false,
  author: "",
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
    set({ title: "", description: "", image: null, prompt: "", author: "" }),
  selectedCategory: "Art",
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
});
