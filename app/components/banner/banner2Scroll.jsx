import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";

const banners2 = [
  {
    id: 1,
    uri: "https://cdn.hoanghamobile.com/i/home/Uploads/2025/02/13/sanphamhot2-samsung.png",
  },
  {
    id: 2,
    uri: "https://cdn.hoanghamobile.com/i/home/Uploads/2025/03/05/sanphamhot2-reno13f-2.png",
  },
  {
    id: 3,
    uri: "https://cdn.hoanghamobile.com/i/home/Uploads/2025/02/13/sanphamhot2-note-14_638750427713389418.png",
  },
  {
    id: 4,
    uri: "https://cdn.hoanghamobile.com/i/home/Uploads/2025/03/12/sanphamhot2.png",
  },
];
const Banner2Scroll = () => {
  return (
    <View>
      {/* Banner 2 Scroll */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={banners2}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.banner2} />
        )}
      ></FlatList>
    </View>
  );
};

export default Banner2Scroll;

const styles = StyleSheet.create({
  banner2: {
    width: 200,
    height: 150,
    borderRadius: 15,
    marginHorizontal: 5,
    resizeMode: "contain",
  },
});
