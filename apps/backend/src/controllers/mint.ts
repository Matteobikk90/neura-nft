import { pinata } from "@/config/pinata";
import { nftContract } from "@/services/contract";
import { Request, Response } from "express";

export async function uploadAndMint(req: Request, res: Response) {
  const { title, description, to, base64 } = req.body;

  if (!to)
    return res.status(400).json({ message: "Recipient address required" });
  let imageUpload;
  if (req.file) {
    imageUpload = await pinata.upload.public.file(
      new File([req.file.buffer], req.file.originalname, {
        type: req.file.mimetype,
      }),
    );
  } else if (base64) {
    imageUpload = await pinata.upload.public.base64({
      content: base64,
      name: `${title || "nft"}.png`,
    });
  } else {
    return res.status(400).json({ message: "No file or base64 provided" });
  }

  const imageUrl = `${process.env.PINATA_GATEWAY}/${imageUpload.IpfsHash}`;

  // STEP 2. Upload JSON metadata
  const metaUpload = await pinata.upload.public.json({
    name: title || "Untitled NFT",
    description: description || "",
    image: imageUrl,
  });

  const metadataUri = `${process.env.PINATA_GATEWAY}/${metaUpload.IpfsHash}`;

  const tx = await nftContract.mintNFT(to, metadataUri);
  await tx.wait();

  res.json({
    message: "✅ NFT minted successfully",
    metadataUri,
    txHash: tx.hash,
  });
}
