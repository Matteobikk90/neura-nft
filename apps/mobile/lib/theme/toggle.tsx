import { Icon } from "@roninoss/icons";
import { Pressable, View } from "react-native";
import Animated, {
  LayoutAnimationConfig,
  ZoomInRotate,
} from "react-native-reanimated";

import { cn } from "@/lib/theme/cn";
import { useColorScheme } from "@/lib/theme/useColorScheme";

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const iconColor = isDark ? "#ffffff" : "#171522";

  return (
    <LayoutAnimationConfig skipEntering>
      <Animated.View
        className="mt-12 items-center justify-center"
        key={"toggle-" + colorScheme}
        entering={ZoomInRotate}
      >
        <Pressable
          onPress={() => setColorScheme(isDark ? "light" : "dark")}
          className="opacity-80"
        >
          {({ pressed }) => (
            <View className={cn("px-0.5", pressed && "opacity-50")}>
              <Icon
                namingScheme="sfSymbol"
                name={isDark ? "moon.stars" : "sun.min"}
                color={iconColor}
              />
            </View>
          )}
        </Pressable>
      </Animated.View>
    </LayoutAnimationConfig>
  );
}
