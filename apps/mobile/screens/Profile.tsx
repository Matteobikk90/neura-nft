import { LottieViewWrapper } from "@/components/Lottie/ViewWrappet";
import { ConnectBtn } from "@/components/Wallet/ConnectBtn";
import { useWalletLifecycle } from "@/hooks/useWalletLifecycle";
import { Text } from "@/lib/ui/Text";
import { getUser } from "@/queries/user";
import { useStore } from "@/store";

import { useQuery } from "@tanstack/react-query";
import { Image, Linking, Pressable, View } from "react-native";

export default function ProfileScreen() {
  const address = useStore(({ address }) => address);
  const { isAuthenticated } = useWalletLifecycle();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", address],
    queryFn: () => getUser(address!),
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <ConnectBtn />
      </View>
    );
  }

  if (isLoading)
    return <LottieViewWrapper type="loading" message="Loading your profile" />;
  if (error)
    return (
      <LottieViewWrapper type="error" message="Failed to load your profile" />
    );
  if (!data) return <Text>No user found</Text>;

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      {data.icon && (
        <Image
          source={{ uri: data.icon }}
          style={{ width: 60, height: 60, marginBottom: 12 }}
          resizeMode="contain"
        />
      )}

      <Text style={{ marginBottom: 6 }}>{data.provider || "Wallet"}</Text>

      {data.url && (
        <Pressable onPress={() => Linking.openURL(data.url!)}>
          <Text style={{ color: "#8B5CF6" }}>{data.url}</Text>
        </Pressable>
      )}

      <Text style={{ marginTop: 12 }}>
        Address: {data.address.slice(0, 6)}...{data.address.slice(-4)}
      </Text>
      <Text>Chain ID: {data.chainId}</Text>
      <Text style={{ marginTop: 6, opacity: 0.7 }}>
        Last login: {new Date(data.lastLoginAt * 1000).toLocaleString()}
      </Text>

      <ConnectBtn />
    </View>
  );
}
