import { View, Text } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-black px-4">
      <Text className="mb-2 text-3xl font-bold text-white">🧠 NeuraNFT</Text>
      <Text className="text-center text-base text-white">
        Connect your wallet and start minting personalized AI NFTs.
      </Text>
    </View>
  );
}
