import WalletStatus from "@/components/wallet/Status";
import { useStore } from "@/store";
import { Text, View } from "react-native";

export default function Home() {
  const address = useStore(({ address }) => address);

  return (
    <View className="flex-1 items-center bg-zinc-900 p-4">
      {address && <WalletStatus />}
      <Text className="mb-2 text-3xl text-white">🧠 NeuraNFT</Text>
      <Text className="text-center text-white">
        Connect your wallet and start minting personalized AI NFTs.
      </Text>
    </View>
  );
}
