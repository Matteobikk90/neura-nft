export enum ExpandedSection {
  NONE = "NONE",
  TRENDING = "TRENDING",
  RECOMMENDED = "RECOMMENDED",
  OWNED = "OWNED",
  TRANSACTIONS = "TRANSACTIONS",
}

export type ExploreSliceType = {
  expandedSection: ExpandedSection;
  setExpandedSection: (section: ExpandedSection) => void;
};
