import { nftCategories } from "@/constants/nfts";
import { alchemyEnv } from "@/constants/urls";
import type { AlchemyResponseType } from "@/types/nft-card";
import { axiosGet } from "@/utils/api";

export async function getExploreNFTs(
  address: string,
  category: keyof typeof nftCategories,
) {
  const contractList = nftCategories[category];

  const [owned, trendingResults] = await Promise.all([
    axiosGet<AlchemyResponseType>(
      `https://eth-mainnet.g.alchemy.com/nft/v2/${alchemyEnv}/getNFTsForOwner?owner=${address}`,
    ).then((res) => res?.ownedNfts ?? []),

    Promise.all(
      contractList.map((contract) =>
        axiosGet<AlchemyResponseType>(
          `https://eth-mainnet.g.alchemy.com/nft/v2/${alchemyEnv}/getNFTsForCollection?contractAddress=${contract}&withMetadata=true`,
        ).then((res) => res?.nfts ?? []),
      ),
    ),
  ]);

  const trending = trendingResults
    .flat()
    .filter((nft) => nft.media?.[0]?.gateway || nft.media?.[0]?.thumbnail);

  return { owned, trending };
}
