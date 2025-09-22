import { NftCategories } from "@/constants/nfts";
import { endpoints } from "@/constants/urls";
import axios from "axios";

export async function getExploreNFTs(address: string, category: string) {
  // --- Owned NFTs
  const { data: ownedData } = await axios.get(
    endpoints.alchemy.getOwnedNfts(address),
  );
  const owned = ownedData.ownedNfts || [];

  // --- Trending NFTs
  const contracts = NftCategories[category] || [];
  const trending = [];

  for (const contract of contracts) {
    try {
      const { data: colData } = await axios.get(
        endpoints.alchemy.getCollectionNfts(contract),
      );

      if (colData?.nfts) {
        for (const nft of colData.nfts) {
          const mediaUrl = nft.media?.[0]?.gateway || nft.media?.[0]?.thumbnail;

          if (mediaUrl && !mediaUrl.includes("ipfs")) {
            trending.push(nft);
          }
        }
      }
    } catch (err) {
      console.error("❌ Collection fetch error:", err);
    }
  }

  return { owned, trending };
}
