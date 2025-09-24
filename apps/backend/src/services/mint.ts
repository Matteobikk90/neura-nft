import { pinata } from "@/config/pinata";
import { PINATA_GATEWAY } from "@/constants/urls";

async function uploadMetadataToPinata(
  title: string,
  description: string,
  imageUrl: string,
) {
  const metadata = {
    name: title,
    description,
    image: imageUrl,
  };

  const { cid } = await pinata.upload.public.json(metadata).keyvalues({
    title,
    description,
  });

  return `https://${PINATA_GATEWAY}/ipfs/${cid}`;
}

export async function uploadToPinataBase64(
  base64: string,
  title: string,
  description: string,
) {
  const { cid } = await pinata.upload.public.base64(base64).keyvalues({
    title,
    description,
  });

  const imageUrl = `https://${PINATA_GATEWAY}/ipfs/${cid}`;

  return uploadMetadataToPinata(title, description, imageUrl);
}
