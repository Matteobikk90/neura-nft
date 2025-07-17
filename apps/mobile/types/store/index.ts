import type { ThemeSliceType } from "@/types/store/theme";
import type { WalletSliceType } from "@/types/store/wallet";

export type StoreState = WalletSliceType & ThemeSliceType;
