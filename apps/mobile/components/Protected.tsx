import { useIsAuthenticated } from "@/hooks/useIsAuthenticated";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useEffect } from "react";
import type { ReactNode } from "react";

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
