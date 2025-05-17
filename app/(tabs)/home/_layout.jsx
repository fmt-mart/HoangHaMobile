import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
  );
}
