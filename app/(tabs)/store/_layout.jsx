import { Stack } from "expo-router";

export default function StoreLayout() {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
  );
}
