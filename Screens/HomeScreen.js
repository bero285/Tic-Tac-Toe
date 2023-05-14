import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
const Colors = {
  dark: {
    backgroundColor: "#1E1E1E",

    text: "#F8F8F8",
  },
  light: {
    backgroundColor: "#F8F8F8",

    text: "#1E1E1E",
  },
};
export default function HomeScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const translateY = useSharedValue(-100);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  useEffect(() => {
    translateY.value = withSpring(0, { duration: 5000 });
  }, []);

  return (
    <View style={!isEnabled ? styles.container : styles.darkContainer}>
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "white" }}
          thumbColor={isEnabled ? "#f5dd4b" : "black"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsEnabled(!isEnabled)}
          value={isEnabled}
        />
      </View>
      <Animated.Text
        style={
          !isEnabled
            ? [styles.mainText, animatedStyle]
            : [styles.DarkmainText, animatedStyle]
        }
      >
        Tic Tac Toe
      </Animated.Text>
      <View style={styles.botomContainer}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate("battle", isEnabled)}
        >
          <Text style={styles.text1}>PvP</Text>
        </TouchableOpacity>
        {/*  */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.light.backgroundColor,
  },
  botomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 80,
  },
  switchContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 20,
    width: "90%",
  },
  darkContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.dark.backgroundColor,
  },
  mainText: {
    fontSize: 60,
    fontWeight: 700,
    marginTop: 30,
  },
  DarkmainText: {
    fontSize: 60,
    fontWeight: 700,
    marginTop: 30,
    color: Colors.dark.text,
  },
  button1: {
    width: 230,
    height: 55,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  button2: {
    width: 230,
    height: 55,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 10,
  },
  text1: {
    fontSize: 23,
    fontWeight: "500",
    color: "white",
  },
  text2: {
    fontSize: 23,
    fontWeight: "500",
    color: "white",
  },
});
