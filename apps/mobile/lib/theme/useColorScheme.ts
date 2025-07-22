import * as NavigationBar from "expo-navigation-bar";
import { useColorScheme as useNativewindColorScheme } from "nativewind";
import * as React from "react";
import { Platform } from "react-native";

function useColorScheme() {
  const { colorScheme, setColorScheme: setNativewindColorScheme } =
    useNativewindColorScheme();

  async function setColorScheme(colorScheme: "light" | "dark") {
    setNativewindColorScheme(colorScheme);
    if (Platform.OS === "android") {
      try {
        await setNavigationBar(colorScheme);
      } catch (error) {
        console.error("Failed to set Android nav bar style", error);
      }
    }
  }

  function toggleColorScheme() {
    return setColorScheme(colorScheme === "light" ? "dark" : "light");
  }

  return {
    colorScheme: colorScheme ?? "light",
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}

function useInitialAndroidBarSync() {
  const { colorScheme } = useColorScheme();
  React.useEffect(() => {
    if (Platform.OS === "android") {
      setNavigationBar(colorScheme).catch((error) => {
        console.error("Failed to sync Android nav bar", error);
      });
    }
  }, [colorScheme]);
}

async function setNavigationBar(colorScheme: "light" | "dark") {
  await Promise.all([
    NavigationBar.setButtonStyleAsync(
      colorScheme === "dark" ? "light" : "dark",
    ),
    NavigationBar.setPositionAsync("absolute"),
    NavigationBar.setBackgroundColorAsync(
      colorScheme === "dark" ? "#00000030" : "#ffffff80",
    ),
  ]);
}

export { useColorScheme, useInitialAndroidBarSync };
