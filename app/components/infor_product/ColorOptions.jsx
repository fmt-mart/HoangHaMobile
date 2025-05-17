import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const ColorOptions = ({ colorList }) => {
  const uniqueColors = [...new Set(colorList)];
  const [selectedColor, setSelectedColor] = useState(
    uniqueColors[0] || null
  );

  return (
    <>
      <Text style={styles.version_color}>Lựa chọn màu</Text>
      <View style={styles.optionsContainer}>
        {Array.from({ length: Math.ceil(uniqueColors.length / 2) }).map(
          (_, rowIndex) => {
            const items = uniqueColors.slice(rowIndex * 2, rowIndex * 2 + 2);
            return (
              <View key={rowIndex} style={styles.row}>
                {items.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setSelectedColor(item)}
                    style={[
                      styles.option,
                      item === selectedColor && styles.selectedOption,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        item === selectedColor && styles.selectedText,
                      ]}
                    >
                      {item}
                    </Text>
                    {item === selectedColor && (
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

export default ColorOptions;

const styles = StyleSheet.create({
  version_color: {
    fontSize: 16,
    fontWeight: "bold",
  },

  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    fontWeight: "bold",
  },

  option: {
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    height: 50,
    width: 190,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },

  optionText: {
    fontSize: 16,
    color: "#333",
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
