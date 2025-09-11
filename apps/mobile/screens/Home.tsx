import { sliderItems } from "@/constants/slides";
import { bottomPadding } from "@/constants/variables";
import { useWalletLifecycle } from "@/hooks/useWalletLifecycle";
import { Text } from "@/lib/ui/Text";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, Pressable, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import WalletScreen from "./Wallet";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const { isAuthenticated } = useWalletLifecycle();
  const [headerHeight, setHeaderHeight] = useState(0);

  if (isAuthenticated) {
    return <WalletScreen />;
  }

  return (
    <View className="bg-background flex-1">
      <View
        className="items-center justify-center gap-4 p-6 pb-0"
        onLayout={(event) => setHeaderHeight(event.nativeEvent.layout.height)}
      >
        <Text className="font-jetmono-semiBold text-center text-3xl">
          🧠 NeuraNFT
        </Text>
        <Text className="text-gray text-center text-lg">
          Connect your wallet from the{" "}
          <Pressable onPress={() => router.push("/profile")}>
            <Text className="text-primary font-jetmono-semiBold underline">
              Profile
            </Text>
          </Pressable>
          {"  "}
          screen to unlock all the features below and start minting personalized
          AI NFTs.
        </Text>
      </View>

      <Carousel
        loop
        width={width}
        height={height - headerHeight - bottomPadding}
        autoPlay
        autoPlayInterval={3000}
        data={sliderItems}
        scrollAnimationDuration={1000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 45,
        }}
        pagingEnabled
        renderItem={({ item }) => (
          <View className="flex-1">
            <View className="bg-primary border-primary flex h-[70%] w-full items-center rounded-md p-4">
              <Image
                source={item.uri}
                className="h-full w-[55%] object-cover"
              />
            </View>
            <View className="mt-3">
              <Text className="font-jetmono-semiBold text-center text-2xl">
                {item.title}
              </Text>
              <Text className="text-gray text-center text-lg">
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
