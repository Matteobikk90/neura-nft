import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-black px-4">
      <Text className="text-white text-3xl font-bold mb-2">🧠 NeuraNFT</Text>
      <Text className="text-white text-base text-center">
        Connect your wallet and start minting personalized AI NFTs.
      </Text>
    </View>
  );
}
