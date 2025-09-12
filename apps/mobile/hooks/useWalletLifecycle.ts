import { useStore } from "@/store";

export function useWalletLifecycle() {
  const address = useStore(({ address }) => address);
  const isAuthenticated = !!address;

  return { isAuthenticated, address };
}
