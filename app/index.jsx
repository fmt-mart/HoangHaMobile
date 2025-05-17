import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "./screens/SplashScreen";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const data = await AsyncStorage.getItem("AccessData");
      const token = data ? JSON.parse(data).token : null;

      setTimeout(() => {
        if (token) {
          router.replace("/(tabs)/home");
        } else {
          router.replace("/auth/login");
        }
      }, 3000);
    };

    checkToken();
  }, [router]);

  return <SplashScreen />;
}
