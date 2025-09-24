export type MintNFTPayload = {
  metadataUri: string;
};

export type UploadMetadataPayload = {
  title: string;
  description: string;
  to: string;
  base64: string;
};
