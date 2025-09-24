import { endpoints, PINATA_GATEWAY } from "@/constants/urls";
import axios from "axios";
import FormData from "form-data";

export async function uploadAIToPinata(
  buffer: Buffer,
  title: string,
  description: string,
) {
  const formData = new FormData();
  formData.append("file", buffer, {
    filename: `${title}.png`,
    contentType: "image/png",
  });

  // Upload image
  const imgRes = await axios.post(endpoints.imgToPinata, formData, {
    headers: {
      ...formData.getHeaders(),
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
  });

  const imageHash = imgRes.data.IpfsHash;
  const image = `${PINATA_GATEWAY}/${imageHash}`;

  // Upload metadata
  const pinataContent = {
    name: title,
    description,
    image,
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

  const metadataUri = `${PINATA_GATEWAY}/${metaRes.data.IpfsHash}`;

  return { metadataUri, image };
}
