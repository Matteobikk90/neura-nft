import type { ImageSourcePropType } from "react-native";

type NFTAttribute = {
  trait_type: string;
  value: string | number;
  display_type?: string;
};

export type AlchemyNFT = {
  media: { gateway: string; thumbnail: string }[];
  title?: string;
  metadata?: { name?: string; attributes: NFTAttribute[] };
  contract: { address: string };
  contractMetadata?: {
    name?: string;
    contractDeployer?: string;
  };
  id: { tokenId: string };
};

export type NFTCardType = {
  image: ImageSourcePropType;
  title: string;
  creator: string;
};

export type AlchemyResponseType = {
  ownedNfts: AlchemyNFT[];
  nfts: AlchemyNFT[];
};
