import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PolicyInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Icon name="shield-check" size={30} color="#006666" />
          <Text style={styles.title}>Sản phẩm</Text>
          <Text style={styles.bold}>CHÍNH HÃNG</Text>
        </View>

        <View style={styles.item}>
          <Icon name="truck-fast" size={30} color="#006666" />
          <Text style={styles.title}>Miễn phí vận chuyển</Text>
          <Text style={styles.bold}>TOÀN QUỐC</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.item}>
          <Icon name="headset" size={30} color="#006666" />
          <Text style={styles.title}>Hotline hỗ trợ</Text>
          <Text style={styles.bold}>1900.2091</Text>
        </View>

        <View style={styles.item}>
          <Icon name="cached" size={30} color="#006666" />
          <Text style={styles.title}>Thủ tục đổi trả</Text>
          <Text style={styles.bold}>DỄ DÀNG</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F8FDFC",
    borderRadius: 10,
    margin: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  item: {
    width: "45%",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    color: "#333",
    marginTop: 8,
  },
  bold: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#006666",
  },
});

export default PolicyInfo;
