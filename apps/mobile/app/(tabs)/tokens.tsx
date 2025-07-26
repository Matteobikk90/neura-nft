import { lazy, Suspense } from "react";
import { View } from "react-native";
const TokensScreen = lazy(() => import("@/screens/Tokens"));

export default function Tokens() {
  return (
    <View className="flex h-full items-center justify-center">
      <Suspense fallback={null}>
        <TokensScreen />
      </Suspense>
    </View>
  );
}
