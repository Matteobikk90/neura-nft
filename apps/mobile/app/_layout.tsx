import "@/global.css";
import "@/config/web3";
import { Slot } from "expo-router";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppKit } from "@reown/appkit-ethers5-react-native";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <Slot />
      {Platform.OS !== "web" && <AppKit />}
    </SafeAreaView>
  );
}
