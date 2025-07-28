import nft1Img from "@/assets/images/nft1.jpeg";
import nft2Img from "@/assets/images/nft2.png";
import WalletStatus from "@/components/Wallet/Status";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { Text } from "@/lib/ui/Text";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, View } from "react-native";

const mockNFTs = [
  {
    id: "1",
    title: "Neon Horizon #142",
    creator: "CryptoArt Collection",
    image: nft1Img,
    tag: "Trending",
  },
  {
    id: "2",
    title: "CyberPunk #089",
    creator: "Metaverse Avatars",
    image: nft2Img,
    tag: "Trending",
  },
  {
    id: "3",
    title: "CyberPunk #089",
    creator: "Metaverse Avatars",
    image: nft2Img,
    tag: "Trending",
  },
];

export default function ExploreScreen() {
  const { colors } = useCustomTheme();

  return (
    <ScrollView className="bg-foreground px-4 pt-6">
      {/* Header */}
      <View className="mb-6 flex-row items-center justify-between">
        <View>
          <Text className="text-background text-2xl font-bold">Explore</Text>
          <Text className="text-gray">Discover NFTs</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <Ionicons name="search" size={22} color={colors.background} />
          <Ionicons
            name="person-circle-outline"
            size={26}
            color={colors.background}
          />
        </View>
      </View>

      <WalletStatus />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="my-6"
      >
        {["All NFTs", "Art", "Collectibles", "Gaming"].map((label) => (
          <Pressable
            key={label}
            className="bg-primary mr-3 rounded-full px-4 py-2"
          >
            <Text className="text-background text-sm font-medium">{label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View className="mb-4">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-background text-lg font-bold">Trending</Text>
          <Text className="text-primary">See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mockNFTs.map((nft) => (
            <View key={nft.id} className="bg-zinc mr-4 w-36 rounded-lg p-2">
              <Image
                source={nft.image}
                style={{ width: 120, height: 120, borderRadius: 12 }}
              />
              <Text className="text-background mt-2 text-sm font-bold">
                {nft.title}
              </Text>
              <Text className="text-gray text-xs">{nft.creator}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
