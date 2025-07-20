import type { ModalSliceType } from "@/types/store/modal";
import { StateCreator } from "zustand";

export const createModalSlice: StateCreator<ModalSliceType> = (set) => ({
  type: null,
  data: null,
  openModal: (type, data) => set({ type, data }),
  closeModal: () => set({ type: null, data: null }),
});
