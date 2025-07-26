import { filters } from "@/constants/filters";
import { cn } from "@/lib/theme/cn";
import { Text } from "@/lib/ui/Text";
import { useStore } from "@/store";
import type { SortType } from "@/types/store/filter";
import { Pressable, View } from "react-native";
import { useShallow } from "zustand/shallow";

export function SortModal() {
  const { closeModal, setTokenSortBy, tokenSortBy } = useStore(
    useShallow(({ closeModal, setTokenSortBy, tokenSortBy }) => ({
      closeModal,
      setTokenSortBy,
      tokenSortBy,
    })),
  );

  const handleSelect = (id: SortType) => {
    setTokenSortBy(id);
    closeModal();
  };

  return (
    <View className="p-4">
      <Text className="font-jetmono-semiBold text-background mb-6 text-lg">
        Sort Tokens
      </Text>

      <View className="gap-4">
        {filters.map(({ label, id }) => {
          const isSelected = tokenSortBy === id;

          return (
            <Pressable
              key={id}
              onPress={() => handleSelect(id)}
              className={cn(
                "rounded-md p-4 bg-gray",
                isSelected && "bg-primary border-primary",
              )}
            >
              <Text
                className={cn(
                  "font-jetmono-medium",
                  isSelected && "font-jetmono-semiBold text-background",
                )}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
