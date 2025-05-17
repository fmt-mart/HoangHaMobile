import React from "react";
import { MyProvider } from "../app/context/myContext";
import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <MyProvider>
        <Slot />
      </MyProvider>
    </PaperProvider>
  );
}
