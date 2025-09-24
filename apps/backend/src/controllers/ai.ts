import { nftService } from "@/services/ai";
import { Request, Response } from "express";

export async function generateNFTController(req: Request, res: Response) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const result = await nftService.generateNFT(prompt);
  res.json(result);
}
