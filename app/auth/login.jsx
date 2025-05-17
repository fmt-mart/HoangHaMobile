import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  StatusBar,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { user_login } from "../api/user_api";
import { MyContext } from "../context/myContext";

export default function LoginScreen() {
  const {getUserInfo} = useContext(MyContext);

  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#fff");
    }
    StatusBar.setBarStyle("light-content", true);
  }, []);

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // Lấy dữ liệu từ form
    console.log("Username:", username);
    console.log("Password:", password);

    if (!username || !password) {
      alert("Please enter email and password");
      return;
    }

    if (password && password.trim()) {
      try {
        const data = await user_login({
          username: username,
          password: password,
        });

        console.log(data);
        if (data.code === 1000) {
          await AsyncStorage.setItem("AccessData", JSON.stringify(data.result));
          console.log("AccessData đã lưu:", data.result);
          getUserInfo();
          router.replace("/(tabs)/home");
        }
      } catch (error) {
        console.log("Lỗi đăng nhập:", error);
      }
    } else {
      alert(password);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/images/th.jpg")} style={styles.logo} />

      {/* Tiêu đề */}
      <Text style={styles.title}>Chào mừng đến với Hoàng Hà Mobile</Text>

      {/* Ô nhập Tên đăng nhập */}
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={(text) => setUsername(text.trim())}
      />

      {/* Ô nhập Mật khẩu */}
      <View
        style={{
          fontSize: 20,
          borderColor: "gray",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={(text) => setPassword(text.trim())}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{ position: "absolute", right: 10, top: 10 }}
        >
          {showPassword ? (
            <EyeSlashIcon color="gray" size={24} />
          ) : (
            <EyeIcon color="gray" size={24} />
          )}
        </TouchableOpacity>
      </View>

      {/* Nút đăng nhập */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => handleLogin()} // Thêm hàm xử lý đăng nhập
      >
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* Hoặc */}
      <Text style={styles.orText}>Hoặc</Text>

      {/* Đăng nhập bằng Zalo */}
      <TouchableOpacity style={styles.socialButtonZalo}>
        <Image source={require("../assets/icons/icon-zalo.png")} />
        <Text style={styles.socialText}>Đăng nhập với Zalo</Text>
      </TouchableOpacity>

      {/* Đăng nhập bằng Google */}
      <TouchableOpacity style={styles.socialButtonGoogle}>
        <Image source={require("../assets/icons/icon-google.png")} />
        <Text style={styles.socialTextBlack}>Đăng nhập với Google</Text>
      </TouchableOpacity>

      {/* Đăng nhập bằng Facebook */}
      <TouchableOpacity style={styles.socialButtonFacebook}>
        <Image source={require("../assets/icons/icon-facebook.png")} />
        <Text style={styles.socialText}>Đăng nhập với Facebook</Text>
      </TouchableOpacity>

      {/* Đăng ký */}
      <Text style={styles.registerText}>
        Bạn chưa có tài khoản?{" "}
        <TouchableOpacity onPress={() => router.push("/auth/register")}>
          <Text style={styles.registerLink}>Đăng kí</Text>
        </TouchableOpacity>
      </Text>

      {/* Chính sách bảo mật */}
      <Text style={styles.policyText}>
        Bằng việc tiếp tục, bạn đã đọc và đồng ý với{" "}
        <Text
          style={styles.policyLink}
          onPress={() =>
            Linking.openURL("https://hoanghamobile.com/chinh-sach-bao-mat")
          }
        >
          Chính sách bảo mật thông tin cá nhân
        </Text>{" "}
        của Hoàng Hà Mobile
      </Text>
    </View>
  );
}

// CSS styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    position: "relative",
  },
  logo: {
    width: 100,
    height: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    width: "100%",
    height: 45,
    backgroundColor: "#008060",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
  },
  orText: {
    marginVertical: 10,
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
  },
  socialButtonZalo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    width: "100%",
    height: 45,
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 8,
  },
  socialButtonGoogle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: "100%",
    height: 45,
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
  },
  socialButtonFacebook: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1877F2",
    width: "100%",
    height: 45,
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 8,
  },
  socialText: {
    color: "white",
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "bold",
  },
  socialTextBlack: {
    color: "#000000",
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#666",
  },
  registerLink: {
    color: "#008060",
    fontWeight: "bold",
    marginBottom: -4,
    textDecorationLine: "underline",
  },
  policyText: {
    marginTop: 10,
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    position: "absolute",
    bottom: 10,
  },
  policyLink: {
    color: "#FF0000",
    fontWeight: "bold",
  },
});
