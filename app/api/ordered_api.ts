import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManeger from "./ApiManeger";

export const get_ordered_byUserId = async (userId: String) => {
    try {
      const data_ordered = await AsyncStorage.getItem("AccessData");
      if (!data_ordered) throw new Error("AccessData is null");
      const token = JSON.parse(data_ordered).token;
      const response = await ApiManeger.get(`/orderedProduct/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error) {
        return { success: false, message: "Failed to fetch categories" };
    }
}

export const ordered_product = async (userId: String, data:any) => {
  try {
    const data_ordered = await AsyncStorage.getItem("AccessData");
    if (!data_ordered) throw new Error("AccessData is null");
    const token = JSON.parse(data_ordered).token;
    const response = await ApiManeger.post(`/orderedProduct/${userId}/ordered`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
      return { success: false, message: "Failed to fetch categories" };
  }
}