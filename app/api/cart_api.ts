import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManeger from "./ApiManeger";

export const get_cart_byUserId = async (userId: String) => {
    try {
      const data_cart = await AsyncStorage.getItem("AccessData");
      if (!data_cart) throw new Error("AccessData is null");
      const token = JSON.parse(data_cart).token;
      const response = await ApiManeger.get(`/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error) {
        return { success: false, message: "Failed to fetch categories" };
    }
}

export const add_to_cart = async (userId: String, data:any) => {
    try {
      const data_cart = await AsyncStorage.getItem("AccessData");
      if (!data_cart) throw new Error("AccessData is null");
      const token = JSON.parse(data_cart).token;
      const response = await ApiManeger.post(`/cart/${userId}/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; 
    } catch (error) {
        return { success: false, message: "Failed to fetch categories" };
    }
}

export const remove_from_cart = async (userId: String, productVariantId: String) => {
  try {
    const data_cart = await AsyncStorage.getItem("AccessData");
    if (!data_cart) throw new Error("AccessData is null");
    const token = JSON.parse(data_cart).token;
    const response = await ApiManeger.delete(`/cart/${userId}/remove/${productVariantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
      return { success: false, message: "Failed to fetch categories" };
  }
}

export const update_cart = async (userId: String, data:any) => {
  try {
    const data_cart = await AsyncStorage.getItem("AccessData");
    if (!data_cart) throw new Error("AccessData is null");
    const token = JSON.parse(data_cart).token;
    const response = await ApiManeger.put(`/cart/${userId}/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
      return { success: false, message: "Failed to fetch categories" };
  }
}

export const clear_cart = async (userId: String) => {
  try {
    const data_cart = await AsyncStorage.getItem("AccessData");
    if (!data_cart) throw new Error("AccessData is null");
    const token = JSON.parse(data_cart).token;
    const response = await ApiManeger.delete(`/cart/${userId}/clear`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
      return { success: false, message: "Failed to fetch categories" };
  }
}
