export type MintSliceType = {
  title: string;
  description: string;
  image: string | null;
  prompt: string;
  isAImintMode: boolean;
  author: string;
  toggleMintMode: () => void;
  setMintInfo: (
    info: Partial<
      Pick<
        MintSliceType,
        "title" | "description" | "image" | "prompt" | "author"
      >
    >,
  ) => void;
  clearMintForm: () => void;
  setSelectedCategory: (selectedCategory: string) => void;
  selectedCategory: string;
};
