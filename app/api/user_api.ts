import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManeger from "./ApiManeger";

export const user_login = async (data:any) => {
  try {
    const response = await ApiManeger.post("/auth/token", data, {
      headers: {
        "content-type": "application/json",
      },
    });

    return response.data;
  } catch (error:any) {
    return error.response || error.message;
  }
};

export const get_user_infor = async () => {
  try {
    const data = await AsyncStorage.getItem("AccessData");
    if (!data) throw new Error("AccessData is null");
    const token = JSON.parse(data).token;

    const response = await ApiManeger.get("/users/myInfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return response.data;
  } catch (error:any) {
    return error.response || error.message;
  }
};

export const logout_user = async () => {
  try {
    const data = await AsyncStorage.getItem("AccessData");
    if (!data) throw new Error("AccessData is null");

    const response = await ApiManeger.post("/auth/logout", {
      headers: {
        "content-type": "application/json",
      },
    });
    return response.data;
  } catch (error:any) {
    return error.response || error.message;
  }
};
