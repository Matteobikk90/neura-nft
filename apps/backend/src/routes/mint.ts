import { uploadAndMint } from "@/controllers/mint";
import { asyncHandler } from "@/handlers/async";
import { authRateLimiter } from "@/middleware/rate-limit";
import { validateBody } from "@/middleware/validate";
import { createMintSchema } from "@/validations/mint";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  authRateLimiter,
  validateBody(createMintSchema),
  asyncHandler(uploadAndMint),
);

export default router;
