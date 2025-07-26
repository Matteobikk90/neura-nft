export type SortType = "name" | "amount" | "value";

export type FilterSliceType = {
  tokenSortBy: SortType;
  setTokenSortBy: (sortBy: SortType) => void;
};
