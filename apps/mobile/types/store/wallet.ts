export type WalletSliceType = {
  address: string | null;
  chainId: string | null;
  providerName: string | null;
  icon: string | null;
  url: string | null;
  setWalletInfo: (info: Partial<WalletSliceType>) => void;
  clearWalletInfo: () => void;
};
