import { nftContract } from "@/services/contract";
import { uploadToPinataBase64 } from "@/services/mint";
import { Request, Response } from "express";

export async function uploadAndMint(req: Request, res: Response) {
  const { title, description, to, base64 } = req.body;

  if (!to) {
    return res.status(400).json({ message: "Recipient address required" });
  }

  const metadataUri = await uploadToPinataBase64(base64, title, description);

  const tx = await nftContract.mintNFT(to, metadataUri);
  await tx.wait();

  res.json({
    message: "✅ NFT minted successfully",
    metadataUri,
    txHash: tx.hash,
  });
}
