import { lazy, Suspense } from "react";
import { View } from "react-native";
const ProfileScreen = lazy(() => import("@/screens/Profile"));

export default function Profile() {
  return (
    <View className="flex h-full items-center justify-center">
      <Suspense fallback={null}>
        <ProfileScreen />
      </Suspense>
    </View>
  );
}
