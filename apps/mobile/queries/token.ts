import { urlEndpoints } from "@/constants/urls";
import type { EthOverview } from "@/types/token";
import { axiosGet } from "@/utils/api";
import {
  BlockchainApiController,
  OptionsController,
  type BlockchainApiBalanceResponse,
} from "@reown/appkit-core-react-native";

export const getEthOverview = async (address: string): Promise<EthOverview> => {
  const [balanceRes, priceChangeRes, txRes] = await Promise.all([
    axiosGet<BlockchainApiBalanceResponse>(urlEndpoints.getBalances, {
      params: { address },
    }),
    axiosGet<{ priceChange: number }>(urlEndpoints.getPriceChange),
    BlockchainApiController.fetchTransactions({
      account: address,
      projectId: OptionsController.state.projectId,
    }),
  ]);

  const balances = balanceRes?.balances ?? [];
  console.log(balanceRes);
  const transactions = txRes?.data ?? [];
  const priceChange = priceChangeRes?.priceChange;

  if (!balances.length) throw new Error("No ETH balances found");
  if (typeof priceChange !== "number")
    throw new Error("Invalid ETH price change");

  return { balances, priceChange, transactions };
};
