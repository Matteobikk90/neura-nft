import { urlEndpoints } from "@/constants/urls";
import { axiosPost } from "@/utils/api";

export async function uploadMetadata(
  formData: FormData,
): Promise<{ metadataUri: string }> {
  const res = await axiosPost<{ metadataUri: string }, FormData>(
    urlEndpoints.mint,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  if (!res) throw new Error("Upload failed");
  return res;
}
