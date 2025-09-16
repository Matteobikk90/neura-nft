import { getUser, upsertUser } from "@/controllers/user";
import { asyncHandler } from "@/handlers/async";
import { authRateLimiter } from "@/middleware/rate-limit";
import { validateBody, validateQuery } from "@/middleware/validate";
import { createUserSchema, getUserSchema } from "@/validations/user";
import { Router } from "express";

const router = Router();

router.get("/", validateQuery(getUserSchema), asyncHandler(getUser));

router.post(
  "/",
  authRateLimiter,
  validateBody(createUserSchema),
  asyncHandler(upsertUser),
);

export default router;
