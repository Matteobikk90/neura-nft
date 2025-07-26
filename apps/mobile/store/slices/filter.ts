import type { FilterSliceType } from "@/types/store/filter";
import type { StateCreator } from "zustand";

export const createFilterSlice: StateCreator<FilterSliceType> = (set) => ({
  tokenSortBy: "amount",
  setTokenSortBy: (sortBy) => set({ tokenSortBy: sortBy }),
});
