import { tabs } from "@/constants/tabs";
import { useIsAuthenticated } from "@/hooks/useIsAuthenticated";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const isAuth = useIsAuthenticated();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#8b5cf6",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          backgroundColor: "#111827",
          borderTopWidth: 0,
        },
        animation: "shift",
      }}
    >
      {tabs.map(({ name, title, icon, isProtected }) =>
        isProtected ? (
          <Tabs.Protected key={name} guard={isAuth}>
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
