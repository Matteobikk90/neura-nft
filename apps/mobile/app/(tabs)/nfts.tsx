import Protected from "@/components/Protected";
import { Text } from "@/lib/nativewindui/Text";
import { View } from "react-native";

export default function NFTs() {
  return (
    <Protected>
      <View className="flex-1 items-center justify-center">
        <Text className="text-white">Your NFTs will appear here.</Text>
      </View>
    </Protected>
  );
}
