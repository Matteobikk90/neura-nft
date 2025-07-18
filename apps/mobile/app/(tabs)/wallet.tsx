import { Pressable, Text, View } from "react-native";
import {
  useAppKit,
  useAppKitError,
  useAppKitEvents,
  useAppKitState,
  useWalletInfo,
} from "@reown/appkit-ethers5-react-native";
import { useEffect } from "react";

export default function WalletScreen() {
  const { open } = useAppKit();
  const { walletInfo } = useWalletInfo();
  const { open: isOpen, selectedNetworkId } = useAppKitState();
  const { error } = useAppKitError();
  useAppKitEvents((event) => {
    console.log("AppKit Event:", event);
  });

  useEffect(() => {
    if (error) {
      console.log("AppKit error:", error);
    }
  }, [error]);

  console.log("Modal isOpen:", isOpen, "Selected network:", selectedNetworkId);
  console.log("Wallet Info:", walletInfo);

  return (
    <View className="flex h-full items-center justify-center">
      <Pressable onPress={() => open()}>
        <Text>Open Connect Modal</Text>
      </Pressable>
    </View>
  );
}
