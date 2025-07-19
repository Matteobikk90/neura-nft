import "@/global.css";
import "@/config/web3";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppKit } from "@reown/appkit-ethers5-react-native";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <Slot />
      <AppKit />
      <Toast />
    </SafeAreaView>
  );
}
