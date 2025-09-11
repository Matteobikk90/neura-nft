import { Balance } from "@/components/Wallet/Balance";
import { WalletStatus } from "@/components/Wallet/Status";
import { Transactions } from "@/components/Wallet/Transactions";
import { View } from "react-native";

export default function WalletScreen() {
  return (
    <View className="bg-background flex-1 gap-8 p-4">
      <WalletStatus />
      <Balance />
      <Transactions />
    </View>
  );
}
