import "@/config/web3";
import "@/global.css";
import { useLoadFonts } from "@/hooks/useLoadFonts";
import { AppKit } from "@reown/appkit-ethers5-react-native";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView className="bg-background text-foreground flex-1">
      <Slot />
      <AppKit />
      <Toast />
    </SafeAreaView>
  );
}
