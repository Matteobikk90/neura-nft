import { Balance } from "@/components/Wallet/Balance";
import { WalletStatus } from "@/components/Wallet/Status";
import { Transactions } from "@/components/Wallet/Transactions";
import { Text } from "@/lib/ui/Text";
import { useStore } from "@/store";
import { View } from "react-native";

export default function HomeScreen() {
  const address = useStore(({ address }) => address);

  return (
    <View className="bg-foreground flex-1 gap-8 p-4">
      {address && (
        <>
          <WalletStatus />
          <Balance />
          <Transactions />
        </>
      )}

      {!address && (
        <>
          <Text className="text-center text-3xl">🧠 NeuraNFT</Text>
          <Text className="text-center">
            Connect your wallet and start minting personalized AI NFTs.
          </Text>
        </>
      )}
    </View>
  );
}
