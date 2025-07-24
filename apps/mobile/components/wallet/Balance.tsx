import { Text } from "@/lib/ui/Text";
import { getEthOverview } from "@/queries/token";
import { useStore } from "@/store";
import type { EthOverview } from "@/types/token";
import { BlockchainApiController } from "@reown/appkit-core-react-native";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { View } from "react-native";
import { useShallow } from "zustand/shallow";

export function Balance() {
  const { address, chainId, tokenBalance, setTokenBalance } = useStore(
    useShallow((state) => ({
      address: state.address,
      chainId: state.chainId,
      tokenBalance: state.tokenBalance,
      setTokenBalance: state.setTokenBalance,
    })),
  );

  const { data } = useQuery<EthOverview>({
    queryKey: ["eth-overview", address, chainId],
    queryFn: () => getEthOverview(address!, chainId!),
    enabled: !!address && !!chainId,
  });

  const ethToken = useMemo(() => {
    return tokenBalance?.find((t) => t.symbol === "ETH");
  }, [tokenBalance]);

  useEffect(() => {
    const fetch = async () => {
      if (!address || !chainId) return;
      const response = await BlockchainApiController.getBalance(
        address,
        chainId,
      );
      if (response?.balances?.length) {
        setTokenBalance(response.balances);
      }
    };
    fetch();
  }, [address, chainId, setTokenBalance]);

  if (!ethToken) return null;

  return (
    <View className="bg-zinc mx-4 rounded-md p-6">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-gray">Total Balance</Text>
        {typeof data?.priceChange === "number" && (
          <View
            className={`rounded-md p-2 ${
              data?.priceChange >= 0 ? "bg-green-900" : "bg-red-900"
            }`}
          >
            <Text
              className={`font-jetmono-medium text-xs ${
                data?.priceChange >= 0 ? "text-green" : "text-red"
              }`}
            >
              {data?.priceChange >= 0 ? "+" : ""}
              {data?.priceChange.toFixed(2)}%
            </Text>
          </View>
        )}
      </View>

      <Text className="font-jetmono-semiBold text-4xl text-white">
        ${ethToken.value?.toFixed(2)}
      </Text>

      <View className="flex-row items-center">
        <Text className="text-gray text-sm">
          {parseFloat(ethToken.quantity.numeric).toFixed(6)} ETH
        </Text>
        <Text className="text-primary"> ≈ ${ethToken.price.toFixed(2)}</Text>
        <Text className="text-gray"> per ETH</Text>
      </View>
    </View>
  );
}
