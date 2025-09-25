import { urlEndpoints } from "@/constants/urls";
import type { AlchemyNFT, OwnedNFT } from "@/types/nft-card";
import { axiosGet } from "@/utils/api";

export async function getExploreNFTs(address: string, category: string) {
  return axiosGet<{ owned: OwnedNFT[]; trending: AlchemyNFT[] }>(
    urlEndpoints.getNFTs,
    {
      params: { address, category },
    },
  );
}
