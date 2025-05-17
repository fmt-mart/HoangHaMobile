import React, { useContext, useMemo, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useLocalSearchParams } from "expo-router";
import { MyContext } from "../context/myContext";
import Header from "../components/header/Header";
import FoosterSeemore from "./FoosterSeemore";

export default function OrderDetailScreen() {
  const { item } = useLocalSearchParams() || {}; //se chay lien tuc
  const parsedItem = JSON.parse(item);
  const { user } = useContext(MyContext);

  const product = {
    name: parsedItem.name,
    price: parsedItem.gia,
    quantity: parsedItem.quantity,
    discounts: ["KM Giảm giá 0.5% cho thành viên hạng SILVER"],
    discountAmount: 16000,
  };

  const openMap = async () => {
    const address = parsedItem.receiveAt;

    if (!address || address.trim() === "") {
      Alert.alert("Thiếu địa chỉ", "Không có địa chỉ để mở bản đồ.");
      return;
    }

    const query = encodeURIComponent(address);
    const webUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    console.log("Opening URL:", webUrl);

    const netState = await NetInfo.fetch();
    if (!netState.isConnected) {
      Alert.alert("Không có kết nối", "Vui lòng kiểm tra kết nối Internet.");
      return;
    }

    try {
      const canOpen = await Linking.canOpenURL(webUrl);
      if (canOpen) {
        await Linking.openURL(webUrl);
      } else {
        Alert.alert("Lỗi", "Không thể mở bản đồ. Thiết bị không hỗ trợ.");
      }
    } catch (error) {
      console.error("Lỗi mở bản đồ:", error);
      Alert.alert("Lỗi", "Không thể mở bản đồ. Vui lòng thử lại sau.");
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + " Vnđ";

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Header />

      <View style={styles.card}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/845/845646.png",
          }}
          style={styles.icon}
        />
        <Text style={styles.header}>
          THÔNG TIN ĐƠN HÀNG SỐ{" "}
          <Text style={styles.orderCode}>{parsedItem.id}</Text>
        </Text>

        <Text style={styles.sectionTitle}>1. Thông tin người đặt hàng</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Họ tên</Text>
          <Text style={styles.value}>
            {user.firstName + " " + user.lastName}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Điện thoại</Text>
          <Text style={styles.value}>09xxxx8443</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}> </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Địa chỉ</Text>
          <Text style={styles.value}>{parsedItem.address}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Phương thức</Text>
          <Text style={styles.value}>Thanh toán khi nhận hàng</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Nhận hàng tại</Text>
          <Text style={styles.value}>{parsedItem.receiveAt}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Chi đường</Text>
          <TouchableOpacity onPress={openMap}>
            <Text style={[styles.value, styles.link]}>Xem tại đây</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Ghi chú</Text>
          <Text style={styles.value}> </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Mốc thời gian</Text>
          <Text style={styles.value}>{parsedItem.orderTime}</Text>
        </View>

        <Text style={styles.note}>
          Quý khách lưu ý, Hoàng Hà Mobile không yêu cầu khách hàng phải đặt cọc
          hoặc chuyển khoản toàn bộ đơn hàng để giữ hàng...
        </Text>
      </View>

      <Text style={styles.title}>2. Danh sách sản phẩm đặt hàng</Text>

      <View style={styles.tableHeader}>
        <Text style={[styles.cellHeader, { flex: 0.5 }]}>#</Text>
        <Text style={[styles.cellHeader, { flex: 3 }]}>Tên sản phẩm</Text>
        <Text style={[styles.cellHeader, { flex: 1 }]}>SL</Text>
        <Text style={[styles.cellHeader, { flex: 2 }]}>Giá tiền</Text>
        <Text style={[styles.cellHeader, { flex: 2 }]}>Tổng</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.cell, { flex: 0.5 }]}>1</Text>
        <View style={[styles.cell, { flex: 3 }]}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text>{product.variant}</Text>
          <Text>{product.color}</Text>
        </View>
        <Text style={[styles.cell, { flex: 1 }]}>{product.quantity}</Text>
        <Text style={[styles.cell, { flex: 2 }]}>
          {formatPrice(product.price)}
        </Text>
        <Text style={[styles.cell, { flex: 2 }]}>
          {formatPrice(product.price * product.quantity)}
        </Text>
      </View>

      <View style={styles.discountRow}>
        <Text style={[styles.cell, { flex: 0.5 }]}></Text>
        <Text style={[styles.cell, { flex: 3 }]}>{product.discounts[0]}</Text>
        <Text style={[styles.cell, { flex: 1 }]}></Text>
        <Text style={[styles.cell, { flex: 2 }]}>
          -{formatPrice(product.discountAmount)}
        </Text>
        <Text style={[styles.cell, { flex: 2 }]}>
          -{formatPrice(product.discountAmount)}
        </Text>
        {product.discounts.slice(1).map((item, index) => (
          <View style={styles.discountRow} key={index}>
            <Text style={[styles.cell, { flex: 0.5 }]}>
              {index === 0 ? "1" : ""}
            </Text>
            <Text style={[styles.cell, { flex: 8.5 }]}>{item}</Text>
          </View>
        ))}
      </View>
      {/* Tổng kết đơn hàng */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tổng tiền:</Text>
          <Text style={styles.summaryValue}>
            {formatPrice(product.price * product.quantity)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Giảm giá:</Text>
          <Text style={[styles.summaryValue, { color: "red" }]}>
            -{formatPrice(product.discountAmount)}
          </Text>
        </View>
        <View
          style={[
            styles.summaryRow,
            { borderTopWidth: 1, borderColor: "#ccc", paddingTop: 6 },
          ]}
        >
          <Text style={[styles.summaryLabel, { fontWeight: "bold" }]}>
            Tổng tiền thanh toán:
          </Text>
          <Text
            style={[
              styles.summaryValue,
              { color: "#DC2626", fontWeight: "bold" },
            ]}
          >
            {formatPrice(
              product.price * product.quantity - product.discountAmount
            )}
          </Text>
        </View>
      </View>

      <FoosterSeemore />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F3F4F6",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    elevation: 3,
  },
  icon: {
    width: 40,
    height: 40,
    alignSelf: "center",
    marginBottom: 12,
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 16,
  },
  orderCode: {
    color: "#F59E0B",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 14,
  },
  infoRow: {
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 13,
    color: "#555",
  },
  value: {
    fontSize: 13,
    color: "#111",
  },
  link: {
    color: "#10B981",
    textDecorationLine: "underline",
  },
  note: {
    fontSize: 12,
    color: "#444",
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#b2dfdb",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  discountRow: {
    flexDirection: "row",
    backgroundColor: "#f1f8e9",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  cellHeader: {
    fontWeight: "bold",
    fontSize: 12,
  },
  cell: {
    fontSize: 12,
  },
  productName: {
    fontWeight: "bold",
  },
  summaryContainer: {
    backgroundColor: "white",
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 13,
    color: "#444",
  },
  summaryValue: {
    fontSize: 13,
    color: "#111",
  },
});
