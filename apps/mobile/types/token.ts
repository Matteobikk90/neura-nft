import type { Balance, Transaction } from "@reown/appkit-common-react-native";

export type EthOverview = {
  balances: Balance[];
  priceChange: number;
  transactions: Transaction[];
};

export type PriceChangeType = { ethereum: { usd_24h_change: number } };
