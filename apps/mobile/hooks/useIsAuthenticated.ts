import { useStore } from "@/store";

export const useIsAuthenticated = () => useStore(({ address }) => !!address);
