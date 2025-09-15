import type { MintSliceType } from "@/types/store/mint";
import type { StateCreator } from "zustand";

export const createMintSlice: StateCreator<MintSliceType> = (set) => ({
  title: "",
  description: "",
  image: null,
  setMintInfo: (info) =>
    set((state) => ({
      ...state,
      ...info,
    })),
  clearMintForm: () => set({ title: "", description: "", image: null }),
});
