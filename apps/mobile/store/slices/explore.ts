import { ExpandedSection, type ExploreSliceType } from "@/types/store/explore";
import type { StateCreator } from "zustand";

export const createExploreSlice: StateCreator<ExploreSliceType> = (set) => ({
  expandedSection: ExpandedSection.NONE,
  setExpandedSection: (section) => set({ expandedSection: section }),
});
