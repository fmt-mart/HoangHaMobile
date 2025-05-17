import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Header from "../../components/header/Header";
import { MyContext } from "../../context/myContext";
import { get_ordered_byUserId } from "../../api/ordered_api";

const OrderTracking = () => {
  const { user } = useContext(MyContext);
  const [orders, setOrders] = useState([]);

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
      {/* Header */}
      <Header />
      <Text style={styles.title}>Đơn hàng của bạn</Text>
      <Text style={styles.subtitle}>
        Chào mừng trở lại, {user.firstName + " " + user.lastName}
      </Text>
      <Text style={styles.info}>
        Kiểm tra thông tin đơn hàng của bạn tại đây
      </Text>

      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/921/921347.png",
        }}
        style={styles.image}
      />

      <Text style={styles.sectionTitle}>Đơn hàng đã đặt</Text>

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
            <TouchableOpacity style={[styles.cell, { flex: 2 }]}>
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
};

export default OrderTracking;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#444",
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    textAlign: "center",
    color: "#777",
    marginBottom: 12,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
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
