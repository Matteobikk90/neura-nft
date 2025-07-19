import { useIsAuthenticated } from "@/hooks/useIsAuthenticated";
import { Redirect } from "expo-router";
import type { ReactNode } from "react";

export default function Protected({ children }: { children: ReactNode }) {
  const isAuth = useIsAuthenticated();

  if (!isAuth) {
    return <Redirect href="/wallet" />;
  }

  return <>{children}</>;
}
