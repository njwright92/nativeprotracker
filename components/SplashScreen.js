import React from "react";
import { View, StyleSheet, Image } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/Branding.jpg")}
        style={styles.image}
        load="lazy"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5BA95",
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    width: 400,
    height: 200,
    borderRadius: 10,
  },
});

export default SplashScreen;
