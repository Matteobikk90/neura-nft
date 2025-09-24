import { generateNFTController } from "@/controllers/ai";
import { asyncHandler } from "@/handlers/async";
import { authRateLimiter } from "@/middleware/rate-limit";
import { validateBody } from "@/middleware/validate";
import { createAISchema } from "@/validations/ai";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  authRateLimiter,
  validateBody(createAISchema),
  asyncHandler(generateNFTController),
);

export default router;
