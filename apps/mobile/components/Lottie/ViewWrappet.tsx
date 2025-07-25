import { animations } from "@/constants/animations";
import { Text } from "@/lib/ui/Text";
import type { AnimationType } from "@/types/animations";
import LottieView from "lottie-react-native";
import { View } from "react-native";

export function LottieViewWrapper({
  type,
  message,
}: {
  type: AnimationType;
  message?: string;
}) {
  const animation = animations[type];

  if (!animation) return null;

  return (
    <View className="items-center">
      <LottieView
        source={animation}
        autoPlay
        loop
        style={{ width: 120, height: 120 }}
      />
      <Text className="text-gray">{message}</Text>
    </View>
  );
}
