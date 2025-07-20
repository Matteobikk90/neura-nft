import { Text } from "@/lib/nativewindui/Text";
import { useStore } from "@/store";
import { copyToClipboard } from "@/utils/clipboard";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { useShallow } from "zustand/shallow";

export default function WalletStatus() {
  const { address, provider } = useStore(
    useShallow(({ address, provider }) => ({ address, provider })),
  );

  if (!address) return null;

  return (
    <View className="flex w-full flex-row items-center justify-between rounded-md bg-zinc-800 p-4">
      <View className="flex-row items-center gap-2">
        <View className="h-10 w-10 items-center justify-center rounded-full bg-violet-600/40">
          <Ionicons name="wallet" size={18} color="#8b5cf6" />
        </View>
        <View>
          <Text className="text-sm">Connected as</Text>
          <View className="flex flex-row items-center gap-1">
            {provider && <Text className="text-[#8b5cf6]">{provider}</Text>}
            <Text className="">
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

      <View className="h-10 w-10 items-center justify-center rounded-full bg-zinc-700">
        <Ionicons name="qr-code-sharp" size={18} color="white" />
      </View>
    </View>
  );
}
