import { Text } from "@/lib/ui/Text";
import { View } from "react-native";

export function MintInfo() {
  return (
    <View className="z-20 w-full gap-4">
      <Text className="font-jetmono-semiBold text-background text-xl">
        How minting works
      </Text>

      <View className="gap-3">
        <Text className="text-background">
          🚀 First, go to the NFTs screen and tap the **Mint NFT** button in the
          top right.
        </Text>
        <Text className="text-background">
          1️⃣ Choose a title, description, and image for your NFT.
        </Text>
        <Text className="text-background">
          2️⃣ Your content is uploaded securely to IPFS via Pinata.
        </Text>
        <Text className="text-background">
          3️⃣ Our contract mints the NFT and assigns it to your wallet.
        </Text>
        <Text className="text-background">
          4️⃣ Gas fees are covered for you (on Sepolia testnet).
        </Text>
        <Text className="text-background">
          ✅ The NFT appears in your wallet as the new owner.
        </Text>
      </View>
    </View>
  );
}
