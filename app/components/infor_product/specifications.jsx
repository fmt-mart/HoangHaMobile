import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProductSpecificationsModal from "../modal/ProductSpecificationsModal";

const Specifications = ({ itemVariants }) => {
  const [visible, setVisible] = useState(false);
  const item = itemVariants.variants[0];
  return (
    <View style={styles.container}>
      <Text style={styles.header}>THÔNG SỐ KỸ THUẬT</Text>
      {item?.microprocessor || item?.ram ? (
        <View style={styles.item}>
          <Text style={styles.label}>Vi xử lý</Text>
          <Text style={styles.value}>
            {item.microprocessor || "Không có dữ liệu"}
          </Text>
          <Text style={styles.label}>RAM</Text>
          <Text style={styles.value}>
            {item.ram + "GB" || "Không có dữ liệu"}
          </Text>
          <Text style={styles.label}>Storage</Text>
          <Text style={styles.value}>
            {item.storage + "GB" || "Không có dữ liệu"}
          </Text>
        </View>
      ) : (
        <Text style={{ textAlign: "center", color: "red" }}>
          Không có thông tin sản phẩm
        </Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setVisible(true);
        }}
      >
        <ProductSpecificationsModal
          visible={visible}
          onClose={() => setVisible(false)}
          productVariantSpec={item}
        />
        <Text style={styles.buttonText}>XEM CẤU HÌNH CHI TIẾT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  item: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  value: {
    fontSize: 14,
    color: "#555",
  },
  button: {
    backgroundColor: "#008080",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Specifications;
