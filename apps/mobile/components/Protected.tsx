import { useWalletLifecycle } from "@/hooks/useWalletLifecycle";
import { router } from "expo-router";
import type { ReactNode } from "react";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export default function Protected({ children }: { children: ReactNode }) {
  const isAuth = useWalletLifecycle();

  useEffect(() => {
    if (!isAuth) {
      Toast.show({
        type: "info",
        text1: "Access Denied",
        text2: "Please connect your wallet to use this feature",
      });
      router.replace("/profile");

      //   const timeout = setTimeout(() => {
      //       router.replace("/wallet");
      //     }, 100);

      //     return () => clearTimeout(timeout);
    }
  }, [isAuth]);

  if (!isAuth) return null;

  return <>{children}</>;
}
