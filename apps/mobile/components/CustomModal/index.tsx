import { MintModal } from "@/components/CustomModal/MintModal";
import { QrModal } from "@/components/CustomModal/Qr";
import { SortModal } from "@/components/CustomModal/Sort";
import { useStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import Modal from "react-native-modal";
import { useShallow } from "zustand/shallow";

export function CustomModal() {
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
      <View className="bg-zinc flex-col items-center justify-center gap-4 rounded-md p-4">
        <Pressable
          onPress={() => {
            closeModal();
            clearMintForm();
          }}
          className="absolute right-2 top-2 rounded-md bg-zinc-800 p-2"
        >
          <Ionicons name="close" size={20} color="#fff" />
        </Pressable>
        {type === "qr" && <QrModal />}
        {type === "filter" && <SortModal />}
        {type === "mint" && <MintModal />}
      </View>
    </Modal>
  );
}
