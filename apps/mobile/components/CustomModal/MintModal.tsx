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
import {
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  Switch,
  TextInput,
  View,
} from "react-native";
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
    author,
  } = useStore(
    useShallow(({ ...state }) => ({
      ...state,
    })),
  );
  const { isDarkColorScheme } = useColorScheme();

  const { mutateAsync: mutateAsync, isPending } = useMutation({
    mutationFn: uploadMetadata,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Your NFT metadata was uploaded! 🎉",
      });
      queryClient.invalidateQueries({
        queryKey: ["explore-nfts", address, selectedCategory],
      });
      clearMintForm();
      closeModal();
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to mint NFT, try again",
      });
    },
  });

  const { mutateAsync: generateAsync, isPending: isAIPending } = useMutation({
    mutationFn: generateNFT,
    onSuccess: ({ title, description, image, author }) => {
      setMintInfo({ title, description, image, prompt, author });
      Toast.show({ type: "success", text1: "AI NFT generated! 🎉" });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "AI generation failed, try again",
      });
    },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      defaultTab: "albums",
      base64: true,
    });

    if (!result.canceled) {
      Keyboard.dismiss();
      const image = "data:image/jpeg;base64," + result.assets[0].base64;

      setMintInfo({
        image,
      });
    }
  };

  const handleMint = async () => {
    Keyboard.dismiss();

    if (!image) return;

    await mutateAsync({
      title,
      description,
      to: address!,
      base64: image,
    });
  };

  const handleAIGenerate = async (prompt: string) => {
    Keyboard.dismiss();
    await generateAsync(prompt);
  };

  const isFormValid = !!title && !!description && !!image && !!author;

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View className="w-full gap-4">
        <View className="gap-2">
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
              className="border-gray bg-zinc w-full rounded-md border p-3"
            />
            <Pressable
              onPress={() => handleAIGenerate(prompt)}
              disabled={!isValidPrompt(prompt) || isAIPending}
              className={cn(
                "flex-row items-center justify-center gap-2 rounded-md px-4 py-3",
                isValidPrompt(prompt) && !isAIPending
                  ? "bg-primary"
                  : "bg-gray",
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
              <Text className="border-gray bg-zinc rounded-md border p-3">
                {title}
              </Text>
            )}
            {author && (
              <Text className="border-gray bg-zinc rounded-md border p-3">
                {author}
              </Text>
            )}
            {description && (
              <Text className="border-gray bg-zinc rounded-md border p-3">
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
              placeholder="Author"
              placeholderTextColor={colors.gray}
              value={author}
              onChangeText={(text) => setMintInfo({ author: text })}
              className={inputStyle}
              multiline
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
            <Ionicons
              name="rocket-outline"
              size={20}
              color={colors.foreground}
            />
            <Text className="font-jetmono-semiBold text-foreground">
              {isPending ? "Minting..." : "Mint NFT"}
            </Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}
