import { Pressable, Text } from "react-native";
import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
  useWalletInfo,
} from "@reown/appkit-ethers5-react-native";
import { useStore } from "@/store";
import { useEffect } from "react";
import { router } from "expo-router";
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
      router.replace("/");
    }
  }, [address, chainId, walletInfo, setWalletInfo]);

  const handlePress = () => {
    if (isAuthenticated) {
      disconnect();
      clearWalletInfo();
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
