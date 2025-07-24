import { urlEndpoints } from "@/constants/urls";
import type { EthOverview, PriceChangeType } from "@/types/token";
import { axiosGet } from "@/utils/api";
import { BlockchainApiController } from "@reown/appkit-core-react-native";

export const getEthOverview = async (
  address: string,
  chainId: string,
): Promise<EthOverview> => {
  const [balanceRes, priceChangeRes] = await Promise.all([
    BlockchainApiController.getBalance(address, chainId),
    axiosGet<PriceChangeType>(urlEndpoints.getPriceChange),
  ]);

  const balances = balanceRes?.balances ?? [];
  const priceChange = priceChangeRes?.ethereum?.usd_24h_change;

  if (!balances.length) {
    throw new Error("No ETH balances found");
  }

  if (typeof priceChange !== "number") {
    throw new Error("Invalid ETH price change");
  }

  return { balances, priceChange };
};
