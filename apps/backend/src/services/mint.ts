import { pinata } from "@/config/pinata";
import { PINATA_GATEWAY } from "@/constants/urls";

async function uploadMetadataToPinata(
  title: string,
  description: string,
  imageCid: string,
) {
  const metadata = {
    name: title,
    description,
    image: `ipfs://${imageCid}`,
  };

  const { cid } = await pinata.upload.public
    .json(metadata)
    .name(`${title}.json`);

  return `https://${PINATA_GATEWAY}/${cid}`;
}

export async function uploadToPinataBase64(
  base64: string,
  title: string,
  description: string,
) {
  const buffer = Buffer.from(base64.split(",")[1], "base64");
  const blob = new Blob([buffer], { type: "image/png" });
  const file = new File([blob], `${title}.png`, { type: "image/png" });

  const { cid } = await pinata.upload.public
    .file(file)
    .name(`${title}.png`)
    .keyvalues({
      title,
      description,
    });

  return uploadMetadataToPinata(title, description, cid);
}
