import Protected from "@/components/Protected";
import { Text } from "@/lib/ui/Text";
import { View } from "react-native";

export default function NFTs() {
  return (
    <Protected>
      <View className="flex-1 items-center justify-center">
        <Text>Your NFTs will appear here.</Text>
      </View>
    </Protected>
  );
}
