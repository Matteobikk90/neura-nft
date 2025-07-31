import type { FilterSliceType } from "@/types/store/filter";
import type { ModalSliceType } from "@/types/store/modal";
import type { ThemeSliceType } from "@/types/store/theme";
import type { WalletSliceType } from "@/types/store/wallet";
import type { ExploreSliceType } from "./explore";

export type StoreState = WalletSliceType &
  ThemeSliceType &
  ModalSliceType &
  FilterSliceType &
  ExploreSliceType;
