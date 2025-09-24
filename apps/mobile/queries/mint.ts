import { urlEndpoints } from "@/constants/urls";
import type { UploadMetadataType } from "@/types/mint";
import { axiosPost } from "@/utils/api";

export async function uploadMetadata(
  payload: UploadMetadataType,
): Promise<{ metadataUri: string }> {
  const isFormData = payload instanceof FormData;

  const res = await axiosPost<{ metadataUri: string }, UploadMetadataType>(
    urlEndpoints.mint,
    payload,
    isFormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : { headers: { "Content-Type": "application/json" } },
  );

  if (!res) throw new Error("Upload failed");
  return res;
}
