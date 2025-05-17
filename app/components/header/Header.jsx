import { StyleSheet } from "react-native";
import React from "react";
import Search from "./Search";
import Logo_Cart from "./Logo_Cart";

const Header = () => {
  return (
    <>
      <Logo_Cart />
      <Search />
    </>
  );
};

export default Header;

const styles = StyleSheet.create({});
