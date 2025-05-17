import { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode/build/cjs";

export interface JwtPayload {
    exp: number;
    iat?: number;
};

export default function useAuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      const data = await AsyncStorage.getItem("AccessData");
      const token = data ? JSON.parse(data).token : null;

      if (token) {
        try {
          const decoded = jwtDecode<JwtPayload>(token);
          const currentTime = Date.now() / 1000; //tinh thoi gian hien tai theo giay

          if (decoded.exp < currentTime) {
            await AsyncStorage.removeItem("AccessData");
            router.replace("/auth/login");
          }
        } catch (err) {
          console.log("Lỗi giải mã token:", err);
          await AsyncStorage.removeItem("AccessData");
          router.replace("/auth/login");
        }
      } else {
        router.replace("/(tabs)/home");
      }
    };

    validateToken();

    const interval = setInterval(validateToken, 60000);
    return () => clearInterval(interval); // Cleanup the interval
  }, []);
}
