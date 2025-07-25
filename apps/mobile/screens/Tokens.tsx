import { LottieViewWrapper } from "@/components/Lottie/ViewWrappet";
import { Text } from "@/lib/ui/Text";
import { getEthOverview } from "@/queries/token";
import { useStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Image, View } from "react-native";

export default function TokenList() {
  const address = useStore(({ address }) => address);

  const { data, isLoading, error } = useQuery({
    queryKey: ["eth-overview", address],
    queryFn: () => getEthOverview(address!),
    enabled: !!address,
  });

  return (
    <View className="bg-foreground w-full flex-1 p-4">
      <Text className="text-background font-jetmono-semiBold mb-4 text-3xl">
        All Tokens
      </Text>

      {isLoading && <LottieViewWrapper type="loading" message="Loading ..." />}
      {error && (
        <LottieViewWrapper type="error" message="Failed to load transactions" />
      )}

      <FlatList
        data={data?.balances ?? []}
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
