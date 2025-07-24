import { urlEndpoints } from "@/constants/urls";
import type { EthOverview, PriceChangeType } from "@/types/token";
import { axiosGet } from "@/utils/api";
import {
  BlockchainApiController,
  OptionsController,
} from "@reown/appkit-core-react-native";

export const getEthOverview = async (
  address: string,
  chainId: string,
): Promise<EthOverview> => {
  const [balanceRes, priceChangeRes, txRes] = await Promise.all([
    BlockchainApiController.getBalance(address, chainId),
    axiosGet<PriceChangeType>(urlEndpoints.getPriceChange),
    BlockchainApiController.fetchTransactions({
      account: address,
      projectId: OptionsController.state.projectId,
    }),
  ]);

  const balances = balanceRes?.balances ?? [];
  const priceChange = priceChangeRes?.ethereum?.usd_24h_change;
  const transactions = txRes?.data ?? [];

  if (!balances.length) throw new Error("No ETH balances found");
  if (typeof priceChange !== "number")
    throw new Error("Invalid ETH price change");

  return { balances, priceChange, transactions };
};
