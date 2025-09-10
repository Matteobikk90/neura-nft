import { tabs } from "@/constants/tabs";
import { useCustomTheme } from "@/hooks/useCustomTheme";
import { useWalletLifecycle } from "@/hooks/useWalletLifecycle";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const { isAuthenticated } = useWalletLifecycle();
  const { colors } = useCustomTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: 10,
          backgroundColor: colors.border,
          height: 70,
          shadowColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        animation: "fade",
      }}
    >
      {tabs.map(({ name, title, icon, isProtected }) =>
        isProtected ? (
          <Tabs.Protected key={name} guard={isAuthenticated}>
            <Tabs.Screen
              name={name}
              options={{
                title,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name={icon} size={size} color={color} />
                ),
              }}
            />
          </Tabs.Protected>
        ) : (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              title,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={icon} size={size} color={color} />
              ),
            }}
          />
        ),
      )}
    </Tabs>
  );
}
