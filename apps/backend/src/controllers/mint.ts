import { uploadToPinata } from "@/services/mint";
import { Request, Response } from "express";

export async function uploadMetadata(req: Request, res: Response) {
  const { title, description } = req.body;
  if (!req.file) return res.status(400).json({ message: "File is required" });

  const metadataUri = await uploadToPinata(req.file, title, description);

  res.json({ metadataUri });
}
