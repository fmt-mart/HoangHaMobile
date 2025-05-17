import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import Logo_Cart from "../../components/header/Logo_Cart";
import { ActivityIndicator } from "react-native";
import useLogout from "../../hooks/useLogout";

const rules = [
  {
    icon: "star",
    title: "Điều kiện",
    description: "Chưa phát sinh giao dịch",
  },
  {
    icon: "dollar",
    title:
      "Nguyên tắc tích điểm (nguyên tắc chung áp dụng với tất cả ngành hàng)",
    description: "0",
  },
  {
    icon: "percent",
    title: "Nguyên tắc chiết khấu",
    description: "0",
  },
];

const MemberOverview = () => {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState("Silver");
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

  const membershipLevels = [
    { label: "Edu", bg: "#fbd46d", icon: "graduation-cap" },
    { label: "New", bg: "#e0fff4", icon: "smile-o" },
    { label: "Silver", bg: "#dcdcdc", icon5: "medal" },
    { label: "Gold", bg: "#f5d442", icon: "trophy" },
    { label: "Diamond", bg: "#e0d4ff", icon: "diamond" },
  ];

  const menuItems = [
    { label: "Tổng quan", icon: "dashboard" },
    { label: "Đơn hàng", icon: "shopping-bag" },
    { label: "Lịch sử mua hàng", icon: "history" },
    { label: "Thông tin cá nhân", icon: "user" },
    { label: "Quản lý bình luận", icon: "comments" },
    { label: "Quản lý đánh giá", icon: "star" },
    { label: "Đăng xuất", icon: "sign-out" },
  ];

  return (
    <ScrollView style={styles.container}>
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
                router.push("/(tabs)/account/user_infor");
              } else if (item.label === "Đơn hàng") {
                router.push("/(tabs)/account/order_list");
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

      {/* Tổng quan */}
      <Text style={styles.header}>Tổng quan</Text>
      <Text style={styles.subHeader}>Khám phá ưu đãi hạng thành viên</Text>

      <View style={styles.badgeContainer}>
        {membershipLevels.map((item, index) => {
          const isChecked = item.label === selectedLevel;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.badge,
                {
                  backgroundColor: item.bg,
                  borderColor: isChecked ? "#00cc88" : "#ccc",
                },
              ]}
              onPress={() => setSelectedLevel(item.label)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {item.icon && (
                  <FontAwesome
                    name={item.icon}
                    size={16}
                    color="#333"
                    style={{ marginRight: 6 }}
                  />
                )}
                {item.icon5 && (
                  <FontAwesome5
                    name={item.icon5}
                    size={16}
                    color="#333"
                    style={{ marginRight: 6 }}
                  />
                )}

                <Text style={styles.badgeText}>{item.label}</Text>
              </View>
              {isChecked && <Text style={styles.checked}>✓</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.ruleContainer}>
        {rules.map((rule, index) => (
          <View key={index} style={styles.ruleCard}>
            <View style={styles.ruleIconWrapper}>
              <FontAwesome name={rule.icon} size={20} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.ruleTitle}>{rule.title}</Text>
              <Text style={styles.ruleDescription}>{rule.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
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
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 12,
    color: "#555",
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    width: "48%",
    justifyContent: "space-between",
  },
  badgeText: {
    fontWeight: "600",
  },
  checked: {
    color: "#00cc88",
    fontWeight: "bold",
  },
  ruleContainer: {
    marginTop: 20,
    gap: 12,
  },
  ruleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#eee",
  },

  ruleIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#008d62",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  ruleTitle: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 14,
    marginBottom: 2,
  },

  ruleDescription: {
    color: "#777",
    fontSize: 13,
  },
});

export default MemberOverview;
