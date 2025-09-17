import { priceHandler } from "@/controllers/price";
import { asyncHandler } from "@/handlers/async";
import { authRateLimiter } from "@/middleware/rate-limit";
import { Router } from "express";

const router = Router();

router.get("/price", authRateLimiter, asyncHandler(priceHandler));

export default router;
