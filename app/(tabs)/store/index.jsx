import React, { useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  Linking,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import Header from "../../components/header/Header";
import { get_city_stores } from "../../api/city_store_api";

const StoreItem = ({ address, hours, phone }) => (
  <Card style={styles.card}>
    <Text style={styles.address}>{address}</Text>
    <Text style={styles.hours}>{hours}</Text>
    <View style={styles.row}>
      <View style={styles.phoneContainer}>
        <MaterialIcons name="phone" size={18} color="#fff" />
        <Text style={styles.phone}>{phone}</Text>
      </View>
      <TouchableOpacity style={styles.detailBtn}>
        <Text style={styles.detailText}>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  </Card>
);

export default function StoreScreen() {
  const insets = useSafeAreaInsets(); //khi bi che boi tabBar
  const [search, setSearch] = useState("");

  const [openCity, setOpenCity] = useState(false);
  const [valueCity, setValueCity] = useState(null);
  const [openProvince, setOpenProvince] = useState(false);
  const [valueProvince, setValueProvince] = useState(null);

  // const [items, setItems] = useState([
  //   { label: "Hà Nội", value: "hanoi", store: ["Quận 1", "Quận 2", "Quận 3"] },
  //   {
  //     label: "TP. Hồ Chí Minh",
  //     value: "hcm",
  //     store: ["Quán 4", "Quán 5", "Quán 6"],
  //   },
  //   {
  //     label: "Đà Nẵng",
  //     value: "danang",
  //     store: ["Quán 7", "Quán 8", "Quán 9"],
  //   },
  // ]);

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
    items.find((item) => item.valueCity === valueCity)?.provinces || [];
  //flatMap: để gộp danh sách stores từ nhiều tỉnh thành thành một mảng duy nhất.

  const storesListofProvince =
    items
      .find((item) => item.valueCity === valueCity)
      ?.provinces.find((province) => province.valueProvince === valueProvince)
      ?.stores || [];

  const address = "48 Đống Đa, Phú Nhuận, Huế, Thua Thien Hue, VietNam";

  const openMap = async () => {
    // Địa chỉ Web (Google Maps)
    const query = encodeURIComponent(address);
    const webUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

    // Kiểm tra kết nối mạng
    const netState = await NetInfo.fetch();
    if (!netState.isConnected) {
      Alert.alert("Không có kết nối", "Vui lòng kiểm tra kết nối Internet.");
      return;
    }

    // Mở bản đồ
    const openMapUrl = async (url) => {
      try {
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) {
          await Linking.openURL(url);
        } else {
          throw new Error("Thiết bị không hỗ trợ mở bản đồ.");
        }
      } catch (error) {
        console.error("Lỗi mở bản đồ:", error);
        Alert.alert("Lỗi", "Không thể mở bản đồ. Vui lòng thử lại sau.");
      }
    };

    try {
      await openMapUrl(webUrl);
    } catch (error) {
      console.error("Lỗi mở bản đồ:", error);
      Alert.alert("Lỗi", "Không thể mở bản đồ. Vui lòng thử lại sau.");
    }
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#fff");
    }
    StatusBar.setBarStyle("light-content", true);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {/* Header */}
        <Header />

        <Text style={styles.title}>Tìm kiếm cửa hàng</Text>

        <TextInput
          placeholder="Nhập vị trí để tìm cửa hàng gần nhất"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />

        <Text style={styles.label}>Hoặc</Text>

        <DropDownPicker
          open={openCity}
          value={valueCity}
          items={items.map((item) => ({
            label: item.city,
            value: item.valueCity,
            key: item.id,
          }))}
          setOpen={(isOpen) => {
            setOpenCity(isOpen);
            if (isOpen) setOpenStore(false);
          }}
          setValue={setValueCity}
          setItems={setItems}
          placeholder="Lựa chọn tỉnh/thành phố"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.text}
          labelStyle={styles.labelStyle}
          listMode="MODAL" //Dùng ScrollView để tránh lỗi FlatList
          ArrowDownIconComponent={() => <Text style={styles.arrow}>▼</Text>}
          ArrowUpIconComponent={() => <Text style={styles.arrow}>▲</Text>}
        />

        {valueCity && (
          <>
            <DropDownPicker
              open={openProvince}
              value={valueProvince}
              items={provincesOptions.map((province) => ({
                label: province.name,
                value: province.valueProvince,
                key: province.id,
              }))}
              setOpen={(open) => {
                setOpenProvince(open);
                if (open) setOpenCity(false);
              }}
              setValue={setValueProvince}
              placeholder="Chọn quận/huyện"
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
        {valueCity && valueProvince ? (
          storesListofProvince.length > 0 ? (
            <ScrollView
              style={{
                borderWidth: 1,
                padding: 10,
                borderColor: "#ccc",
                borderRadius: 8,
                maxHeight: 430,
              }}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              {storesListofProvince.map((store, index) => (
                <StoreItem
                  key={index}
                  address={store.address}
                  hours={store.time}
                  phone={store.phone}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.noStore}>
              <Text style={styles.noStoreText}>Không tìm thấy cửa hàng</Text>
            </View>
          )
        ) : (
          <>
            <ScrollView
              style={{
                borderWidth: 1,
                padding: 10,
                borderColor: "#ccc",
                borderRadius: 8,
                height: 430,
              }}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              <StoreItem
                address="48 Đống Đa - TP Huế"
                hours="(8h00 - 21h00 (Shop SIS MobiFone))"
                phone="0905.66.88.48"
              />
              <StoreItem
                address="460 462 D.Tôn Đức Thắng, P.Hòa Khánh Nam, Q.Liên Chiểu, TP Đà Nẵng"
                hours="(8h00 - 21h30)"
                phone="0777.499.899"
              />
              <StoreItem
                address="Số 580-582 Điện Biên Phủ, Thanh Khê Đông, TP. Đà Nẵng (Đối diện Tượng đài Mẹ Nhu)"
                hours="(08h00 - 21h00 (Shop SIS MobiFone))"
                phone=""
              />
              <StoreItem
                address="48 Đống Đa - TP Huế"
                hours="(8h00 - 21h00 (Shop SIS MobiFone))"
                phone="0905.66.88.48"
              />
              <StoreItem
                address="460 462 D.Tôn Đức Thắng, P.Hòa Khánh Nam, Q.Liên Chiểu, TP Đà Nẵng"
                hours="(8h00 - 21h30)"
                phone="0777.499.899"
              />
              <StoreItem
                address="Số 580-582 Điện Biên Phủ, Thanh Khê Đông, TP. Đà Nẵng (Đối diện Tượng đài Mẹ Nhu)"
                hours="(08h00 - 21h00 (Shop SIS MobiFone))"
                phone=""
              />
            </ScrollView>
          </>
        )}
        <Text style={styles.label}>Bản đồ cửa hàng</Text>
        <TouchableOpacity onPress={openMap}>
          <Text style={styles.link}>Xem bản đồ cửa hàng</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  card: {
    padding: 12,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#d1f7e7",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  arrow: {
    fontSize: 18,
    marginRight: 10,
    color: "#009981",
  },
  address: {
    fontWeight: "bold",
    fontSize: 16,
  },
  hours: {
    color: "#038c2c",
    marginVertical: 4,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00b894",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  phone: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold",
  },
  detailBtn: {
    backgroundColor: "#1abc9c",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  detailText: {
    color: "#fff",
    fontWeight: "bold",
  },
  callout: {
    width: 200,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});
