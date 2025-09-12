import { LottieViewWrapper } from "@/components/Lottie/ViewWrappet";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { Text } from "@/lib/ui/Text";
import { getEthOverview } from "@/queries/token";
import { useStore } from "@/store";
import { ExpandedSection } from "@/types/store/explore";
import { formatDateTime } from "@/utils/formatter";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Pressable, View } from "react-native";
import { useShallow } from "zustand/shallow";

export function Transactions() {
  const { colors } = useCustomTheme();
  const { address, expandedSection, setExpandedSection } = useStore(
    useShallow(({ address, expandedSection, setExpandedSection }) => ({
      address,
      expandedSection,
      setExpandedSection,
    })),
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["eth-overview", address],
    queryFn: () => getEthOverview(address!),
    enabled: !!address,
  });

  const handleToggle = () =>
    setExpandedSection(
      expandedSection === ExpandedSection.TRANSACTIONS
        ? ExpandedSection.NONE
        : ExpandedSection.TRANSACTIONS,
    );

  return (
    <View>
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-background font-jetmono-semiBold text-2xl">
          Recent Transactions
        </Text>
        {data && data.transactions.length >= 5 && (
          <Pressable onPress={handleToggle}>
            <Text className="text-primary text-sm">
              {expandedSection === ExpandedSection.TRANSACTIONS
                ? "Show less"
                : "See all"}
            </Text>
          </Pressable>
        )}
      </View>

      {isLoading && <LottieViewWrapper type="loading" message="Loading ..." />}
      {error && (
        <LottieViewWrapper type="error" message="Failed to load transactions" />
      )}

      {data && (
        <FlatList
          data={
            expandedSection === ExpandedSection.TRANSACTIONS
              ? data.transactions
              : data.transactions.slice(0, 5)
          }
          keyExtractor={({ metadata }) => metadata.hash}
          ListEmptyComponent={
            <LottieViewWrapper type="empty" message="No recent transactions." />
          }
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
                    ? colors.yellow
                    : direction === "in"
                      ? colors.green
                      : colors.red
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

            const time = formatDateTime(item.metadata.minedAt);

            return (
              <View className="bg-zinc mb-2 flex-row items-center rounded-md p-6">
                <View
                  className={`mr-3 h-10 w-10 items-center justify-center rounded-full ${bgColor}`}
                >
                  {icon}
                </View>
                <View className="flex-1">
                  <Text className="font-jetmono-medium text-background">
                    {title} {symbol}
                  </Text>
                  <Text className="text-gray text-sm">{time}</Text>
                </View>
                <View className="items-end">
                  <Text className="font-jetmono-medium text-background">
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
