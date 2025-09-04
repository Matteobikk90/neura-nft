export const proxyTarget = process.env.EXPO_PUBLIC_API_URL!;
export const alchemyEnv = process.env.EXPO_PUBLIC_ALCHEMY!;

export const urlEndpoints = {
  getPriceChange: "/api/token/price",
  getBalances: "/api/token/balances",
  getTransactions: "/api/token/transactions",
  getNFTs: "/api/nfts",
};
