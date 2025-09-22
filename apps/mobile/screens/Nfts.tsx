import { LottieViewWrapper } from "@/components/Lottie/ViewWrappet";
import { NFTCard } from "@/components/Nft/Card";
import { WalletStatus } from "@/components/Wallet/Status";
import { nftCategories } from "@/constants/nfts";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { usePagination } from "@/hooks/usePagination";
import { cn } from "@/lib/theme/cn";
import { Text } from "@/lib/ui/Text";
import { getExploreNFTs } from "@/queries/nfts";
import { useStore } from "@/store";
import { ExpandedSection } from "@/types/store/explore";
import { resolveNFTTitle } from "@/utils/formatter";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Pressable, ScrollView, View } from "react-native";
import { useShallow } from "zustand/shallow";

export default function ExploreScreen() {
  const { colors } = useCustomTheme();

  const {
    address,
    expandedSection,
    setExpandedSection,
    openModal,
    selectedCategory,
    setSelectedCategory,
  } = useStore(
    useShallow(({ ...state }) => ({
      ...state,
    })),
  );
  const showAllOwned = expandedSection === ExpandedSection.OWNED;
  const { data, isLoading, error } = useQuery({
    queryKey: ["explore-nfts", address, selectedCategory],
    queryFn: () => getExploreNFTs(address!, selectedCategory),
    enabled: !!address,
  });
  const {
    paginated: trendingPage,
    nextPage: nextTrending,
    prevPage: prevTrending,
    hasNext: hasMoreTrending,
    hasPrev: hasPrevTrending,
    resetPage: resetTrending,
  } = usePagination(data?.trending ?? []);

  return (
    <View className="bg-background flex-1 px-4 pt-6">
      <View className="mb-6 flex-row items-center justify-between">
        <View>
          <Text className="font-jetmono-semiBold text-2xl">Explore</Text>
          <Text className="text-gray">Discover NFTs</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <Pressable
            onPress={() => openModal("info")}
            className={cn(
              "rounded-md p-1.5 bg-primary flex-row items-center justify-between gap-4",
            )}
          >
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={colors.foreground}
            />
          </Pressable>
          <Pressable
            onPress={() => openModal("mint", {})}
            className={cn(
              "rounded-md px-4 py-2 bg-primary flex-row items-center justify-between gap-4",
            )}
          >
            <Ionicons
              name="rocket-outline"
              size={22}
              color={colors.foreground}
            />
            <Text>Mint NFT</Text>
          </Pressable>
        </View>
      </View>

      <WalletStatus />

      {error && (
        <LottieViewWrapper type="error" message="Failed to load transactions" />
      )}

      {isLoading ? (
        <LottieViewWrapper type="loading" message="Loading ..." />
      ) : (
        <ScrollView horizontal={false}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="my-6"
          >
            {nftCategories.map((category) => (
              <Pressable
                key={category}
                onPress={() => {
                  setSelectedCategory(category);
                  resetTrending();
                }}
                className={cn(
                  "mr-3 rounded-full px-4 py-2",
                  selectedCategory === category ? "bg-primary" : "bg-zinc",
                )}
              >
                <Text
                  className={cn(
                    "text-sm font-jetmono-medium",
                    selectedCategory === category
                      ? "text-foreground"
                      : "text-gray",
                  )}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <View className="mb-12">
            <View className="mb-2 flex-row items-center justify-between">
              <Text className="font-jetmono-semiBold text-2xl">Trending</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {trendingPage.map((nft) => (
                <NFTCard
                  key={nft.id?.tokenId}
                  image={{ uri: nft.media?.[0]?.gateway }}
                  title={resolveNFTTitle(nft)}
                  creator={
                    nft.contractMetadata?.name ??
                    nft.contractMetadata?.contractDeployer ??
                    "Unknown"
                  }
                />
              ))}
            </ScrollView>
            <View className="mt-2 flex-row justify-between gap-4">
              {hasPrevTrending && (
                <Pressable onPress={prevTrending}>
                  <Text className="text-primary">Prev</Text>
                </Pressable>
              )}
              {hasMoreTrending && (
                <Pressable className="ml-auto" onPress={nextTrending}>
                  <Text className="text-primary">Next</Text>
                </Pressable>
              )}
            </View>

            <View className="mb-2 mt-8 flex-row items-center justify-between">
              <Text className="font-jetmono-semiBold text-2xl">
                Your collection
              </Text>
              {data?.owned && data?.owned.length >= 5 && (
                <Pressable
                  onPress={() =>
                    setExpandedSection(
                      showAllOwned
                        ? ExpandedSection.NONE
                        : ExpandedSection.OWNED,
                    )
                  }
                >
                  <Text className="text-primary">
                    {expandedSection === ExpandedSection.OWNED
                      ? "Show less"
                      : "See all"}
                  </Text>
                </Pressable>
              )}
            </View>
            {data?.owned.length === 0 ? (
              <LottieViewWrapper
                type="empty"
                message="No NFTs in your collection yet"
              />
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data?.owned
                  .slice(0, showAllOwned ? undefined : 5)
                  .map((nft) => (
                    <NFTCard
                      key={nft.id?.tokenId}
                      image={{
                        uri: nft.metadata?.image,
                      }}
                      title={
                        nft.title?.trim() ||
                        nft.metadata?.name?.trim() ||
                        `#${parseInt(nft.id.tokenId, 16)}`
                      }
                      creator={
                        nft.contractMetadata?.name ??
                        nft.contractMetadata?.contractDeployer ??
                        "Unknown"
                      }
                    />
                  ))}
              </ScrollView>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
