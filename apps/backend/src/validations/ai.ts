import { z } from "zod";

export const createAISchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
});
