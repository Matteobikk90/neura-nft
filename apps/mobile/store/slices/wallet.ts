import type { WalletSliceType } from "@/types/store/wallet";
import { StateCreator } from "zustand";

export const createWalletSlice: StateCreator<WalletSliceType> = (set) => ({
  address: null,
  setAddress: (address) => set({ address }),
});
