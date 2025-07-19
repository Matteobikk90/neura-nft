export type WalletSliceType = {
  address: string | null;
  chainId: number | null;
  provider: string | null;
  icon: string | null;
  url: string | null;
  setWalletInfo: (info: Partial<WalletSliceType>) => void;
};
