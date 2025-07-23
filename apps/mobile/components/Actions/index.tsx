import { Text } from "@/lib/ui/Text";
import { Pressable } from "react-native";

export function ActionButton({ label }: { label: string }) {
  return (
    <Pressable className="bg-primary/10 mx-1 flex-1 items-center justify-center rounded-xl px-4 py-3">
      <Text className="text-primary font-medium">{label}</Text>
    </Pressable>
  );
}
