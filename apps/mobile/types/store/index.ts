import type { ExploreSliceType } from "@/types/store/explore";
import type { FilterSliceType } from "@/types/store/filter";
import type { MintSliceType } from "@/types/store/mint";
import type { ModalSliceType } from "@/types/store/modal";
import type { ThemeSliceType } from "@/types/store/theme";
import type { WalletSliceType } from "@/types/store/wallet";

export type StoreState = WalletSliceType &
  ThemeSliceType &
  ModalSliceType &
  FilterSliceType &
  ExploreSliceType &
  MintSliceType;
