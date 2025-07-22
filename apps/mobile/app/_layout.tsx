import { CustomModal } from "@/components/CustomModal";
import "@/config/web3";
import "@/global.css";
import { useLoadFonts } from "@/hooks/useLoadFonts";
import { navTheme } from "@/lib/theme/navTheme";
import {
  useColorScheme,
  useInitialAndroidBarSync,
} from "@/lib/theme/useColorScheme";
import { ThemeProvider } from "@react-navigation/native";
import { AppKit } from "@reown/appkit-ethers5-react-native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  useInitialAndroidBarSync();
  const fontsLoaded = useLoadFonts();
  const { isDarkColorScheme } = useColorScheme();

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? "light" : "dark"}`}
        style={isDarkColorScheme ? "light" : "dark"}
      />

      <ThemeProvider value={isDarkColorScheme ? navTheme.dark : navTheme.light}>
        <SafeAreaView className="bg-background flex-1">
          <Slot />
          <AppKit />
          <Toast />
          <CustomModal />
        </SafeAreaView>
      </ThemeProvider>
    </>
  );
}
