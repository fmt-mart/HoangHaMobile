import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { MyContext } from "../../context/myContext";
import { useRouter } from "expo-router";

const Logo_Cart = () => {
  const route = useRouter();
  const { count } = useContext(MyContext);
  return (
    <>
      {/* Logo & Giỏ hàng */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
        <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => route.push("/screens/CartScreen")}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../../assets/icons/cart.png")}
          />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{count}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Logo_Cart;

const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 45,
    resizeMode: "contain",
  },

  cartIcon: {
    position: "relative",
  },

  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
