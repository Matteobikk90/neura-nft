import { Text } from "@/lib/ui/Text";
import { getEthOverview } from "@/queries/token";
import { useStore } from "@/store";
import type { EthOverview } from "@/types/token";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { View } from "react-native";

export function Balance() {
  const address = useStore(({ address }) => address);

  const { data } = useQuery<EthOverview>({
    queryKey: ["eth-overview", address],
    queryFn: () => getEthOverview(address!),
    enabled: !!address,
  });

  const totalUsd = useMemo(() => {
    return (
      data?.balances.reduce((acc, { value }) => acc + (value ?? 0), 0) ?? 0
    );
  }, [data]);

  if (!data) return null;

  return (
    <View className="bg-zinc rounded-md p-6">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-gray">Total Balance</Text>
        {typeof data?.priceChange === "number" && (
          <View
            className={`rounded-md p-2 ${
              data.priceChange >= 0 ? "bg-green/20" : "bg-red/20"
            }`}
          >
            <Text
              className={`font-jetmono-medium text-xs ${
                data.priceChange >= 0 ? "text-green" : "text-red"
              }`}
            >
              {data.priceChange >= 0 ? "+" : ""}
              {data.priceChange.toFixed(2)}%
            </Text>
          </View>
        )}
      </View>

      <Text className="font-jetmono-semiBold text-background text-4xl">
        ${totalUsd.toFixed(2)}
      </Text>
    </View>
  );
}
