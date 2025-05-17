import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const ProductSpecificationsModal = ({ visible, onClose, productVariantSpec }) => {
  return (
    <View style={styles.screen}>
      {/* Modal */}
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>THÔNG SỐ KỸ THUẬT</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Nội dung */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Màn hình */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Màn hình</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Tần số quét (Hz)</Text>
                  <Text style={styles.value}>{productVariantSpec.scanFrequency}HzHz</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Độ phân giải</Text>
                  <Text style={styles.value}>{productVariantSpec.resolution}Hz</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Kích thước màn hình</Text>
                  <Text style={styles.value}>{productVariantSpec.size}</Text>
                </View>
              </View>

              {/* Vi xử lý */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Vi xử lý</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Chip</Text>
                  <Text style={styles.value}>{productVariantSpec.microprocessor}</Text>
                </View>
              </View>

              {/* Bộ nhớ */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Bộ nhớ</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>RAM</Text>
                  <Text style={styles.value}>{productVariantSpec.ram}GB</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Bộ nhớ trong</Text>
                  <Text style={styles.value}>{productVariantSpec.storage}GB</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
  },
  openButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)", // nền tối mờ
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ProductSpecificationsModal;
