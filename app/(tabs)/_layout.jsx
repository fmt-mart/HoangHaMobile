import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#008060",
        tabBarInactiveTintColor: "#737373",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
          gestureEnabled: false,
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Danh mục",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: "Cửa hàng",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="building" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Tài khoản",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="see_more"
        options={{
          title: "Xem thêm",
          tabBarIcon: ({ color, size }) => (
            <Feather name="menu" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
