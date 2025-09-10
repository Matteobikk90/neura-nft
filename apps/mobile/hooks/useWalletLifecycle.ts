import { upsertUser } from "@/queries/user";
import { useStore } from "@/store";
import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
  useWalletInfo,
} from "@reown/appkit-ethers5-react-native";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { useShallow } from "zustand/shallow";

export function useWalletLifecycle() {
  const { setWalletInfo, clearWalletInfo, address } = useStore(
    useShallow(({ setWalletInfo, clearWalletInfo, address }) => ({
      setWalletInfo,
      clearWalletInfo,
      address,
    })),
  );

  const { walletInfo } = useWalletInfo();
  const { chainId } = useAppKitAccount();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();

  const { mutate } = useMutation({ mutationFn: upsertUser });

  const isAuthenticated = !!address;

  useEffect(() => {
    if (walletInfo && address && chainId) {
      setWalletInfo({
        address,
        chainId: String(chainId),
        providerName: walletInfo.name ?? null,
        icon: walletInfo.icon ?? null,
        url: walletInfo.url ?? null,
      });

      mutate({
        address,
        chainId: String(chainId),
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
  }, [address, chainId, walletInfo, setWalletInfo, mutate]);

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

  return { isAuthenticated, address, walletInfo, handlePress };
}
