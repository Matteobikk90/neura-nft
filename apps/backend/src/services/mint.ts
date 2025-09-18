import { endpoints } from "@/constants/urls";
import axios from "axios";
import type { Express } from "express";
import FormData from "form-data";

export async function uploadToPinata(
  file: Express.Multer.File,
  title: string,
  description: string,
) {
  const formData = new FormData();
  formData.append("file", file.buffer, {
    filename: file.originalname,
    contentType: file.mimetype,
  });

  const imgRes = await axios.post(endpoints.imgToPinata, formData, {
    headers: {
      ...formData.getHeaders(),
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
  });

  const imageHash = imgRes.data.IpfsHash;

  const pinataContent = {
    name: title,
    description,
    image: `ipfs://${imageHash}`,
  };

  const metaRes = await axios.post(
    endpoints.metaToPinata,
    {
      pinataMetadata: { name: title },
      pinataContent,
    },
    {
      headers: { Authorization: `Bearer ${process.env.PINATA_JWT}` },
    },
  );

  return `ipfs://${metaRes.data.IpfsHash}`;
}
