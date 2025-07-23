type BalanceType = {
  chainId: string;
  iconUrl?: string;
  name: string;
  price: number;
  quantity: {
    decimals: string;
    numeric: string;
  };
  symbol: string;
  value?: number;
};

export type WalletSliceType = {
  address: string | null;
  chainId: string | null;
  providerName: string | null;
  icon: string | null;
  url: string | null;
  tokenBalance: BalanceType[];
  setTokenBalance: (tokens: BalanceType[]) => void;
  setWalletInfo: (info: Partial<WalletSliceType>) => void;
  clearWalletInfo: () => void;
};
