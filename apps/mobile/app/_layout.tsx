import "@/global.css";
import "@/config/web3";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import "@walletconnect/react-native-compat";
import "@ethersproject/shims";
import { AppKit } from "@reown/appkit-ethers5-react-native";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />
      <Slot />
      <AppKit />
    </SafeAreaView>
  );
}
