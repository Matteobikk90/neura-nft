import { useCustomTheme } from "@/hooks/useCustomTheme";
import { cn } from "@/lib/theme/cn";
import { Text } from "@/lib/ui/Text";
import { uploadMetadata } from "@/queries/mint";
import { useStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";

import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Image, Pressable, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { useShallow } from "zustand/shallow";

const inputStyle = "w-full rounded-md border border-gray bg-zinc p-3";

export function MintModal() {
  const { colors } = useCustomTheme();
  const { title, description, image, setMintInfo, clearMintForm, closeModal } =
    useStore(
      useShallow(({ ...state }) => ({
        ...state,
      })),
    );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadMetadata,
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      defaultTab: "albums",
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      setMintInfo({
        image: asset.uri,
      });
    }
  };

  const handleMint = async () => {
    try {
      const ext = image?.split(".").pop() ?? "jpg";
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", {
        uri: image!,
        name: `${title}.${ext}`,
        type: `image/${ext}`,
      } as unknown as File);

      const { metadataUri } = await mutateAsync(formData);

      console.log({ metadataUri });

      Toast.show({
        type: "success",
        text1: "Your NFT metadata was uploaded! 🎉",
      });

      clearMintForm();
      closeModal();
    } catch {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to mint NFT, try again",
      });
    }
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
        disabled={!isFormValid || isPending}
        className={cn(
          "flex-row items-center justify-center gap-2 rounded-md px-4 py-3",
          isFormValid && !isPending ? "bg-primary" : "bg-gray",
        )}
      >
        <Ionicons name="rocket-outline" size={20} color={colors.foreground} />
        <Text className="font-jetmono-semiBold text-foreground">
          {isPending ? "Minting..." : "Mint NFT"}
        </Text>
      </Pressable>
    </View>
  );
}
