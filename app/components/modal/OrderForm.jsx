import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { MyContext } from "../../context/myContext";
import { get_city_stores } from "../../api/city_store_api";

export default function OrderForm() {
  const {
    quantity,
    setQuantity,
    city,
    setCity,
    province,
    setProvince,
    store,
    setStore,
    address,
    setAddress,
  } = useContext(MyContext);
  const [deliveryMethod, setDeliveryMethod] = useState("store");

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const [items, setItems] = useState([]);
  useEffect(() => {
    get_city_stores()
      .then((data) => {
        setItems(data.result);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }, []);

  const provincesOptions =
    items.find((item) => item.valueCity === city)?.provinces || [];
  //flatMap: để gộp danh sách stores từ nhiều tỉnh thành thành một mảng duy nhất.

  const storesListofProvince =
    items
      .find((item) => item.valueCity === city)
      ?.provinces.find((item) => item.valueProvince === province)?.stores || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Số lượng</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.qtyButton} onPress={decreaseQty}>
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity style={styles.qtyButton} onPress={increaseQty}>
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>

      <TextInput placeholder="Họ và tên *" style={styles.input} />
      <View style={styles.row}>
        <TextInput
          placeholder="Số điện thoại *"
          style={[styles.input, styles.halfInput]}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Email *"
          style={[styles.input, styles.halfInput]}
          keyboardType="email-address"
        />
      </View>

      <Text style={styles.label}>Hình thức nhận hàng</Text>
      <View style={styles.radioRow}>
        <TouchableOpacity
          style={[
            styles.radioBox,
            deliveryMethod === "home" && styles.radioBoxSelected,
          ]}
          onPress={() => setDeliveryMethod("home")}
        >
          <RadioButton
            value="home"
            status={deliveryMethod === "home" ? "checked" : "unchecked"}
            onPress={() => setDeliveryMethod("home")}
            color="#00c297"
          />
          <Text style={styles.radioText}>Nhận hàng tại nhà</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.radioBox,
            deliveryMethod === "store" && styles.radioBoxSelected,
          ]}
          onPress={() => setDeliveryMethod("store")}
        >
          <RadioButton
            value="store"
            status={deliveryMethod === "store" ? "checked" : "unchecked"}
            onPress={() => setDeliveryMethod("store")}
            color="#00c297"
          />
          <Text style={styles.radioText}>Nhận hàng tại cửa hàng</Text>
        </TouchableOpacity>
      </View>
      {/* Hiển thị Form nếu chọn "home" */}
      {deliveryMethod === "home" && (
        <View>
          <Text style={styles.label}>Nơi nhận hàng</Text>

          <RNPickerSelect
            onValueChange={(value) => setCity(value)}
            items={items.map((item) => ({
              label: item.city,
              value: item.valueCity,
            }))}
            placeholder={{ label: "Tỉnh/Thành phố *", value: null }}
            style={pickerSelectStyles}
          />

          <RNPickerSelect
            onValueChange={(value) => setProvince(value)}
            items={provincesOptions.map((item) => ({
              label: item.name,
              value: item.valueProvince,
            }))}
            placeholder={{ label: "Quận/Huyện *", value: null }}
            style={pickerSelectStyles}
          />

          <TextInput
            placeholder="Địa chỉ nhận hàng*"
            multiline
            numberOfLines={4}
            style={[styles.input, styles.textArea]}
            onChangeText={setAddress}
          />
          <TextInput
            placeholder="Ghi chú"
            multiline
            numberOfLines={4}
            style={[styles.input, styles.textArea]}
          />
        </View>
      )}
      {/* Hiển thị Form nếu chọn "store" */}
      {deliveryMethod === "store" && (
        <View>
          <Text style={styles.label}>Nơi nhận hàng</Text>
          <RNPickerSelect
            onValueChange={(value) => setCity(value)}
            items={items.map((item) => ({
              label: item.city,
              value: item.valueCity,
            }))}
            placeholder={{ label: "Tỉnh/Thành phố *", value: null }}
            style={pickerSelectStyles}
          />

          <RNPickerSelect
            onValueChange={(value) => setProvince(value)}
            items={provincesOptions.map((item) => ({
              label: item.name,
              value: item.valueProvince,
            }))}
            placeholder={{ label: "Quận/Huyện *", value: null }}
            style={pickerSelectStyles}
          />

          <RNPickerSelect
            onValueChange={(value) => setStore(value)}
            items={storesListofProvince.map((item) => ({
              label: item.address,
              value: item.address,
            }))}
            placeholder={{ label: "Cửa hàng *", value: null }}
            style={pickerSelectStyles}
          />
          <TextInput
            placeholder="Ghi chú"
            multiline
            numberOfLines={4}
            style={[styles.input, styles.textArea]}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 3,
  },
  label: {
    marginTop: 16,
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  qtyButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "500",
    marginHorizontal: 16,
  },
  input: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    fontSize: 16,
  },
  radioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 12,
  },
  radioBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  radioBoxSelected: {
    borderColor: "#00c29a",
    backgroundColor: "#e6f0ff",
  },
  radioText: {
    fontSize: 14,
    color: "#333",
    flexShrink: 1,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});

const pickerSelectStyles = {
  inputIOS: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    color: "black",
    marginTop: 12,
  },
  inputAndroid: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    color: "black",
    marginTop: 12,
  },
};
