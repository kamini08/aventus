import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6200EE",
        tabBarInactiveTintColor: "gray",
        headerStyle: { backgroundColor: "#6200EE" },
        headerTintColor: "#fff",
        tabBarItemStyle: { paddingHorizontal: 0 },
        tabBarStyle: { paddingHorizontal: 5 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="respond"
        options={{
          title: "Responder",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
