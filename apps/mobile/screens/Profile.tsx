import { LottieViewWrapper } from "@/components/Lottie/ViewWrappet";
import { SwitchTheme } from "@/components/SwitchTheme";
import { ConnectBtn } from "@/components/Wallet/ConnectBtn";
import { features } from "@/constants/variables";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { useWalletLifecycle } from "@/hooks/useWalletLifecycle";
import { Text } from "@/lib/ui/Text";
import { getUser } from "@/queries/user";
import { useStore } from "@/store";
import { copyToClipboard } from "@/utils/clipboard";
import { Ionicons } from "@expo/vector-icons";

import { useQuery } from "@tanstack/react-query";
import { FlatList, Image, Linking, Pressable, View } from "react-native";
import { useShallow } from "zustand/shallow";

export default function ProfileScreen() {
  const { colors } = useCustomTheme();
  const { address, providerName, openModal } = useStore(
    useShallow(({ address, providerName, openModal }) => ({
      address,
      providerName,
      openModal,
    })),
  );
  const { isAuthenticated } = useWalletLifecycle();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", address, providerName],
    queryFn: () => getUser(address!),
    enabled: isAuthenticated,
  });

  return (
    <View className="bg-background w-full flex-1 gap-8 p-4">
      <Text className="font-jetmono-semiBold mt-12 text-center text-3xl">
        Profile
      </Text>
      <SwitchTheme />

      {!isAuthenticated && (
        <View className="bg-foreground flex gap-4 rounded-md p-6 shadow-lg">
          <FlatList
            data={features}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Text className="text-background mb-2">• {item}</Text>
            )}
            scrollEnabled={false}
          />
          <ConnectBtn className="mx-auto" />
        </View>
      )}

      {isAuthenticated && isLoading && (
        <LottieViewWrapper type="loading" message="Loading your profile" />
      )}
      {isAuthenticated && error && (
        <LottieViewWrapper type="error" message="Failed to load your profile" />
      )}

      {isAuthenticated && data && (
        <View className="items-center gap-4">
          {data.icon && (
            <Image
              className="mb-3"
              source={{ uri: data.icon }}
              width={60}
              height={60}
              resizeMode="contain"
            />
          )}

          <View className="w-full gap-4">
            <View className="flex-row justify-between">
              <Text className="font-jetmono-semiBold">Wallet:</Text>
              <Text>{data.provider}</Text>
            </View>

            {data.url && (
              <View className="flex-row justify-between">
                <Text className="font-jetmono-semiBold">Url:</Text>
                <Pressable onPress={() => Linking.openURL(data.url!)}>
                  <Text className="text-primary underline">{data.url}</Text>
                </Pressable>
              </View>
            )}

            <View className="flex-row justify-between">
              <Text className="font-jetmono-semiBold">Address:</Text>
              <View className="flex-row items-center gap-2">
                <Pressable
                  onPress={() =>
                    copyToClipboard(data.address, "Address copied")
                  }
                  className="items-center justify-center"
                >
                  <Ionicons name="copy" size={14} color={colors.foreground} />
                </Pressable>
                <Text className="text-gray">
                  {data.address.slice(0, 10)}...{data.address.slice(-6)}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between">
              <Text className="font-jetmono-semiBold">Chain ID:</Text>
              <Text>{data.chainId}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="font-jetmono-semiBold">Last login:</Text>
              <Text>{new Date(data.lastLoginAt * 1000).toLocaleString()}</Text>
            </View>
          </View>

          <ConnectBtn className="mt-8" />
        </View>
      )}
    </View>
  );
}
