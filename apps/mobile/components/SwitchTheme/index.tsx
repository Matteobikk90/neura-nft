import { useCustomTheme } from "@/hooks/useCustomTheme";
import { useColorScheme } from "@/lib/theme/useColorScheme";
import { Text } from "@/lib/ui/Text";
import { Ionicons } from "@expo/vector-icons";
import { Switch, View } from "react-native";

export function SwitchTheme() {
  const { colors } = useCustomTheme();
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="w-full flex-row items-center justify-between">
      <Text className="font-jetmono-semiBold">Toggle Theme</Text>
      <View className="flex-row items-center gap-4">
        <Ionicons
          name="sunny"
          size={24}
          color={isDarkColorScheme ? colors.gray : colors.yellow}
        />
        <Switch
          value={isDarkColorScheme}
          onValueChange={toggleColorScheme}
          trackColor={{ true: colors.primary, false: colors.gray }}
          thumbColor={isDarkColorScheme ? colors.foreground : colors.zinc}
        />
        <Ionicons
          name="moon"
          size={24}
          color={isDarkColorScheme ? colors.yellow : colors.gray}
        />
      </View>
    </View>
  );
}
