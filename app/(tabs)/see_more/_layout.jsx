import { Stack } from "expo-router";

export default function SeemoreLayout() {
  return (
    <Stack
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
  );
}
