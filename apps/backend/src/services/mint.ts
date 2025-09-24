import { pinata } from "@/config/pinata";
import type { Express } from "express";

async function uploadMetadataToPinata(
  title: string,
  description: string,
  imageUrl: string,
): Promise<string> {
  const metadata = {
    name: title,
    description,
    image: imageUrl,
  };

  const res = await pinata.pinJSONToIPFS(metadata, {
    pinataMetadata: { name: title },
  });

  return `https://${process.env.PINATA_GATEWAY}/ipfs/${res.IpfsHash}`;
}

export async function uploadToPinataFile(
  file: Express.Multer.File,
  title: string,
  description: string,
): Promise<string> {
  // Upload image
  const imgRes = await pinata.pinFileToIPFS(file.buffer, {
    pinataMetadata: { name: file.originalname },
  });

  const imageUrl = `https://${process.env.PINATA_GATEWAY}/ipfs/${imgRes.IpfsHash}`;
  return uploadMetadataToPinata(title, description, imageUrl);
}

export async function uploadToPinataBase64(
  base64: string,
  title: string,
  description: string,
): Promise<string> {
  const buffer = Buffer.from(base64, "base64");

  const imgRes = await pinata.pinFileToIPFS(buffer, {
    pinataMetadata: { name: `${title}.png` },
  });

  const imageUrl = `https://${process.env.PINATA_GATEWAY}/ipfs/${imgRes.IpfsHash}`;
  return uploadMetadataToPinata(title, description, imageUrl);
}
