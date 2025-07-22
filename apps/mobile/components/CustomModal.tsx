import { Text } from "@/lib/ui/Text";
import { useStore } from "@/store";
import { copyToClipboard } from "@/utils/clipboard";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import Modal from "react-native-modal";
import QRCode from "react-native-qrcode-svg";
import { useShallow } from "zustand/shallow";

export function CustomModal() {
  const { type, data, closeModal } = useStore(
    useShallow(({ type, data, closeModal }) => ({
      type,
      data,
      closeModal,
    })),
  );

  return (
    <Modal isVisible={!!type} onBackdropPress={closeModal}>
      <View className="flex-col items-center justify-center gap-4 rounded-lg bg-zinc-900 p-4">
        <Pressable
          onPress={closeModal}
          className="absolute right-2 top-2 rounded-md bg-zinc-800 p-2"
        >
          <Ionicons name="close" size={20} color="#fff" />
        </Pressable>
        {type === "qr" && data && "address" in data && (
          <>
            <Text>Your Wallet QR</Text>
            <QRCode value={data.address} size={180} />
            <View className="flex flex-row items-center gap-4">
              <Text className="text-sm">{data.address}</Text>
              <Pressable
                onPress={() => copyToClipboard(data.address, "Address copied")}
                className="items-center justify-center"
              >
                <Ionicons name="copy" size={14} color="white" />
              </Pressable>
            </View>
          </>
        )}
        {/* Add more modal variants as needed */}
      </View>
    </Modal>
  );
}
