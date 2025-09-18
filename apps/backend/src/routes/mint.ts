import { uploadMetadata } from "@/controllers/mint";
import { asyncHandler } from "@/handlers/async";
import { authRateLimiter } from "@/middleware/rate-limit";
import { validateBody } from "@/middleware/validate";
import { createMintSchema } from "@/validations/mint";
import { Router } from "express";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  authRateLimiter,
  upload.single("file"),
  validateBody(createMintSchema),
  asyncHandler(uploadMetadata),
);

export default router;
