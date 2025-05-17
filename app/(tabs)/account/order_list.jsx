import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Logo_Cart from "../../components/header/Logo_Cart";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { get_ordered_byUserId } from "../../api/ordered_api";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../../context/myContext";
import { ActivityIndicator } from "react-native";
import useLogout from "../../hooks/useLogout";

export default function OrderListScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const [orders, setOrders] = useState([]);
  const { user } = useContext(MyContext);
  const menuItems = [
    { label: "Tổng quan", icon: "dashboard" },
    { label: "Đơn hàng", icon: "shopping-bag" },
    { label: "Lịch sử mua hàng", icon: "history" },
    { label: "Thông tin cá nhân", icon: "user" },
    { label: "Quản lý bình luận", icon: "comments" },
    { label: "Quản lý đánh giá", icon: "star" },
    { label: "Đăng xuất", icon: "sign-out" },
  ];

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

  useEffect(() => {
    if (!user?.id) return;
    get_ordered_byUserId(user.id)
      .then((data) => {
        setOrders(data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
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
                router.push("/account/user_infor");
              } else if (item.label === "Tổng quan") {
                router.push("/(tabs)/account");
              } else if (item.label === "Đơn hàng") {
                if (pathname !== "/account/order_list") {
                  router.push("/account/order_list");
                }
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
      <Text style={styles.title}>Đơn hàng đã đặt</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.cell, { flex: 0.5 }]}>#</Text>
        <Text style={[styles.cell, { flex: 2 }]}>Mã đơn hàng</Text>
        <Text style={[styles.cell, { flex: 2 }]}>Ngày đặt</Text>
        <Text style={[styles.cell, { flex: 2 }]}>Tổng tiền</Text>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.tableRow}>
            <Text style={[styles.cell, { flex: 0.5 }]}>{index + 1}</Text>
            <TouchableOpacity
              style={[styles.cell, { flex: 2 }]}
              onPress={() =>
                router.push({
                  pathname: "/components/Order_Info",
                  params: { item: JSON.stringify(item) },
                })
              }
            >
              <Text style={styles.orderId}>{item.id}</Text>
            </TouchableOpacity>
            <Text style={[styles.cell, { flex: 2 }]}>{item.orderTime}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>
              {(item.gia * item.quantity).toLocaleString()} Vnđ
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#dcdde1",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 6,
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 6,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  cell: {
    fontSize: 14,
    color: "#555",
  },
  orderId: {
    color: "#e74c3c",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
