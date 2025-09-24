import { urlEndpoints } from "@/constants/urls";
import type { AIGenerateResponse } from "@/types/ai-response";
import { axiosPost } from "@/utils/api";

export async function generateNFT(prompt: string) {
  const res = await axiosPost<AIGenerateResponse, { prompt: string }>(
    urlEndpoints.aiGenerate,
    { prompt },
  );

  if (!res) throw new Error("AI generation failed");
  return res;
}
