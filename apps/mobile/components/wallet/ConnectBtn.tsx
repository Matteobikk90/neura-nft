// components/Wallet/ConnectBtn.tsx
import { cn } from "@/lib/theme/cn";
import { Text } from "@/lib/ui/Text";
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
import { Pressable } from "react-native";
import Toast from "react-native-toast-message";
import { useShallow } from "zustand/shallow";

export function ConnectBtn({ className }: { className?: string }) {
  const { setWalletInfo, clearWalletInfo } = useStore(
    useShallow(({ setWalletInfo, clearWalletInfo }) => ({
      setWalletInfo,
      clearWalletInfo,
    })),
  );
  const { walletInfo } = useWalletInfo();
  const { address, chainId } = useAppKitAccount();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const { mutate } = useMutation({
    mutationFn: upsertUser,
  });

  const isAuthenticated = !!address;

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
  }, [address, chainId, walletInfo, mutate, setWalletInfo]);

  return (
    <Pressable
      onPress={handlePress}
      className={cn(className, "bg-primary rounded-lg px-6 py-3")}
    >
      <Text className="text-background">
        {isAuthenticated ? "Disconnect Wallet" : "Connect Wallet"}
      </Text>
    </Pressable>
  );
}
