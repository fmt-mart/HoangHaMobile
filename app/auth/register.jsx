import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { DatePickerModal } from "react-native-paper-dates";

export default function CompleteProfileScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);

  const onConfirm = (params) => {
    setOpen(false);
    setDate(params.date);
  };

  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Image
          source={require("../assets/icons/icons8-back-50.png")}
          style={{ width: 50, height: 20 }}
        ></Image>
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/th.jpg")}
          style={{ width: 130, height: 100 }}
        />
      </View>

      {/* Tiêu đề */}
      <Text style={styles.title}>Hoàn thiện thông tin</Text>

      {/* Trường nhập Họ tên */}
      <Text style={styles.label}>Họ tên (*)</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nhập họ tên"
      />

      {/* Ngày sinh */}
      <Text style={styles.label}>Ngày tháng năm sinh (*)</Text>
      <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
        <Text style={styles.dateText}>
          {date ? date.toDateString() : "dd/mm/yyyy"}
        </Text>
        <MaterialIcons
          name="calendar-today"
          size={20}
          color="gray"
          style={styles.icon}
        />
      </TouchableOpacity>
      <DatePickerModal
        locale="vi"
        mode="single"
        visible={open}
        onDismiss={() => setOpen(false)}
        date={date}
        onConfirm={onConfirm}
      />

      {/* Số điện thoại */}
      <Text style={styles.label}>Số điện thoại (*)</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Nhập số điện thoại"
        keyboardType="phone-pad"
      />

      {/* Email */}
      <Text style={styles.label}>Email (không bắt buộc)</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Nhập email"
        keyboardType="email-address"
      />

      {/* Nút tiếp tục */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>

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

// CSS Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    position: "relative",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 14,
    color: "gray",
  },
  icon: {
    position: "absolute",
    right: 10,
    top: "100%",
    transform: [{ translateY: -10 }],
  },
  button: {
    backgroundColor: "#008080",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  policyText: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
    marginTop: 15,
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
  },
  policyLink: {
    color: "red",
    fontWeight: "bold",
  },
});
