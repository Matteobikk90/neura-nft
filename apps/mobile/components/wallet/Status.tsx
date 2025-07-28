import { useCustomTheme } from "@/hooks/useCustomTheme";
import { Text } from "@/lib/ui/Text";
import { useStore } from "@/store";
import { copyToClipboard } from "@/utils/clipboard";
import { textFiltered } from "@/utils/formatter";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { useShallow } from "zustand/shallow";

export default function WalletStatus() {
  const { colors } = useCustomTheme();
  const { address, providerName, openModal } = useStore(
    useShallow(({ address, providerName, openModal }) => ({
      address,
      providerName,
      openModal,
    })),
  );

  if (!address) return null;

  return (
    <View className="bg-zinc flex w-full flex-row items-center justify-between rounded-md p-6">
      <View className="flex-row items-center gap-2">
        <View className="bg-primary/40 h-10 w-10 items-center justify-center rounded-md">
          <Ionicons name="wallet" size={18} color={colors.primary} />
        </View>
        <View>
          <Text className="text-gray text-sm">Connected as</Text>
          <View className="flex flex-row items-center gap-1">
            {providerName && (
              <Text className="text-primary">{textFiltered(providerName)}</Text>
            )}
            <Text className="text-gray">
              {address.slice(0, 6)}...{address.slice(-4)}
            </Text>
            <Pressable
              onPress={() => copyToClipboard(address, "Address copied")}
              className="items-center justify-center"
            >
              <Ionicons name="copy" size={14} color={colors.background} />
            </Pressable>
          </View>
        </View>
      </View>

      <Pressable
        className="bg-gray/40 h-10 w-10 items-center justify-center rounded-full"
        onPress={() => openModal("qr", { address })}
      >
        <Ionicons name="qr-code-sharp" size={18} color={colors.background} />
      </Pressable>
    </View>
  );
}
