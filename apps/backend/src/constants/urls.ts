import { ENV } from "@/config/env";

const ALCHEMY_BASE_URL = `https://eth-mainnet.g.alchemy.com/nft/v2/${ENV.ALCHEMY_API_KEY}`;

export const endpoints = {
  getPrice:
    "https://api.coingecko.com/api/v3/simple/price" +
    "?ids=ethereum&vs_currencies=usd&include_24hr_change=true",
  alchemy: {
    getOwnedNfts: (address: string) =>
      `${ALCHEMY_BASE_URL}/getNFTs?owner=${address}`,
    getCollectionNfts: (contract: string) =>
      `${ALCHEMY_BASE_URL}/getNFTsForCollection?contractAddress=${contract}&withMetadata=true`,
  },
  imgToPinata: "https://api.pinata.cloud/pinning/pinFileToIPFS",
  metaToPinata: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
};
