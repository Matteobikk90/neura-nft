import { nftContract } from "@/services/contract";
import { uploadToPinata } from "@/services/mint";
import { Request, Response } from "express";

export async function uploadAndMint(req: Request, res: Response) {
  const { title, description, to } = req.body;
  if (!req.file) return res.status(400).json({ message: "File is required" });
  if (!to)
    return res.status(400).json({ message: "Recipient address required" });

  const metadataUri = await uploadToPinata(req.file, title, description);

  const tx = await nftContract.mintNFT(to, metadataUri);
  await tx.wait();

  res.json({
    message: "✅ NFT minted successfully",
    metadataUri,
    txHash: tx.hash,
  });
}
