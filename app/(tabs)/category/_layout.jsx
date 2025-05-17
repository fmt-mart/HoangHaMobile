import { Stack } from "expo-router";

export default function CategoryLayout() {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
  );
}
