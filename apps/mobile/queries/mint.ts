import { urlEndpoints } from "@/constants/urls";
import type { UploadMetadataPayload } from "@/types/mint";
import { axiosPost } from "@/utils/api";

export async function uploadMetadata(
  payload: UploadMetadataPayload,
): Promise<{ metadataUri: string }> {
  const res = await axiosPost<{ metadataUri: string }, UploadMetadataPayload>(
    urlEndpoints.mint,
    payload,
  );

  if (!res) throw new Error("Upload failed");
  return res;
}
