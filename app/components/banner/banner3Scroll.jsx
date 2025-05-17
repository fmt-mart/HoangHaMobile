import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";

const { width } = Dimensions.get("window");

// Dữ liệu banner
const banners1 = [
  {
    id: 1,
    uri: "https://hoanghamobile.com/Content/Landding/Iphone16_end/img/promax/mb/mb%20pro%20max.png?v=1.4.2.6",
  },
  {
    id: 2,
    uri: "https://hoanghamobile.com/Content/Landding/Iphone16_end/img/pro/pc/pc1.png?v=1.4.2.6",
  },
  {
    id: 3,
    uri: "https://hoanghamobile.com/Content/Landding/Iphone16_end/img/pro/pc/pc2.png?v=1.4.2.6",
  },
  {
    id: 4,
    uri: "https://hoanghamobile.com/Content/Landding/Iphone16_end/img/pro/pc/pc3.png?v=1.4.2.6",
  },
  {
    id: 5,
    uri: "https://hoanghamobile.com/Content/Landding/Iphone16_end/img/pro/pc/pc4.png?v=1.4.2.6",
  },
  {
    id: 6,
    uri: "https://hoanghamobile.com/Content/Landding/Iphone16_end/img/pro/pc/pc5.png?v=1.4.2.6",
  },
  {
    id: 7,
    uri: "https://hoanghamobile.com/Content/Landding/Iphone16_end/img/pro/pc/pc6.png?v=1.4.2.6",
  },
];

const Banner3Scroll = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };
  return (
    <View>
      {/* Banner 1 Scroll */}
      <ScrollView
        horizontal
        pagingEnabled //cuon theo tung trang
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {banners1.map((banner) => (
          <Image
            key={banner.id}
            source={{ uri: banner.uri }}
            style={styles.banner1}
          />
        ))}
      </ScrollView>
      {/* Indicator Dots */}
      <View style={styles.indicatorContainer}>
        {banners1.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              activeIndex === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default Banner3Scroll;

const styles = StyleSheet.create({
  banner1: {
    width: width - 40, // Giảm chiều rộng để có khoảng cách hai bên
    height: 200, // Tăng chiều cao cho đẹp hơn
    borderRadius: 15, // Bo góc mềm mại
    marginHorizontal: 10,
    resizeMode: "contain",
  },
  // Indicator Dots
  indicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 180,
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Tạo nền mờ cho dots
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Dot mờ khi không active
    marginHorizontal: 6,
    transition: "width 0.3s ease-in-out",
  },
  activeIndicator: {
    backgroundColor: "#008060",
    width: 25,
    height: 8,
    borderRadius: 4,
  },
});
