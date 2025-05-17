import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Platform,
  StatusBar,
} from "react-native";

export default function SplashScreen() {
  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("white");
    }
    StatusBar.setBarStyle("light-content", true);
  }, []);

  const styles = StyleSheet.create({
    container: {  
      backgroundColor: "white",
      width: "100%",
      height: "100%",
    },
  });

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "contain",
          alignSelf: "center",
        }}
        source={require("../assets/images/th.jpg")}
      />
    </View>
  );
}

