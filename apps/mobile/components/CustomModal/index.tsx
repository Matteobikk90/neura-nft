import { MintInfo } from "@/components/CustomModal/Info";
import { MintModal } from "@/components/CustomModal/MintModal";
import { QrModal } from "@/components/CustomModal/Qr";
import { SortModal } from "@/components/CustomModal/Sort";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { useStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import Modal from "react-native-modal";
import { useShallow } from "zustand/shallow";

export function CustomModal() {
  const { colors } = useCustomTheme();
  const { type, closeModal, clearMintForm } = useStore(
    useShallow(({ type, closeModal, clearMintForm }) => ({
      type,
      closeModal,
      clearMintForm,
    })),
  );

  return (
    <Modal
      isVisible={!!type}
      onBackdropPress={() => {
        closeModal();
        clearMintForm();
      }}
    >
      <View className="bg-zinc items-center justify-center gap-4 rounded-md p-4">
        <Pressable
          onPress={() => {
            closeModal();
            clearMintForm();
          }}
          className="bg-background absolute right-2 top-2 rounded-md p-2"
        >
          <Ionicons name="close" size={20} color={colors.foreground} />
        </Pressable>
        {type === "qr" && <QrModal />}
        {type === "filter" && <SortModal />}
        {type === "mint" && <MintModal />}
        {type === "info" && <MintInfo />}
      </View>
    </Modal>
  );
}
