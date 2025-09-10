export const proxyTarget = process.env.EXPO_PUBLIC_API_URL!;

export const urlEndpoints = {
  getPriceChange: "/api/token/price",
  getBalances: "/api/token/balances",
  getTransactions: "/api/token/transactions",
  getNFTs: "/api/nfts",
  user: "/api/user",
};
