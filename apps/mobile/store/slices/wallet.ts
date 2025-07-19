import type { WalletSliceType } from "@/types/store/wallet";
import { StateCreator } from "zustand";

export const createWalletSlice: StateCreator<WalletSliceType> = (set) => ({
  address: null,
  chainId: null,
  provider: null,
  icon: null,
  url: null,
  setWalletInfo: (info) => set((state) => ({ ...state, ...info })),
  clearWalletInfo: () =>
    set(() => ({
      address: null,
      chainId: null,
      provider: null,
      icon: null,
      url: null,
    })),
});
