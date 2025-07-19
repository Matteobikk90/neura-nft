import Protected from "@/components/Protected";
import { View, Text } from "react-native";

export default function Two() {
  return (
    <Protected>
      <View className="flex-1 items-center justify-center bg-black px-4">
        <Text className="mb-2 text-3xl font-bold text-white">🧠 NeuraNFT</Text>
        <Text className="text-center text-base text-white">2 </Text>
      </View>
    </Protected>
  );
}
