import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Checkbox } from "react-native-paper";
import { MyContext } from "../../context/myContext";
import { ordered_product } from "../../api/ordered_api";

export default function OrderFooter({ variantId }) {
  const router = useRouter();
  const { user, quantity, store, address } = useContext(MyContext);
  const [checked, setChecked] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const handleOrderProduct = async () => {
    try {
      await ordered_product(user.id, {
        variantId: variantId,
        quantity: quantity,
        address: address,
        receiveAt: store,
      });
    } catch (error) {
      return { success: false, message: "Failed to fetch categories" };
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => setChecked(!checked)}
          color="#00C297"
        />
        <Text style={styles.checkboxText}>
          Yêu cầu xuất hóa đơn công ty{" "}
          <Text style={styles.checkboxNote}>
            (Vui lòng điền email để nhận hóa đơn VAT)
          </Text>
        </Text>
      </View>

      <View style={styles.discountContainer}>
        <TextInput
          style={styles.discountInput}
          placeholder="Mã giảm giá (Nếu có)"
          placeholderTextColor="#aaa"
          value={discountCode}
          onChangeText={setDiscountCode}
        />
        <TouchableOpacity style={styles.discountButton}>
          <Text style={styles.discountButtonText}>Sử dụng</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.termsText}>
        Bằng cách đặt hàng bạn đã đồng ý với{" "}
        <Text style={styles.linkText}>điều khoản sử dụng</Text> và{" "}
        <Text style={styles.linkText}>chính sách đổi trả</Text>
      </Text>

      <Text style={styles.warningText}>
        ⚠️ Quý khách lưu ý, Hoàng Hà Mobile không yêu cầu khách hàng phải đặt
        cọc hoặc chuyển khoản toàn bộ đơn hàng để giữ hàng. Quý khách chỉ thanh
        toán tiền khi nhận tại cửa hàng hoặc đang cầm hàng hóa trên tay. Không
        nên chuyển khoản cho người giao hàng khi không gặp trực tiếp.
      </Text>

      <Text style={styles.termsText}>
        Quý khách có thể lựa chọn hình thức thanh toán sau khi đặt hàng.
      </Text>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          handleOrderProduct();
          router.push("/screens/OrderSuccessScreen");
        }}
      >
        <Text style={styles.submitButtonText}>TIẾN HÀNH ĐẶT HÀNG</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    marginTop: 6,
  },
  checkboxNote: {
    fontSize: 13,
    color: "#888",
  },
  discountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  discountInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  discountButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  discountButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  termsText: {
    fontSize: 13,
    color: "#444",
    marginBottom: 10,
    lineHeight: 18,
  },
  warningText: {
    fontSize: 13,
    color: "#d93025",
    backgroundColor: "#fff3f2",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    lineHeight: 18,
  },
  linkText: {
    color: "#00C297",
    textDecorationLine: "underline",
  },
  submitButton: {
    backgroundColor: "#00C297",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
