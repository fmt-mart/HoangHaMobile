import { Stack, useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function OrderSuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Đặt hàng thành công" }} />

      <Image
        source={{ uri: "https://img.icons8.com/fluency/96/checked.png" }}
        style={styles.image}
      />
      <Text style={styles.title}>Đặt hàng thành công!</Text>
      <Text style={styles.description}>
        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(tabs)/home")}
      >
        <Text style={styles.buttonText}>Về Trang Chủ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#1890ff" }]}
        onPress={() => router.push("/(tabs)/account/order_list")}
      >
        <Text style={styles.buttonText}>Xem Đơn Hàng</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#009981",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#009981",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
