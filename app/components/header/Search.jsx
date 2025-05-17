import { StyleSheet, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const Search = () => {
  return (
    <>
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
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
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
});
