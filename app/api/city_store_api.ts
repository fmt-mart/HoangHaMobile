import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManeger from "./ApiManeger";

export const get_city_stores = async () => {
  try {
    const data = await AsyncStorage.getItem("AccessData");
    if (!data) throw new Error("AccessData is null");
    const token = JSON.parse(data).token;

    const response = await ApiManeger.get("/cities", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
    return response.data;
  } catch (error) {
    throw error;
  }
}