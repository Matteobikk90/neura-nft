import type { Balance, Transaction } from "@reown/appkit-common-react-native";

export type EthOverview = {
  balances: Balance[];
  priceChange: number;
  transactions: Transaction[];
};

export type PriceChangeResponseType = { ethereum: { usd_24h_change: number } };
