import { Text } from "@/lib/ui/Text";
import { useStore } from "@/store";
import { copyToClipboard } from "@/utils/clipboard";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Pressable, View } from "react-native";
import { useShallow } from "zustand/shallow";

export default function WalletStatus() {
  const theme = useTheme();
  const { address, provider, openModal } = useStore(
    useShallow(({ address, provider, openModal }) => ({
      address,
      provider,
      openModal,
    })),
  );

  if (!address) return null;

  return (
    <View className="bg-zinc flex w-full flex-row items-center justify-between rounded-md p-4">
      <View className="flex-row items-center gap-2">
        <View className="bg-primary/40 h-10 w-10 items-center justify-center rounded-md">
          <Ionicons name="wallet" size={18} color={theme.colors.primary} />
        </View>
        <View>
          <Text className="text-gray text-sm">Connected as</Text>
          <View className="flex flex-row items-center gap-1">
            {provider && <Text className="text-primary">{provider}</Text>}
            <Text className="text-gray">
              {address.slice(0, 6)}...{address.slice(-4)}
            </Text>
            <Pressable
              onPress={() => copyToClipboard(address, "Address copied")}
              className="items-center justify-center"
            >
              <Ionicons name="copy" size={14} color="white" />
            </Pressable>
          </View>
        </View>
      </View>

      <Pressable
        className="h-10 w-10 items-center justify-center rounded-md bg-zinc-700"
        onPress={() => openModal("qr", { address })}
      >
        <Ionicons name="qr-code-sharp" size={18} color="white" />
      </Pressable>
    </View>
  );
}
