import type { ImageSourcePropType } from "react-native";

type NFTAttribute = {
  trait_type: string;
  value: string | number;
  display_type?: string;
};

export type AlchemyNFT = {
  media: { gateway: string; thumbnail: string }[];
  title?: string;
  metadata?: {
    name?: string;
    attributes: NFTAttribute[];
    image: string;
    description: string;
    author: string;
  };
  contract: { address: string };
  contractMetadata?: {
    name: string;
    contractDeployer?: string;
    author: string;
  };
  id: { tokenId: string };
};

export type OwnedNFT = {
  tokenId: string;
  raw: {
    metadata: {
      name: string;
      description: string;
      image: string;
      author: string;
    };
  };
};

export type NFTCardType = {
  image: ImageSourcePropType;
  title: string;
  creator: string;
};
