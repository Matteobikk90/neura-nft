import { createFilterSlice } from "@/store/slices/filter";
import { createModalSlice } from "@/store/slices/modal";
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
      ...createModalSlice(set, get, store),
      ...createFilterSlice(set, get, store),
    })),
    {
      name: "global-store",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      partialize: ({
        darkMode,
        address,
        chainId,
        providerName,
        icon,
        url,
      }) => ({
        darkMode,
        address,
        chainId,
        providerName,
        icon,
        url,
      }),
    },
  ),
);
