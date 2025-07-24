import { useCustomTheme } from "@/hooks/useCustomTheme";
import { Text } from "@/lib/ui/Text";
import { getEthOverview } from "@/queries/token";
import { useStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { FlatList, View } from "react-native";
import { useShallow } from "zustand/shallow";
// import { formatRelativeDateTime } from "@/utils/date";

export function Transactions() {
  const theme = useCustomTheme();
  const { address, chainId } = useStore(
    useShallow((s) => ({ address: s.address, chainId: s.chainId })),
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["eth-overview", address, chainId],
    queryFn: () => getEthOverview(address!, chainId!),
    enabled: !!address && !!chainId,
  });

  return (
    <View className="mx-4 mt-4">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="font-jetmono-semiBold">Recent Transactions</Text>
        <Text className="text-primary text-sm uppercase">See all</Text>
      </View>

      {isLoading && <Text className="text-gray">Loading...</Text>}
      {error && <Text className="text-red">Failed to load transactions</Text>}

      {data && (
        <FlatList
          data={data.transactions.slice(0, 5)}
          keyExtractor={({ metadata }) => metadata.hash}
          renderItem={({ item }) => {
            const transfer = item.transfers[0];
            const amount = parseFloat(transfer.quantity.numeric).toFixed(3);
            const usd = transfer.value?.toFixed(2);
            const direction = transfer.direction;
            const symbol = transfer.fungible_info?.symbol ?? "ETH";

            const isSwap = item.metadata.operationType === "swap";

            const icon = (
              <Ionicons
                name={
                  isSwap
                    ? "swap-horizontal"
                    : direction === "in"
                      ? "arrow-down"
                      : "arrow-up"
                }
                size={18}
                color={
                  isSwap
                    ? theme.colors.yellow
                    : direction === "in"
                      ? theme.colors.green
                      : theme.colors.red
                }
              />
            );

            const bgColor = isSwap
              ? "bg-yellow/20"
              : direction === "in"
                ? "bg-green/20"
                : "bg-red/20";

            const title = isSwap
              ? "Swapped"
              : direction === "in"
                ? "Received"
                : "Sent";

            // const time = formatRelativeDateTime(item.metadata.minedAt);

            return (
              <View className="bg-zinc mb-2 flex-row items-center rounded-xl px-4 py-3">
                <View
                  className={`mr-4 h-8 w-8 items-center justify-center rounded-full ${bgColor}`}
                >
                  {icon}
                </View>
                <View className="flex-1">
                  <Text className="font-jetmono-medium text-white">
                    {title} {symbol}
                  </Text>
                  <Text className="text-gray text-sm">{"jk"}</Text>
                  {/* <Text className="text-gray text-sm">{time}</Text> */}
                </View>
                <View className="items-end">
                  <Text className="font-jetmono-medium text-white">
                    {direction === "in" ? "+" : "-"}
                    {amount} {symbol}
                  </Text>
                  <Text className="text-gray text-sm">${usd}</Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
