import WalletStatus from "@/components/Wallet/Status";
import { ThemeToggle } from "@/lib/theme/toggle";
import { Text } from "@/lib/ui/Text";
import { useStore } from "@/store";
import { View } from "react-native";

export default function Home() {
  const address = useStore(({ address }) => address);

  return (
    <View className="flex-1 items-center p-4">
      {address && <WalletStatus />}
      <Text className="mb-2 text-3xl">🧠 NeuraNFT</Text>
      <Text className="text-center">
        Connect your wallet and start minting personalized AI NFTs.
      </Text>
      <ThemeToggle />
    </View>
  );
}
