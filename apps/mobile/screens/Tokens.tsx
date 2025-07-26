import { LottieViewWrapper } from "@/components/Lottie/ViewWrappet";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { Text } from "@/lib/ui/Text";
import { getEthOverview } from "@/queries/token";
import { useStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { FlatList, Image, Pressable, View } from "react-native";
import { useShallow } from "zustand/shallow";

export default function TokenList() {
  const theme = useCustomTheme();
  const { address, openModal, tokenSortBy } = useStore(
    useShallow(({ address, openModal, tokenSortBy }) => ({
      address,
      openModal,
      tokenSortBy,
    })),
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["eth-overview", address],
    queryFn: () => getEthOverview(address!),
    enabled: !!address,
  });

  const sortedBalances = useMemo(() => {
    if (!data?.balances) return [];

    return [...data.balances].sort((a, b) => {
      if (tokenSortBy === "name") {
        return a.symbol.localeCompare(b.symbol);
      }

      if (tokenSortBy === "amount") {
        return parseFloat(b.quantity.numeric) - parseFloat(a.quantity.numeric);
      }

      return (b.value ?? 0) - (a.value ?? 0);
    });
  }, [data?.balances, tokenSortBy]);

  return (
    <View className="bg-foreground w-full flex-1 p-4">
      <View className="my-6 flex-row items-center justify-between">
        <Text className="text-background font-jetmono-semiBold text-3xl">
          All Tokens
        </Text>
        <Pressable
          className="bg-zinc flex-row items-center gap-2 rounded-full px-4 py-2"
          onPress={() => openModal("filter", {})}
        >
          <Ionicons name="filter" size={20} color={theme.colors.background} />
          <Text className="text-background text-sm">Filter</Text>
        </Pressable>
      </View>

      {isLoading && <LottieViewWrapper type="loading" message="Loading ..." />}
      {error && (
        <LottieViewWrapper type="error" message="Failed to load transactions" />
      )}

      <FlatList
        data={sortedBalances ?? []}
        keyExtractor={({ address, symbol }) => address + symbol}
        ListEmptyComponent={
          <LottieViewWrapper type="empty" message="No recent transactions." />
        }
        renderItem={({ item }) => (
          <View className="bg-zinc mb-4 flex-row items-center justify-between rounded-md p-6">
            <View className="flex-row items-center gap-2">
              {item.iconUrl && (
                <Image
                  source={{ uri: item.iconUrl }}
                  style={{ width: 30, height: 30 }}
                />
              )}
              <Text className="text-background">{item.symbol}</Text>
            </View>
            <View className="items-end">
              <Text className="text-background">
                {parseFloat(item.quantity.numeric).toFixed(4)}
              </Text>
              <Text className="text-primary text-sm">
                ≈ ${item.value?.toFixed(2)}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
