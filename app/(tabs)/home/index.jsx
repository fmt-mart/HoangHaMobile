import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  BackHandler,
  Alert,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Header from "../../components/header/Header";
import ProductList from "../../components/list/ProductList";
import CategoryList from "../../components/list/CategoryList";
import Banner1Scroll from "../../components/banner/banner1Scroll";
import Banner2Scroll from "../../components/banner/banner2Scroll";
import { ActivityIndicator } from "react-native";
import { get_user_infor } from "../../api/user_api";
import { useFocusEffect } from "@react-navigation/native";
import useAuthCheck from "../../hooks/useAuthCheck";

export default function HomeScreen() {
  const insets = useSafeAreaInsets(); //khi bi che boi tabBar
  useAuthCheck();
  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#fff");
    }
    StatusBar.setBarStyle("light-content", true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Thoát ứng dụng", "Bạn có muốn thoát không?", [
          { text: "Hủy", style: "cancel" },
          { text: "Thoát", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#009981" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: insets.bottom + 55 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Thanh chào */}
        <View style={styles.welcomeBar}>
          <Text style={styles.welcomeText}>
            Chào, {user.firstName + " " + user.lastName}{" "}
          </Text>
        </View>

        {/* Header */}
        <Header />

        {/* Banner 1 Scroll */}
        <Banner1Scroll />

        {/* Banner 2 Scroll */}
        <Banner2Scroll />

        {/* Category List*/}
        <CategoryList onSelectCategory={setSelectedCategory} />
        {/* Product List */}
        <ProductList categoryId={selectedCategory} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    position: "relative",
  },

  // Thanh chào
  welcomeBar: {
    backgroundColor: "#ff6633",
    padding: 8,
    borderRadius: 8,
    width: "55%",
    alignItems: "center",
  },
  welcomeText: { color: "white", fontSize: 14, fontWeight: "bold" },
});
