import type { SortType } from "@/types/store/filter";

export const filters: { label: string; id: SortType }[] = [
  { label: "Name (A-Z)", id: "name" },
  { label: "Amount (High → Low)", id: "amount" },
  { label: "Value (High → Low)", id: "value" },
];
