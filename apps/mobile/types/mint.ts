export type MintNFTPayload = {
  metadataUri: string;
};

export type UploadMetadataType =
  | FormData
  | {
      title: string;
      description: string;
      to: string;
      base64: string;
    };
