import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { get_cart_byUserId, remove_from_cart, update_cart } from "../api/cart_api";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { get_user_infor } from "../api/user_api";

const CartScreen = () => {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const discount = 58000;

  const prevUserId = useRef(null);

  useEffect(() => {
    get_user_infor()
      .then((data) => {
        setUser(data.result || {});
      })
      .catch((error) => {
        console.log("Lỗi khi lấy user:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getCartByUserId = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const data = await get_cart_byUserId(user.id);
      setCart(data.result || []);
      const total = data.result.reduce(
        (sum, item) => sum + parseInt(item.gia) * item.quantity,
        0
      );
      setTotalPrice(total);
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user.id || user.id === prevUserId.current) return;

    prevUserId.current = user.id;
    setLoading(true);

    getCartByUserId(); // Lấy giỏ hàng khi user đăng nhập
  }, [user.id]);

  const handleRemoveFromCart = async (productVariantId) => {
    if (!user?.id) return;

    setLoading(true);

    try {
      // 🔹 Tìm sản phẩm trong giỏ hàng theo id
      const matchedProduct = cart.find((item) => item.productVariantId === productVariantId);
      if (!matchedProduct) {
        console.warn("Không tìm thấy sản phẩm trong giỏ hàng");
        setLoading(false);
        return;
      }

      const data = await remove_from_cart(user.id, matchedProduct.productVariantId);
      console.log("Xóa sản phẩm thành công:", data);
      const newCart = cart.filter((item) => item.productVariantId !== productVariantId); // Lọc sản phẩm đã xóa ra khỏi giỏ hàng
      const total = newCart.reduce(
        (sum, item) => sum + parseInt(item.gia) * item.quantity,
        0
      );
      setCart(newCart); // Cập nhật giỏ hàng mới
      setTotalPrice(total); // Cập nhật lại tổng giá trị giỏ hàng
      console.log("Số lượng sản phẩm trong giỏ hàng:", newCart.length);
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCart = async (productVariantId, quantity) => {
    if (!user?.id) return;

    try {
      // 🔹 Tìm sản phẩm trong giỏ hàng theo id
      const matchedProduct = cart.find((item) => item.productVariantId === productVariantId);
      if (!matchedProduct) {
        console.warn("Không tìm thấy sản phẩm trong giỏ hàng");
        setLoading(false);
        return;
      }

      if (quantity < 1) {
        console.warn("Số lượng sản phẩm không hợp lệ");
        return;
      }
      if (quantity > 10) {
        console.warn("Số lượng sản phẩm không hợp lệ");
        return;
      }

      const data = await update_cart(user.id, {
        productVariantId: matchedProduct.productVariantId,
        quantity: quantity,
      });
      console.log("Result:", data);

      const newCart = cart.map((item) =>
        item.productVariantId === productVariantId ? { ...item, quantity: quantity } : item
      );
      const total = newCart.reduce(
        (sum, item) => sum + parseInt(item.gia) * item.quantity,
        0
      );
      setCart(newCart); // Cập nhật giỏ hàng mới
      setTotalPrice(total); // Cập nhật lại tổng giá trị giỏ hàng
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng:", error);
    }
  };

  const CartItem = ({ item }) => {
    // Calculate total price
    useEffect(() => {
      let total = cart.reduce(
        (sum, item) => sum + parseInt(item.gia) * item.quantity,
        0
      );
      setTotalPrice(total);
    }, [cart]);

    return (
      <View style={styles.itemContainer}>
        {/* Product Image */}
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.image}
        />

        {/* Nút xoá sản phẩm */}
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveFromCart(item.productVariantId)}
          activeOpacity={0.7}
        >
          <FontAwesome name="remove" size={24} color="#FF0000" />
        </TouchableOpacity>

        {/* Product Title */}
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>
          {(item.gia * item.quantity).toLocaleString()} đ{" "}
          <Text style={styles.oldPrice}>
            {(parseInt(item.gia) + discount).toLocaleString()} đ
          </Text>
        </Text>

        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => {
              handleUpdateCart(item.productVariantId, item.quantity - 1);
            }}
            disabled={item.quantity <= 1}
            style={styles.qtyButton}
          >
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => {
              handleUpdateCart(item.productVariantId, item.quantity + 1);
            }}
            disabled={item.quantity >= 10}
            style={styles.qtyButton}
          >
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Promotions */}
        <View style={styles.promoContainer}>
          <View style={styles.promoItem}>
            <Text style={styles.promoLabel}>KM1</Text>
            <Text>Giảm giá 0.5% cho thành viên hạng SILVER</Text>
            <Text style={styles.discount}>
              Quy đổi: -{discount.toLocaleString()} đ
            </Text>
          </View>

          <View style={styles.promoItem}>
            <Text style={styles.promoLabel}>KM2</Text>
            <Text>
              Mở thẻ TPBank EVO – Nhận ưu đãi giảm đến 200.000 đ khi trả góp 0%.
            </Text>
          </View>
        </View>

        {/* Storage & Color Options */}
        <View style={styles.optionContainer}>
          <View style={styles.option}>
            <Text style={styles.optionLabel}>Phiên bản</Text>
            <Text style={styles.optionValue}>128GB</Text>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionLabel}>Màu sắc</Text>
            <Text style={styles.optionValue}>Đen</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Entypo name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>

      {/* Cart Items */}
      {loading ? (
        <ActivityIndicator size="large" color="#009981" />
      ) : cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Giỏ hàng trống</Text>
        </View>
      ) : (
        // Render cart items
        <FlatList
          data={cart}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CartItem item={item} />}
          numColumns={1}
        />
      )}

      {/* Total Price */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Tổng giá trị: {totalPrice.toLocaleString()} đ
        </Text>
        <Text style={styles.totalText}>
          Giảm giá: -{discount.toLocaleString()} đ
        </Text>
        <Text style={styles.finalTotal}>
          Tổng thanh toán: {(parseInt(totalPrice) - discount).toLocaleString()}{" "}
          đ
        </Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/screens/OrderScreen")}
      >
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  menuButton: {
    position: "absolute",
    left: 10,
    padding: 10,
  },
  logo: {
    width: 180,
    height: 45,
    resizeMode: "contain",
  },

  itemContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 20,
    marginBottom: 16,
    elevation: 5,
  },

  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },

  removeButton: {
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

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
    textAlign: "center",
  },

  price: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
  },

  oldPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: "gray",
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  qtyButton: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  promoContainer: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  promoItem: {
    marginBottom: 8,
  },
  promoLabel: {
    backgroundColor: "#FFA500",
    color: "#fff",
    fontWeight: "bold",
    padding: 4,
    borderRadius: 5,
    textAlign: "center",
    marginBottom: 4,
    width: 40,
  },
  discount: {
    color: "red",
    fontWeight: "bold",
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  option: {
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  optionValue: {
    fontSize: 14,
    color: "#008000",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },

  emptyText: {
    fontWeight: "bold",
  },

  totalContainer: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  totalText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  finalTotal: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#009981",
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
