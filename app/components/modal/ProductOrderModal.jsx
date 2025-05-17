import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import OrderForm from "./OrderForm";
import OrderFooter from "./OrderFooter";

export default function ProductModal({ visible, onClose, productVariant }) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>{productVariant.name}</Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Product Image */}
            <Image
              source={{ uri: productVariant.image }}
              style={styles.productImage}
            />

            {/* Price & Discount */}
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                {parseInt(productVariant.price).toLocaleString()} Vnđ
              </Text>
              {productVariant.oldPrice && (
                <Text style={styles.oldPrice}>
                  {productVariant.oldPrice.toLocaleString()} Vnđ
                </Text>
              )}
            </View>

            {/* Promotions: Khuyen mai */}
            {productVariant.promotions.length > 0 && (
              <View style={styles.promotionsContainer}>
                {productVariant.promotions.map((promo, index) => (
                  <View key={index} style={styles.promoBox}>
                    <Text style={styles.promoTitle}>KM{index + 1}</Text>
                    <Text style={styles.promoText}>{promo}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Hotline */}
            <TouchableOpacity style={styles.hotline}>
              <Text style={styles.hotlineText}>
                📞 {productVariant.hotline}
              </Text>
            </TouchableOpacity>

            <Text style={{ textAlign: "center", marginTop: 10 }}>
              Phím 1 - Hotline bán hàng online
            </Text>

            <Text
              style={{
                textAlign: "left",
                marginTop: 10,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Đặt hàng sản phẩm
            </Text>

            {/* Color Options */}
            <Text style={styles.sectionTitle}>Phiên bản</Text>
            <View style={styles.colorOptionsContainer}>
              <TouchableOpacity style={styles.colorOptions}>
                <View style={styles.colorBtn}>
                  {productVariant.storageList.map((storage, index) => (
                    <Text style={styles.colorText} key={index}>
                      {storage}GB
                    </Text>
                  ))}
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.colorOptions}>
                <View style={styles.colorBtn}>
                  {productVariant.colorList.map((color, index) => (
                    <Text style={styles.colorText} key={index}>
                      {color}
                    </Text>
                  ))}
                </View>
              </TouchableOpacity>
            </View>
            <OrderForm />
            <OrderFooter variantId={productVariant.variantId} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    maxHeight: "90%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
    flex: 1,
  },
  close: {
    fontSize: 22,
    color: "#333",
  },
  productImage: {
    height: 200,
    resizeMode: "contain",
    marginVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  price: {
    color: "red",
    fontSize: 22,
    fontWeight: "bold",
    marginRight: 10,
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "#888",
    fontSize: 18,
  },
  promotionsContainer: {
    marginBottom: 15,
  },
  promoBox: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  promoTitle: {
    fontWeight: "bold",
    color: "#008060",
  },
  promoText: {
    color: "#333",
  },
  hotline: {
    backgroundColor: "#00c292",
    padding: 12,
    borderRadius: 10,
    marginVertical: 12,
    alignItems: "center",
  },
  hotlineText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },

  colorOptionsContainer: {
    flexDirection: "row",
    gap: 10,
  },

  colorOptions: {
    flexDirection: "column",
    gap: 10,
  },
  colorBtn: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  colorText: {
    borderColor: "#000",
    fontWeight: "bold",
  },
});
