import { lazy, Suspense } from "react";
import { View } from "react-native";
const HomeScreen = lazy(() => import("@/screens/Home"));

export default function Home() {
  return (
    <View className="flex h-full items-center justify-center">
      <Suspense fallback={null}>
        <HomeScreen />
      </Suspense>
    </View>
  );
}
