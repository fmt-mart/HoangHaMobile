import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ColorOptions from "../components/infor_product/ColorOptions";
import StorageOptions from "./infor_product/StorageOptions";

const VersionPhone = ({ itemVariants }) => {
  return (
    <View>
      {itemVariants?.variants?.length > 0 && (
        <>
          <StorageOptions variants={itemVariants.variants}/>
          <ColorOptions colorList={itemVariants.variants.map((v) => v.color)} />
        </>
      )}
    </View>
  );
};

export default VersionPhone;

const styles = StyleSheet.create({});
