import { queryClient } from "@/config/queryClient";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { cn } from "@/lib/theme/cn";
import { useColorScheme } from "@/lib/theme/useColorScheme";
import { Text } from "@/lib/ui/Text";
import { generateNFT } from "@/queries/ai";
import { uploadMetadata } from "@/queries/mint";
import { useStore } from "@/store";
import { isValidPrompt } from "@/utils/formatter";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Image, Pressable, Switch, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { useShallow } from "zustand/shallow";

const inputStyle = "w-full rounded-md border border-gray bg-zinc p-3";

export function MintModal() {
  const { colors } = useCustomTheme();
  const {
    title,
    description,
    image,
    setMintInfo,
    clearMintForm,
    closeModal,
    address,
    selectedCategory,
    toggleMintMode,
    isAImintMode,
    prompt,
  } = useStore(
    useShallow(({ ...state }) => ({
      ...state,
    })),
  );
  const { isDarkColorScheme } = useColorScheme();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadMetadata,
  });

  const { mutateAsync: generateAsync, isPending: isAIPending } = useMutation({
    mutationFn: generateNFT,
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
      formData.append("to", address!);
      formData.append("file", {
        uri: image!,
        name: `${title}.${ext}`,
        type: `image/${ext}`,
      } as unknown as File);

      await mutateAsync(formData);

      Toast.show({
        type: "success",
        text1: "Your NFT metadata was uploaded! 🎉",
      });
      queryClient.invalidateQueries({
        queryKey: ["explore-nfts", address, selectedCategory],
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to mint NFT, try again",
      });
    } finally {
      clearMintForm();
      closeModal();
    }
  };

  const handleAIGenerate = async (prompt: string) => {
    try {
      const result = await generateAsync(prompt);
      setMintInfo({
        title: result.title,
        description: result.description,
        image: result.imageUrl,
        prompt,
      });
      console.log({ result });
      Toast.show({
        type: "success",
        text1: "Your AI generated NFT metadata was uploaded! 🎉",
      });
      queryClient.invalidateQueries({
        queryKey: ["explore-nfts", address, selectedCategory],
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "AI generation failed",
      });
    } finally {
      clearMintForm();
      closeModal();
    }
  };

  const isFormValid = !!title && !!description && !!image;

  return (
    <View className="w-full gap-4">
      <View className="gap-4">
        <Text className="font-jetmono-semiBold text-background text-xl">
          Mint a new NFT
        </Text>
        <Text className="text-background">
          Choose whether to create your NFT manually or let AI generate it for
          you
        </Text>
        <View className="flex-row items-center gap-2">
          <Ionicons
            name="person"
            size={20}
            color={!isAImintMode ? colors.yellow : colors.gray}
          />
          <Switch
            value={isAImintMode}
            onValueChange={toggleMintMode}
            trackColor={{ true: colors.primary, false: colors.gray }}
            thumbColor={isDarkColorScheme ? colors.foreground : colors.zinc}
          />
          <Ionicons
            name="logo-android"
            size={20}
            color={isAImintMode ? colors.yellow : colors.gray}
          />
        </View>
      </View>

      {isAImintMode ? (
        <>
          <TextInput
            placeholder="Describe your NFT idea... (min: 3 words)"
            placeholderTextColor={colors.gray}
            value={prompt}
            onChangeText={(prompt) => setMintInfo({ prompt })}
            onSubmitEditing={(e) => handleAIGenerate(e.nativeEvent.text)}
            className="border-gray bg-zinc w-full rounded-md border p-3"
          />
          <Pressable
            onPress={() => handleAIGenerate(prompt)}
            disabled={!isValidPrompt(prompt) || isAIPending}
            className={cn(
              "flex-row items-center justify-center gap-2 rounded-md px-4 py-3",
              isValidPrompt(prompt) && !isAIPending ? "bg-primary" : "bg-gray",
            )}
          >
            <Ionicons
              name="sparkles-outline"
              size={20}
              color={colors.foreground}
            />
            <Text className="font-jetmono-semiBold text-foreground">
              {isAIPending ? "Generating..." : " Generate with AI"}
            </Text>
          </Pressable>
          {title && (
            <Text className="border-gray bg-zinc gap-2 rounded-md border p-3">
              {title}
            </Text>
          )}
          {description && (
            <Text className="border-gray bg-zinc gap-2 rounded-md border p-3">
              {description}
            </Text>
          )}
          {image && (
            <Image
              source={{ uri: image }}
              className="h-[12.5rem] w-full rounded-md object-cover"
            />
          )}
        </>
      ) : (
        <>
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
            <Image
              source={{ uri: image }}
              className="h-[12.5rem] w-full rounded-md object-cover"
            />
          )}
        </>
      )}

      {isFormValid && (
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
      )}
    </View>
  );
}
