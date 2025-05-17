import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useLogout from "../../hooks/useLogout";
import { ActivityIndicator } from "react-native";
import FoosterSeemore from "../../components/FoosterSeemore";

const Footer = () => {
  const router = useRouter();
  const { loading, confirmLogout } = useLogout();

  const paymentImages = {
    visa: require("../../assets/images/visa.png"),
    mastercard: require("../../assets/images/mastercard.png"),
    samsungpay: require("../../assets/images/samsungpay.png"),
    vnpay: require("../../assets/images/vnpay.png"),
    zalopay: require("../../assets/images/zalopay.png"),
    applepay: require("../../assets/images/applepay.png"),
  };

  const mediaImages = {
    facebook: {
      image: require("../../assets/images/Social_fb.png"),
      url: "https://www.facebook.com/hoanghamobilecom",
    },
    tiktok: {
      image: require("../../assets/images/Social_tiktok.png"),
      url: "https://www.tiktok.com/@hoanghaangels?",
    },
    youtube: {
      image: require("../../assets/images/Social_youtube.png"),
      url: "https://www.youtube.com/channel/UCJm_GdFJzT8h1odq1oMu_7Q",
    },
    instagram: {
      image: require("../../assets/images/Social_instagram.png"),
      urls: "https://www.instagram.com/hoanghamobile/?hl=vi",
    },
    thread: {
      image: require("../../assets/images/Social_thread.png"),
      url: "https://www.threads.com/@hoanghamobile",
    },
  };

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Tra cứu section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Tra cứu</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/(tabs)/store")}
          >
            <Ionicons name="location" size={20} color="#008060" />
            <Text style={styles.buttonText}>Tìm siêu thị</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/(tabs)/see_more/order_tracking")}
          >
            <Ionicons name="document-text" size={20} color="#008060" />
            <Text style={styles.buttonText}>Tra cứu đơn</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="settings" size={20} color="#008060" />
            <Text style={styles.buttonText}>Tra cứu bảo hành</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="calendar" size={20} color="#008060" />
            <Text style={styles.buttonText}>Lịch sử mua</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, { width: "48%" }]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out" size={20} color="#008060" />
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      <FoosterSeemore />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  sectionContainer: { marginBottom: 5, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: "48%",
  },
  buttonText: { marginLeft: 8, color: "#333", fontWeight: "bold" },
});

export default Footer;
