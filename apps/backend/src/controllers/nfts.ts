import { getExploreNFTs } from "@/services/nfts";
import { Request, Response } from "express";

export const exploreNftsHandler = async (req: Request, res: Response) => {
  const { address, category } = req.query;

  if (
    !address ||
    !category ||
    typeof address !== "string" ||
    typeof category !== "string"
  ) {
    res.status(400).json({ message: "missing address or category" });
    return;
  }

  const { owned, trending } = await getExploreNFTs(address, category);
  res.json({ owned, trending });
};
