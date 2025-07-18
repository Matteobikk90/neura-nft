import { createThemeSlice } from "@/store/slices/theme";
import { createWalletSlice } from "@/store/slices/wallet";
import type { StoreState } from "@/types/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";

export const useStore = create<StoreState>()(
  persist(
    subscribeWithSelector((set, get, store) => ({
      ...createThemeSlice(set, get, store),
      ...createWalletSlice(set, get, store),
    })),
    {
      name: "global-store",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      partialize: ({ darkMode, address, chainId, provider, icon, url }) => ({
        darkMode,
        address,
        chainId,
        provider,
        icon,
        url,
      }),
    },
  ),
);
