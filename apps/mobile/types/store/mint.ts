export type MintSliceType = {
  title: string;
  description: string;
  image: string | null;
  prompt: string;
  isAImintMode: boolean;
  toggleMintMode: () => void;
  setMintInfo: (
    info: Partial<
      Pick<MintSliceType, "title" | "description" | "image" | "prompt">
    >,
  ) => void;
  clearMintForm: () => void;
  setSelectedCategory: (selectedCategory: string) => void;
  selectedCategory: string;
};
