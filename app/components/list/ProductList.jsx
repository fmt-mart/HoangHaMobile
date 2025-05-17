import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { get_products, get_products_byCategoryId } from "../../api/product_api";
import { useRouter } from "expo-router";

export default function ProductList({ categoryId }) {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    get_products()
      .then((data) => {
        setProducts(data.result || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!categoryId) {
      setProducts([]);
      return;
    }
    setLoading(true);
    get_products_byCategoryId(categoryId)
      .then((data) => {
        setProducts(data.result || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [categoryId]);

  const ProductItem = ({ item }) => {
    const variant = item.variants[0];

    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/screens/ProductInforScreen",
              params: { item: JSON.stringify(item) },
            })
          }
        >
          <View style={styles.imageContainer}>
            <Image source={{ uri: variant.image }} style={styles.image} />
            <View style={styles.specsOverlay}>
              <>
                {item.categoryId === "2a2dc722-4e8c-4b52-ab2c-b5f5a5eb8a53" ||
                item.categoryId === "30e86775-c771-4cb2-9bdb-8424261a16ca" ? (
                  <>
                    <View style={styles.specItem}>
                      <MaterialIcons name="memory" size={16} color="gray" />
                      <Text style={styles.specText}>
                        {variant.microprocessor}
                      </Text>
                    </View>
                    <View style={styles.specItem}>
                      <MaterialIcons name="storage" size={16} color="gray" />
                      <Text style={styles.specText}>{variant.storage}GB</Text>
                    </View>
                    <View style={styles.specItem}>
                      <MaterialIcons name="memory" size={16} color="gray" />
                      <Text style={styles.specText}>{variant.ram}GB</Text>
                    </View>
                  </>
                ) : item.categoryId ===
                  "5c3f805d-ed2e-4f22-b472-80dceefd3d87" ? (
                  <>
                    <View style={styles.specItem}>
                      <MaterialIcons name="computer" size={16} color="gray" />
                      <Text style={styles.specText}>{variant.size} inch</Text>
                    </View>
                    <View style={styles.specItem}>
                      <MaterialIcons
                        name="screenshot-monitor"
                        size={16}
                        color="gray"
                      />
                      <Text style={styles.specText}>
                        {variant.scanFrequency} Hz
                      </Text>
                    </View>
                    <View style={styles.specItem}>
                      <SimpleLineIcons
                        name="screen-desktop"
                        size={16}
                        color="gray"
                      />
                      <Text style={styles.specText}>{variant.resolution}</Text>
                    </View>
                  </>
                ) : (
                  <></>
                )}
              </>
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.name} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.price}>
              {parseInt(item.variants[0]?.gia).toLocaleString()} Vnđ
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#009981" />
      ) : (
        <FlatList
          nestedScrollEnabled={true} //cuộn trong ScrollView
          scrollEnabled={false} // Tắt cuộn của FlatList (ScrollView sẽ xử lý cuộn)
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return ProductItem({ item });
          }}
          columnWrapperStyle={styles.row} // Căn chỉnh hàng ngang
        />
      )}
    </View>
  );
}

{
  /* <View>
{Array.from(
  { length: Math.ceil(products.length / 2) },
  (_, index) => {
    const items = products.slice(index * 2, index * 2 + 2);
    return (
      <View key={index} style={styles.row}>
        {items.map((item) => (
          <TouchableOpacity key={item.id}>renderItem({item})</TouchableOpacity>
        ))}
      </View>
    );
  }
)}
</View>  */
}

const styles = StyleSheet.create({
  // card: {
  //   flex: 1, // Chia đều không gian trên hàng (mỗi card chiếm 1 phần bằng nhau)
  //   backgroundColor: "white", // Màu nền trắng cho card
  //   borderRadius: 12, // Bo góc nhẹ 12px giúp card trông mềm mại hơn
  //   overflow: "hidden", // Giữ nội dung trong card, tránh bị tràn ra ngoài
  //   margin: 6, // Khoảng cách giữa các card để không bị dính vào nhau
  //   //elevation: 5, // Tạo độ nổi trên Android (giống shadow)
  //   //shadowColor: "#000", // Màu của đổ bóng trên iOS
  //   //shadowOffset: { width: 0, height: 2 }, // Đổ bóng xuống dưới 2px
  //   //shadowOpacity: 0.1, // Độ mờ của bóng (0.1 là rất nhẹ)
  //   //shadowRadius: 4, // Bán kính làm mềm bóng để trông tự nhiên hơn
  // },

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap", // Cho phép các card xuống dòng nếu không đủ chỗ
    justifyContent: "space-between", // Cách đều các card
  },
  card: {
    width: "48%", // Chỉ chiếm 48% để có thể có 2 card trên một hàng
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 10, // Khoảng cách giữa các hàng
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    backgroundColor: "#f0f0f0",
  },
  specsOverlay: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 6,
    borderRadius: 8,
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  specText: {
    fontSize: 12,
    color: "gray",
    marginLeft: 4,
    width: 80,
  },
  cardContent: {
    padding: 12,
    alignItems: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    color: "#ff5722",
    fontWeight: "bold",
    marginTop: 8,
  },
});
