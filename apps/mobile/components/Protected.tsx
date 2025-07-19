import { useIsAuthenticated } from "@/hooks/useIsAuthenticated";
import { router } from "expo-router";
import type { ReactNode } from "react";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export default function Protected({ children }: { children: ReactNode }) {
  const isAuth = useIsAuthenticated();

  useEffect(() => {
    if (!isAuth) {
      Toast.show({
        type: "info",
        text1: "Access Denied",
        text2: "Please connect your wallet to use this feature",
      });
      router.replace("/wallet");

      //   const timeout = setTimeout(() => {
      //       router.replace("/wallet");
      //     }, 100);

      //     return () => clearTimeout(timeout);
    }
  }, [isAuth]);

  if (!isAuth) return null;

  return <>{children}</>;
}
