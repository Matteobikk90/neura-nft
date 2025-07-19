import { useFocusEffect } from "@react-navigation/native";
import { useIsAuthenticated } from "@/hooks/useIsAuthenticated";
import Toast from "react-native-toast-message";
import { useCallback } from "react";
import { router } from "expo-router";
import type { ReactNode } from "react";

export default function Protected({ children }: { children: ReactNode }) {
  const isAuth = useIsAuthenticated();

  useFocusEffect(
    useCallback(() => {
      if (!isAuth) {
        Toast.show({
          type: "info",
          text1: "Access Denied",
          text2: "Please connect your wallet to use this feature",
        });

        // Avoid crash by delaying redirect until after tab change finishes
        const timeout = setTimeout(() => {
          router.replace("/wallet");
        }, 100);

        return () => clearTimeout(timeout);
      }
    }, [isAuth]),
  );

  if (!isAuth) return null;

  return <>{children}</>;
}
