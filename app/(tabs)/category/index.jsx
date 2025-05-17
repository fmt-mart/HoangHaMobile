import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { get_categories } from "../../api/category_api";

const brands = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "TECNO",
  "OPPO",
  "HONOR",
  "OSCAL",
  "REDMAGIC",
  "Vivo",
  "Nokia",
  "Xphone",
  "Infinix",
  "HTC",
  "INOI",
  "realme",
  "Nubia",
  "XOR",
  "Masstel",
  "TCL",
  "itel",
];

export default function CategoryScreen() {
  const [selected, setSelected] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#fff");
    }
    StatusBar.setBarStyle("light-content", true);
  }, []);

  useEffect(() => {
    get_categories()
      .then((data) => {
        setCategories(data.result || []);
        setSelected(data.result[0]?.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Hôm nay bạn muốn tìm gì?"
        />
      </View>

      {/* Tabs DANH MỤC - HÀNG CŨ */}
      <View style={styles.tabRow}>
        <Text style={styles.activeTab}>DANH MỤC</Text>
        <Text style={styles.inactiveTab}>HÀNG CŨ</Text>
      </View>

      {/* Nội dung chính */}
      <View style={styles.content}>
        {/* Danh mục trái */}
        <ScrollView style={styles.leftColumn}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryItem,
                selected === item.id && styles.activeCategory,
              ]}
              activeOpacity={0.7}
              onPress={() => {
                if (selected !== item.id) {
                  setSelected(item.id);
                }
              }}
            >
              <Image source={{ uri: item.image }} style={styles.icon} />
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Thương hiệu phải */}
        <View style={styles.rightColumn}>
          <TouchableOpacity style={styles.viewAllBtn}>
            <Text style={styles.viewAllText}>Xem tất cả</Text>
          </TouchableOpacity>
          {selected && (
            <FlatList
              data={
                categories.find((item) => item.id === selected)?.attributes ||
                []
              }
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.subTitle}>{item.name}</Text>
                  <View style={styles.brandBox}>
                    {item.children.map((child) => (
                      <TouchableOpacity
                        key={child.id}
                        style={styles.brandOption}
                      >
                        <Text style={styles.brandText}>{child.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            />
          )}
          {/* <FlatList
            data={brands}
            keyExtractor={(item) => item}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
              <View style={styles.brandBox}>
                <Text style={styles.brandText}>{item}</Text>
              </View>
            )}
          /> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  // Tìm kiếm
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    elevation: 3, // Hiệu ứng nổi trên Android
  },
  tabRow: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
  },
  activeTab: {
    marginRight: 20,
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#00AA66",
    paddingBottom: 5,
  },
  inactiveTab: {
    color: "gray",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
  },
  leftColumn: {},
  categoryItem: {
    backgroundColor: "#e7f4f3",
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    width: "80%",
    borderColor: "#e7f4f3",
  },
  activeCategory: {
    borderColor: "#00AA66",
    borderWidth: 2,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
    resizeMode: "contain",
  },
  categoryText: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
  },
  rightColumn: {
    flex: 5,
  },
  viewAllBtn: {
    backgroundColor: "#00AA66",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
  viewAllText: {
    color: "#fff",
    fontWeight: "bold",
  },
  subTitle: {
    marginBottom: 10,
    color: "#007744",
    fontWeight: "600",
  },

  brandBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  brandOption: {
    width: "48%",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },

  brandText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
