import { Text } from "@/lib/ui/Text";
import { useStore } from "@/store";
import {
  AccountController,
  BlockchainApiController,
} from "@reown/appkit-core-react-native";
import { useEffect } from "react";
import { Image, View } from "react-native";
import { useSnapshot } from "valtio";
import { useShallow } from "zustand/shallow";

export function Balance() {
  const { tokenBalance } = useSnapshot(AccountController.state);
  const ethToken = tokenBalance?.find(({ symbol }) => symbol === "ETH");
  const { address, chainId } = useStore(
    useShallow(({ address, chainId }) => ({
      address,
      chainId,
    })),
  );

  useEffect(() => {
    const fetch = async () => {
      if (!address || !chainId) return;
      const response = await BlockchainApiController.getBalance(
        address,
        chainId,
      );
      if (response?.balances?.length) {
        AccountController.setTokenBalance(response.balances);
      }
    };
    fetch();
  }, [address, chainId]);

  if (!ethToken) return null;

  return (
    <View className="bg-zinc mx-4 mt-4 rounded-2xl p-4">
      <View className="mb-2 flex-row items-center">
        {ethToken.iconUrl && (
          <Image source={{ uri: ethToken.iconUrl }} className="mr-2 h-6 w-6" />
        )}
        <Text className="text-gray text-sm">Ethereum (ETH)</Text>
      </View>
      <Text className="text-lg font-medium">
        {parseFloat(ethToken.quantity.numeric).toFixed(6)} ETH
      </Text>
      <Text className="text-gray text-sm">
        ${ethToken.price.toFixed(2)} per ETH
      </Text>
      <Text className="text-primary mt-1 text-xl font-semibold">
        ≈ ${ethToken.value?.toFixed(2)}
      </Text>
    </View>
  );
}
