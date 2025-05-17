import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

const StorageOptions = ({ variants }) => {
  const [selectedStorage, setSelectedStorage] = useState(null);

  useEffect(() => {
    if (variants.length > 0) {
      setSelectedStorage(String(variants[0].storage));
    }
  }, [variants]);

  const storagePrices = variants.reduce((acc, variant) => {
    if (!acc[variant.storage]) {
      acc[variant.storage] = parseInt(variant.gia).toLocaleString();
    }
    return acc;
  }, {});

  const uniqueStorage = Object.keys(storagePrices);

  return (
    <>
      <Text style={styles.version_color}>Lựa chọn phiên bản</Text>
      <View style={styles.optionsContainer}>
        {Array.from({ length: Math.ceil(uniqueStorage.length / 2) }).map(
          (_, rowIndex) => {
            const items = uniqueStorage.slice(rowIndex * 2, rowIndex * 2 + 2);
            return (
              <View key={rowIndex} style={styles.row}>
                {items.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setSelectedStorage(item)}
                    style={[
                      styles.option,
                      item === selectedStorage && styles.selectedOption,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        item === selectedStorage && styles.selectedText,
                      ]}
                    >
                      {item}GB
                    </Text>
                    <Text style={styles.price}>{storagePrices[item]} Vnđ</Text>
                    {item === selectedStorage && (
                      <AntDesign
                        name="checkcircle"
                        size={18}
                        color="#009981"
                        style={styles.checkIcon}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            );
          }
        )}
      </View>
    </>
  );
};

export default StorageOptions;

const styles = StyleSheet.create({
  version_color: {
    fontSize: 16,
    fontWeight: "bold",
  },

  optionsContainer: {
    justifyContent: "space-between",
    marginVertical: 10,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
  },

  option: {
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    height: 65,
    width: 190,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },

  optionText: {
    fontSize: 16,
    color: "#333",
  },

  price: {
    fontSize: 15,
    color: "red",
    fontWeight: "bold",
  },

  selectedOption: {
    borderColor: "#009981",
    backgroundColor: "#EAF0FF",
  },

  selectedText: {
    color: "#009981",
    fontWeight: "bold",
  },
});
