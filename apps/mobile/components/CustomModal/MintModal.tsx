import { useCustomTheme } from "@/hooks/useCustomTheme";
import { Text } from "@/lib/ui/Text";
import { useStore } from "@/store";
import { copyToClipboard } from "@/utils/clipboard";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export const MintModal = () => {
  const data = useStore(({ data }) => data);
  const { colors } = useCustomTheme();

  return (
    data &&
    "address" in data && (
      <>
        <Text className="text-background">Your Wallet QR</Text>
        <QRCode value={data.address} size={180} />
        <View className="flex flex-row items-center gap-4">
          <Text className="text-background text-sm">{data.address}</Text>
          <Pressable
            onPress={() => copyToClipboard(data.address, "Address copied")}
            className="items-center justify-center"
          >
            <Ionicons name="copy" size={14} color={colors.background} />
          </Pressable>
        </View>
      </>
    )
  );
};
