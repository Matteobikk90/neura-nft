export const proxyTarget = process.env.EXPO_PUBLIC_API_URL!;
export const alchemyEnv = process.env.EXPO_PUBLIC_ALCHEMY!;

export const urlEndpoints = {
  getPriceChange: "/api/token/price",
  getBalances: "/api/token/balances",
  getOwnedNfts: (address: string) =>
    `https://eth-mainnet.g.alchemy.com/nft/v2/${alchemyEnv}/getNFTsForOwner?owner=${address}`,
  getTrendingNfts: `https://eth-mainnet.g.alchemy.com/nft/v2/${alchemyEnv}/getNFTsForCollection?contractAddress=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&withMetadata=true`,
};
