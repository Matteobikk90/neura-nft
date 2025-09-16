import { urlEndpoints } from "@/constants/urls";
import type { MintNFTPayload } from "@/types/mint";
import { axiosPost } from "@/utils/api";

export async function mintNFT(payload: MintNFTPayload) {
  return axiosPost<{ txHash: string }, MintNFTPayload>(
    urlEndpoints.mint,
    payload,
  );
}
