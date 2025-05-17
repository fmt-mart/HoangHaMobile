import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManeger from "./ApiManeger";

export const get_products = async () => {
  try {
    const data = await AsyncStorage.getItem("AccessData");
    if (!data) throw new Error("AccessData is null");
    const token = JSON.parse(data).token;

    const response = await ApiManeger.get("/products", {
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

export const get_products_byCategoryId = async (categoryId:String) => {
  try {
    const data = await AsyncStorage.getItem("AccessData");
    if (!data) throw new Error("AccessData is null");
    const token = JSON.parse(data).token;

    const response = await ApiManeger.get(`/products/category?categoryId=${categoryId}`, {
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

export const get_product_byId = async (productId:String) => {
  try {
    const data = await AsyncStorage.getItem("AccessData");
    if (!data) throw new Error("AccessData is null");
    const token = JSON.parse(data).token;

    const response = await ApiManeger.get(`/products/${productId}`, {
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

export const get_variant_product_byId = async (productId:String, variantId:String) => {
  try {
    const data = await AsyncStorage.getItem("AccessData");
    if (!data) throw new Error("AccessData is null");
    const token = JSON.parse(data).token;

    const response = await ApiManeger.get(`/variants/${productId}/${variantId}`, {
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

