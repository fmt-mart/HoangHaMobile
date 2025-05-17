import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManeger from "./ApiManeger";

export const get_categories = async () => {
    try {
      const data = await AsyncStorage.getItem("AccessData");
      if (!data) throw new Error("AccessToken is null");
      const token = JSON.parse(data).token;
      const response = await ApiManeger.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
        return { success: false, message: "Failed to fetch categories" };
    }
}
