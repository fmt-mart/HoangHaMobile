import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Logo_Cart from "../../components/header/Logo_Cart";
import { FontAwesome } from "@expo/vector-icons";
import { get_user_infor } from "../../api/user_api";
import { useRouter, usePathname } from "expo-router";
import { ActivityIndicator } from "react-native";
import useLogout from "../../hooks/useLogout";

export default function ProfileForm() {
  const router = useRouter();
  const pathname = usePathname();
  const menuItems = [
    { label: "Tổng quan", icon: "dashboard" },
    { label: "Đơn hàng", icon: "shopping-bag" },
    { label: "Lịch sử mua hàng", icon: "history" },
    { label: "Thông tin cá nhân", icon: "user" },
    { label: "Quản lý bình luận", icon: "comments" },
    { label: "Quản lý đánh giá", icon: "star" },
    { label: "Đăng xuất", icon: "sign-out" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    gender: "male",
    phone: "0915248443",
    email: "",
    dob: "",
  });

  useEffect(() => {
    get_user_infor().then((data) => {
      if (data.result) {
        setFormData({
          name: data.result.firstName + " " + data.result.lastName,
          dob: data.result.dob,
        });
      }
    });
  }, []);

  const { loading, confirmLogout } = useLogout();

  const handleLogout = () => {
    if (loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#009981" />
        </View>
      );
    }

    confirmLogout();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Logo_Cart />
          {/* Menu hàng trên */}
          <View style={styles.menuRow}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  if (item.label === "Đăng xuất") {
                    handleLogout();
                  } else if (item.label === "Thông tin cá nhân") {
                    if (pathname !== "/account/user_infor") {
                      router.push("/account/user_infor");
                    }
                  } else if (item.label === "Tổng quan") {
                    router.push("/(tabs)/account");
                  }
                }}
              >
                <FontAwesome
                  name={item.icon}
                  size={20}
                  color="#555"
                  style={styles.icon}
                />
                <Text style={styles.menuText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.title}>Cập nhật thông tin cá nhân</Text>

          <Text style={styles.label}>Họ tên</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
            placeholder="Nhập họ tên"
          />

          <Text style={styles.label}>Giới tính</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => handleChange("gender", "male")}
            >
              <View
                style={[
                  styles.radioCircle,
                  formData.gender === "male" && styles.selected,
                ]}
              />
              <Text style={styles.radioLabel}>Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => handleChange("gender", "female")}
            >
              <View
                style={[
                  styles.radioCircle,
                  formData.gender === "female" && styles.selected,
                ]}
              />
              <Text style={styles.radioLabel}>Nữ</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) => handleChange("phone", text)}
            placeholder="Nhập số điện thoại"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            placeholder="Nhập email"
          />

          <Text style={styles.label}>Ngày sinh</Text>
          <TextInput
            style={styles.input}
            value={formData.dob}
            onChangeText={(text) => handleChange("dob", text)}
            placeholder="DD/MM/YYYY"
          />

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  menuRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  menuItem: {
    width: "30%",
    alignItems: "center",
    marginVertical: 12,
  },
  icon: {
    marginBottom: 6,
  },
  menuText: {
    fontSize: 12,
    textAlign: "center",
    color: "#333",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  label: {
    marginTop: 16,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: "row",
    gap: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#999",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    borderColor: "#009981",
    backgroundColor: "#009981",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
  },
});
