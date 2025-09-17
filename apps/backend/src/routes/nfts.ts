import { exploreNftsHandler } from "@/controllers/nfts";
import { asyncHandler } from "@/handlers/async";
import { Router } from "express";

const router = Router();

router.get("/", asyncHandler(exploreNftsHandler));

export default router;
