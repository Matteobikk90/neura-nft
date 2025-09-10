import { useWalletLifecycle } from "@/hooks/useWalletLifecycle";
import { Text } from "@/lib/ui/Text";
import { Pressable } from "react-native";

export function ConnectBtn({ className }: { className?: string }) {
  const { isAuthenticated, handlePress } = useWalletLifecycle();

  return (
    <Pressable
      onPress={handlePress}
      className={className ?? "bg-primary rounded-lg px-6 py-3"}
    >
      <Text className="text-background">
        {isAuthenticated ? "Disconnect Wallet" : "Connect Wallet"}
      </Text>
    </Pressable>
  );
}
