import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useMemo, useEffect } from "react";
import Headers from "../components/header/Header";
import Banner3Scroll from "../components/banner/banner3Scroll";
import { AntDesign } from "@expo/vector-icons";
import VersionPhone from "../components/versionPhone";
import Order from "../components/infor_product/Order";
import Specifications from "../components/infor_product/specifications";
import { useLocalSearchParams } from "expo-router";
import PolicyInfo from "../components/Policy_Info";

const ProductInforScreen = () => {
  const { item } = useLocalSearchParams() || {}; //se chay lien tuc
  const parsedItem = JSON.parse(item);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Headers />

      {/* Banner 3 Scroll */}
      <Banner3Scroll />

      <View style={styles.imageContainer}>
        {/* Background mờ để tạo hiệu ứng sang trọng */}
        <View style={styles.imageBackground}>
          <Image
            source={{ uri: parsedItem.variants[0]?.image }}
            style={styles.productImage}
          />
        </View>

        {/* Nút yêu thích */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <AntDesign
            name={isFavorite ? "heart" : "hearto"}
            size={28}
            color={isFavorite ? "red" : "#999"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{parsedItem.name}</Text>
        <Text style={styles.price}>
          {parseInt(parsedItem.variants[0]?.gia).toLocaleString()} Vnđ
        </Text>
      </View>

      <VersionPhone itemVariants={parsedItem} />
      <Order productId={parsedItem.id} variantId={parsedItem.variants[0]?.id} />
      <Specifications itemVariants={parsedItem} />
      <PolicyInfo />
    </ScrollView>
  );
};

export default ProductInforScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    flex: 1,
    position: "relative",
  },

  imageContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },

  imageBackground: {
    backgroundColor: "#f8f8f8",
    borderRadius: 20,
    padding: 15,
    elevation: 5, // Bóng cho Android
    // shadowColor: "#000", // Bóng cho iOS
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 8,
  },

  productImage: {
    width: 370,
    height: 350,
    resizeMode: "contain",
    borderRadius: 15,
  },

  favoriteButton: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    elevation: 3, // Bóng cho Android
    // shadowColor: "#000", // Bóng cho iOS
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
  },

  infoContainer: {
    padding: 10,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
  },

  price: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
  },
});
