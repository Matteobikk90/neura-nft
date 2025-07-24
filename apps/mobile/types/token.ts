import type { Balance } from "@reown/appkit-common-react-native";

export type EthOverview = {
  balances: Balance[];
  priceChange: number;
};

export type PriceChangeType = { ethereum: { usd_24h_change: number } };
