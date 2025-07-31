import { Text } from "@/lib/ui/Text";
import type { NFTCardType } from "@/types/nft-card";
import { Image, View } from "react-native";

export function NFTCard({ image, title, creator }: NFTCardType) {
  return (
    <View className="bg-zinc mr-4 w-36 overflow-hidden rounded-md">
      <Image
        source={image}
        style={{ width: "100%", height: 120 }}
        resizeMode="cover"
      />
      <Text
        className="text-background mt-2 px-2 text-sm font-bold"
        numberOfLines={1}
      >
        {title}
      </Text>
      <Text className="text-gray px-2 pb-2 text-xs" numberOfLines={1}>
        {creator}
      </Text>
    </View>
  );
}
