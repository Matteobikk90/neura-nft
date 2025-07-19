import { Pressable, Text } from "react-native";
import {
  useAppKit,
  useAppKitAccount,
  useWalletInfo,
} from "@reown/appkit-ethers5-react-native";
import { useStore } from "@/store";
import { useEffect } from "react";

export default function WalletsScreen() {
  const setWalletInfo = useStore(({ setWalletInfo }) => setWalletInfo);
  const { open } = useAppKit();
  const { walletInfo } = useWalletInfo();
  const { address, chainId } = useAppKitAccount();

  useEffect(() => {
    if (walletInfo && address && chainId) {
      setWalletInfo({
        address,
        chainId,
        provider: walletInfo.name ?? null,
        icon: walletInfo.icon ?? null,
        url: walletInfo.url ?? null,
      });
    }
  }, [address, chainId, walletInfo, setWalletInfo]);

  return (
    <Pressable onPress={() => open()}>
      <Text>Open Connect Modal</Text>
    </Pressable>
  );
}
