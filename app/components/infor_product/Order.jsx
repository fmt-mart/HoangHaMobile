import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { MyContext } from "../../context/myContext";
import { get_cart, add_to_cart } from "../../api/cart_api";
import {
  get_product_byId,
  get_variant_product_byId,
} from "../../api/product_api";
import ProductOrderModal from "../modal/ProductOrderModal";

const Order = ({ productId, variantId }) => {
  const [addtoCart, setAddtoCart] = useState(false);
  const [count, setCount] = useState(1);
  const { user, setCart } = useContext(MyContext);
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState({});
  const [variant, setVariant] = useState({});

  useEffect(() => {
    get_product_byId(productId)
      .then((data) => {
        setProduct(data.result.variants[0]);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      });
  }, []);

  useEffect(() => {
    get_variant_product_byId(productId, variantId)
      .then((data) => {
        setVariant(data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      });
  }, []);

  const mockVariantProduct = {
    variantId: variantId,
    name: product.name,
    price: variant.gia,
    oldPrice: 30190000,
    image: variant.image,
    hotline: "1900.2091",
    promotions: [
      "Giảm giá 0.4% cho thành viên SILVER",
      "Trả góp 0% lãi suất - 0 phí chuyển đổi - 0 trả trước",
      "Mở thẻ TPBank EVO - Giảm đến 200k hoặc hoàn đến 500k",
    ],
    storageList: [variant.storage],
    colorList: [variant.color],
  };

  const handleAddToCart = async () => {
    try {
      await add_to_cart(user.id, {
        variantId: variantId,
        quantity: 1,
      });
      // 🔹 Cập nhật lại giỏ hàng ngay lập tức
      const data = await get_cart(user.id);
      setCart(data.result || []);
    } catch (error) {
      return { success: false, message: "Failed to fetch categories" };
    }
  };

  return (
    <View>
      {/* Nút đặt hàng */}
      <View style={styles.orderContainer}>
        <View style={styles.boxOrder}>
          <TouchableOpacity
            onPress={() => {
              setAddtoCart(!addtoCart);
              setCount(count + 1);
              handleAddToCart();
            }}
            style={[
              styles.orderButtonBackground,
              {
                backgroundColor:
                  count > 1 ? "#FD475A" : addtoCart ? "#FD475A" : "white",
              },
            ]}
          >
            <Feather
              name="shopping-cart"
              size={24}
              color={count > 1 ? "white" : addtoCart ? "white" : "#FD475A"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.orderTextBackground}
            onPress={() => {
              setVisible(true);
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              MUA NGAY
            </Text>
            <Text style={{ color: "white" }}>
              (Giao tận nhà hoặc nhận tại cửa hàng)
            </Text>
          </TouchableOpacity>
          <ProductOrderModal
            visible={visible}
            onClose={() => setVisible(false)}
            productVariant={mockVariantProduct}
          />
        </View>
        <View style={styles.boxOrderButton}>
          <TouchableOpacity style={styles.orderButtonTraGop}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              TRẢ GÓP 0%
            </Text>
            <Text style={{ color: "white" }}>Không phí - Duyệt nhanh 10p</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.orderButtonTraGop}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              TRẢ GÓP QUA THẺ
            </Text>
            <Text style={{ color: "white" }}>(Visa, Mastercard, JCB)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  orderContainer: {
    flexDirection: "column",
    alignItems: "center",
  },

  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  selectedOption: {
    backgroundColor: "white",
  },

  boxOrder: {
    flexDirection: "row",
    width: "100%",
    marginVertical: -20,
    justifyContent: "center",
  },

  orderButtonBackground: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#FD475A",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 50,
    marginHorizontal: 5,
  },

  orderTextBackground: {
    backgroundColor: "#FD475A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 5,
  },

  boxOrderButton: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },

  orderButtonTraGop: {
    backgroundColor: "#009981",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 5,
  },
});
