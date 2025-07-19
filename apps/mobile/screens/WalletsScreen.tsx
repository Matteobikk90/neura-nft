import { useStore } from "@/store";
import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
  useWalletInfo,
} from "@reown/appkit-ethers5-react-native";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text } from "react-native";
import Toast from "react-native-toast-message";
import { useShallow } from "zustand/shallow";

export default function WalletsScreen() {
  const { setWalletInfo, clearWalletInfo } = useStore(
    useShallow(({ setWalletInfo, clearWalletInfo }) => ({
      setWalletInfo,
      clearWalletInfo,
    })),
  );

  const { open } = useAppKit();
  const { walletInfo } = useWalletInfo();
  const { address, chainId } = useAppKitAccount();
  const { disconnect } = useDisconnect();

  const isAuthenticated = !!address;

  useEffect(() => {
    if (walletInfo && address && chainId) {
      setWalletInfo({
        address,
        chainId,
        provider: walletInfo.name ?? null,
        icon: walletInfo.icon ?? null,
        url: walletInfo.url ?? null,
      });
      Toast.show({
        type: "success",
        text1: "Wallet connected",
        text2: `${walletInfo.name ?? "Wallet"} connected successfully`,
      });
      router.replace("/");
    }
  }, [address, chainId, walletInfo, setWalletInfo]);

  const handlePress = () => {
    if (isAuthenticated) {
      disconnect();
      clearWalletInfo();
      Toast.show({
        type: "info",
        text1: "Disconnected",
        text2: "Wallet disconnected",
      });
    } else {
      open();
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <Text>{isAuthenticated ? "Disconnect Wallet" : "Connect Wallet"}</Text>
    </Pressable>
  );
}
