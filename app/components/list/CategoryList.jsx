import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { get_categories } from "../../api/category_api";

const CategoryItem = ({ item, onSelectCategory }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => onSelectCategory(item.id)}>
        <Image source={{ uri: item.image }} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );
};

const CategoryList = ({ _, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    get_categories()
      .then((data) => {
        setCategories(data.result || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#009981" />
      ) : (
        <View>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CategoryItem item={item} onSelectCategory={onSelectCategory} />
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  item: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EAF0FF",
    padding: 10,
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});

export default CategoryList;
