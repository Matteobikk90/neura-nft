import { urlEndpoints } from "@/constants/urls";
import type { AlchemyNFT } from "@/types/nft-card";
import { axiosGet } from "@/utils/api";

export async function getExploreNFTs(address: string, category: string) {
  return axiosGet<{ owned: AlchemyNFT[]; trending: AlchemyNFT[] }>(
    urlEndpoints.getNFTs,
    {
      params: { address, category },
    },
  );
}
