import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MyContext } from "../context/myContext";
import { useRouter } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";

const OrderScreen = () => {
  const router = useRouter();

  const { user } = useContext(MyContext);
  const [userInfor, setUserInfor] = useState(
    user.firstName + " " + user.lastName
  );
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("store");
  const [note, setNote] = useState("");
  const [invoice, setInvoice] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const [openCity, setOpenCity] = useState(false);
  const [valueCity, setValueCity] = useState(null);
  const [openStore, setOpenStore] = useState(false);
  const [valueStore, setValueStore] = useState(null);

  const [items, setItems] = useState([
    { label: "Hà Nội", value: "hanoi", store: ["Quận 1", "Quận 2", "Quận 3"] },
    {
      label: "TP. Hồ Chí Minh",
      value: "hcm",
      store: ["Quán 4", "Quán 5", "Quán 6"],
    },
    {
      label: "Đà Nẵng",
      value: "danang",
      store: ["Quán 7", "Quán 8", "Quán 9"],
    },
  ]);

  const storeOptions =
    items.find((item) => item.value === valueCity)?.store || [];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Entypo name="menu" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace("/(tabs)/home")}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>

      {/* Nội dung cuộn được */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Thông tin đặt hàng</Text>

        {/* Input: Tên, SĐT, Email */}
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={userInfor}
          onChangeText={setUserInfor}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Hình thức nhận hàng */}
        <Text style={styles.label}>Hình thức nhận hàng</Text>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              deliveryMethod === "home" && styles.selectedOption,
            ]}
            onPress={() => setDeliveryMethod("home")}
          >
            <Text style={styles.optionText}>Nhận hàng tại nhà</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              deliveryMethod === "store" && styles.selectedOption,
            ]}
            onPress={() => setDeliveryMethod("store")}
          >
            <Text style={styles.optionText}>Nhận hàng tại cửa hàng</Text>
          </TouchableOpacity>
        </View>

        {/* Chọn tỉnh/thành phố và cửa hàng */}
        <Text style={styles.label}>Nơi nhận hàng</Text>
        <DropDownPicker
          open={openCity}
          value={valueCity}
          items={items}
          setOpen={(isOpen) => {
            setOpenCity(isOpen);
            if (isOpen) setOpenStore(false);
          }}
          setValue={setValueCity}
          setItems={setItems}
          placeholder="Nhấn để chọn"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.text}
          labelStyle={styles.labelStyle}
          listMode="MODAL" // Dùng ScrollView để tránh lỗi FlatList
          ArrowDownIconComponent={() => <Text style={styles.arrow}>▼</Text>}
          ArrowUpIconComponent={() => <Text style={styles.arrow}>▲</Text>}
        />

        {valueCity && (
          <>
            <Text style={styles.label}>Chọn Cửa Hàng</Text>
            <DropDownPicker
              open={openStore}
              value={valueStore}
              items={storeOptions.map((store) => ({
                value: store,
                label: store,
                key: store,
              }))}
              setOpen={(open) => {
                setOpenStore(open);
                if (open) setOpenCity(false);
              }}
              setValue={setValueStore}
              placeholder="Chọn cửa hàng"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.text}
              labelStyle={styles.labelStyle}
              listMode="MODAL"
              ArrowDownIconComponent={() => <Text style={styles.arrow}>▼</Text>}
              ArrowUpIconComponent={() => <Text style={styles.arrow}>▲</Text>}
            />
          </>
        )}

        {/* Ghi chú */}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ghi chú"
          value={note}
          onChangeText={setNote}
          multiline
        />

        {/* Xuất hóa đơn công ty */}
        <View style={styles.row}>
          <Switch value={invoice} onValueChange={setInvoice} />
          <Text style={styles.invoiceText}>Xuất hóa đơn công ty</Text>
        </View>

        {/* Mã giảm giá */}
        <View style={styles.discountContainer}>
          <TextInput
            style={[styles.input, styles.discountInput]}
            placeholder="Mã giảm giá (Nếu có)"
            value={discountCode}
            onChangeText={setDiscountCode}
          />
          <TouchableOpacity style={styles.discountButton}>
            <Text style={styles.discountText}>Sử dụng</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>XÁC NHẬN VÀ ĐẶT HÀNG</Text>
        </TouchableOpacity>

        <Text style={styles.description}>
          Quý khách có thể lựa chọn hình thức thanh toán sau khi đặt hàng.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
    position: "relative",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  menuButton: { position: "absolute", left: 10, padding: 10 },

  logo: {
    width: 180,
    height: 45,
    resizeMode: "contain",
  },

  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },

  textArea: { height: 80 },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },

  dropdown: {
    borderColor: "#009981",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  dropdownContainer: {
    borderColor: "#009981",
    borderRadius: 10,
    backgroundColor: "#e3f2fd",
  },
  text: { fontSize: 16, color: "#333" },
  labelStyle: { fontSize: 16, fontWeight: "bold" },
  arrow: { fontSize: 18, marginRight: 10, color: "#009981" },

  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  optionButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedOption: { backgroundColor: "#009981", borderColor: "#009981" },

  optionText: { color: "#000", fontWeight: "bold" },

  row: { flexDirection: "row", alignItems: "center", marginVertical: 10 },

  invoiceText: { marginLeft: 10, fontSize: 16, fontWeight: "bold" },

  discountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  discountInput: { flex: 1 },

  discountButton: {
    backgroundColor: "#009981",
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },

  discountText: { color: "#000", fontWeight: "bold" },

  button: {
    backgroundColor: "#009688", // Màu nền xanh lá cây cho nút
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
  },

  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },

  description: {
    textAlign: "center",
    paddingHorizontal: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default OrderScreen;
