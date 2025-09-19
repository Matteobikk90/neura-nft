import { z } from "zod";

export const createMintSchema = z.object({
  title: z.string().min(1, "Title required"),
  description: z.string().min(1, "Description required"),
  to: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
});
