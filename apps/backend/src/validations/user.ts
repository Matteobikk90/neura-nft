import { z } from "zod";

export const createUserSchema = z.object({
  address: z.string().min(1),
  chainId: z.string().min(1),
  provider: z.string().nullable().optional(),
  icon: z.string().url().nullable().optional(),
  url: z.string().url().nullable().optional(),
});

export const getUserSchema = z.object({
  address: z.string().min(1),
});
