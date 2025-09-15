import { useCustomTheme } from "@/hooks/useCustomTheme";
import { cn } from "@/lib/theme/cn";
import { Text } from "@/lib/ui/Text";
import { useStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Image, Pressable, TextInput, View } from "react-native";
import { useShallow } from "zustand/shallow";

const inputStyle = "w-full rounded-md border border-gray bg-zinc p-3";

export function MintModal() {
  const { colors } = useCustomTheme();
  const { title, description, image, setMintInfo, clearMintForm } = useStore(
    useShallow(({ ...state }) => ({
      ...state,
    })),
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      defaultTab: "albums",
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const uri = asset.uri;

      const ext = uri.split(".").pop() ?? "jpg";

      setMintInfo({
        image: uri,
        title: asset.fileName ?? `nft.${ext}`,
      });
    }
  };

  // const uploadToPinata = async () => {
  //   const formData = new FormData();
  //   formData.append("file", {
  //     uri: image,
  //     name: "nft.png",
  //     type: "image/png",
  //   } as any);

  //   // Upload image
  //   const imgRes = await axios.post(
  //     "https://api.pinata.cloud/pinning/pinFileToIPFS",
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${process.env.EXPO_PUBLIC_PINATA_JWT}`,
  //       },
  //     }
  //   );

  //   const imageHash = imgRes.data.IpfsHash;

  //   // Upload metadata
  //   const metadata = {
  //     name: title,
  //     description,
  //     image: `ipfs://${imageHash}`,
  //   };

  //   const metaRes = await axios.post(
  //     "https://api.pinata.cloud/pinning/pinJSONToIPFS",
  //     metadata,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${process.env.EXPO_PUBLIC_PINATA_JWT}`,
  //       },
  //     }
  //   );

  //   return metaRes.data.IpfsHash;
  // };

  const handleMint = async () => {
    // try {
    //   const metadataHash = await uploadToPinata();
    //   console.log("✅ Metadata pinned:", `ipfs://${metadataHash}`);
    //   // Call backend minting API here
    //   // await axios.post("/mint", { metadataUri: `ipfs://${metadataHash}` });
    //   Alert.alert("Success", "NFT minted successfully!");
    //   clearMintForm();
    // } catch (err: any) {
    //   console.error(err);
    //   Alert.alert("Error", "Failed to mint NFT");
    // }
    clearMintForm();
  };

  const isFormValid = !!title && !!description && !!image;

  return (
    <View className="w-full gap-4">
      <Text className="font-jetmono-semiBold text-background text-xl">
        Mint a new NFT
      </Text>

      <TextInput
        placeholder="Title"
        placeholderTextColor={colors.gray}
        value={title}
        onChangeText={(text) => setMintInfo({ title: text })}
        className={inputStyle}
      />

      <TextInput
        placeholder="Description"
        placeholderTextColor={colors.gray}
        value={description}
        onChangeText={(text) => setMintInfo({ description: text })}
        className={inputStyle}
        multiline
      />

      <Pressable
        onPress={pickImage}
        className={cn(
          "flex-row items-center justify-center gap-2 rounded-md px-4 py-3",
          image ? "bg-primary" : "bg-gray",
        )}
      >
        <Ionicons name="image" size={20} color={colors.foreground} />
        <Text className="font-jetmono-semiBold">
          {image ? "Change Image" : "Pick Image"}
        </Text>
      </Pressable>

      {image && (
        <View className="relative">
          <Image
            source={{ uri: image }}
            className="h-[12.5rem] w-full rounded-md object-cover"
          />
          <Pressable
            onPress={() => setMintInfo({ image: null })}
            className="bg-primary absolute right-2 top-2 rounded-full p-2"
          >
            <Ionicons name="close" size={20} color={colors.foreground} />
          </Pressable>
        </View>
      )}

      <Pressable
        onPress={handleMint}
        disabled={!isFormValid}
        className={cn(
          "flex-row items-center justify-center gap-2 rounded-md px-4 py-3",
          isFormValid ? "bg-primary" : "bg-gray",
        )}
      >
        <Ionicons name="rocket-outline" size={20} color={colors.foreground} />
        <Text className="font-jetmono-semiBold text-foreground">Mint NFT</Text>
      </Pressable>
    </View>
  );
}
