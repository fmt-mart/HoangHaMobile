import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout_user } from "../api/user_api";

export default function useLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem("AccessData");
      if (!accessToken) {
        throw new Error("AccessData không tồn tại.");
      }

      await logout_user();
      await AsyncStorage.removeItem("AccessData");

      router.replace("/auth/login");
    } catch (error) {
      console.error("Lỗi logout:", error);
      Alert.alert("Đăng xuất thất bại", "Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      "Xác nhận đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Đăng xuất", onPress: handleLogout }
      ],
      { cancelable: true }
    );
  };

  return { loading, confirmLogout };
}
