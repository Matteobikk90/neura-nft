import { lazy, Suspense } from "react";
import { View } from "react-native";
const NftsScreen = lazy(() => import("@/screens/Nfts"));

export default function Nfts() {
  return (
    <View className="flex h-full items-center justify-center">
      <Suspense fallback={null}>
        <NftsScreen />
      </Suspense>
    </View>
  );
}
