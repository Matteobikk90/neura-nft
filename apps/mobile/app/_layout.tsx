import "@/global.css";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />
      <Slot />
    </SafeAreaView>
  );
}
