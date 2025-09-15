export type MintSliceType = {
  title: string;
  description: string;
  image: string | null;
  setMintInfo: (
    info: Partial<Pick<MintSliceType, "title" | "description" | "image">>,
  ) => void;
  clearMintForm: () => void;
};
