import { lazy } from "react";
import { Suspense } from "react";
import { View } from "react-native";
const WalletScreen = lazy(() => import("@/screens/WalletsScreen"));

export default function WalletTab() {
  return (
    <View className="flex h-full items-center justify-center">
      <Suspense fallback={null}>
        <WalletScreen />
      </Suspense>
    </View>
  );
}
