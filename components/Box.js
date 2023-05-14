import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
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
export default function Box({
  onPress,
  index,
  cond,
  state,
  disabledProp,
  enableColor,
  lineOut,
}) {
  const [line, setLine] = useState(false);
  const [rotate1, setRotate1] = useState("line");

  const [value, setValue] = useState();

  const horizontal = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const handlePress = () => {
    if (state[`state${index}`]) {
      return;
    }
    setValue(state.turn);
    const updateState = {
      ...state,
      [`state${index}`]: true,
      turn: state.turn === "X" ? "O" : "X",
    };
    onPress(updateState, index);
  };

  const progress = useSharedValue(0);
  const scale = useSharedValue(0);

  const progress2 = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ scale: scale.value }],
    };
  });
  useEffect(() => {
    progress.value = withSpring(1, { duration: 4000 });
    scale.value = withSpring(1, { duration: 4000 });

    return () => {
      progress.value = 0;
      scale.value = 0;
    };
  }, [value]);
  useEffect(() => {
    setRotate1("line");
    if (lineOut) {
      if (lineOut.toString().includes(index) && disabledProp) {
        setLine(true);
        // console.log(lineOut);
        if (lineOut.includes(1) && lineOut.includes(5) && lineOut.includes(9)) {
          setRotate1("lineRotate1");
        } else if (
          lineOut.includes(3) &&
          lineOut.includes(5) &&
          lineOut.includes(7)
        ) {
          setRotate1("lineRotate2");
        }
        for (i = 0; i < horizontal.length; i++) {
          if (
            lineOut.includes(horizontal[i][0]) &&
            lineOut.includes(horizontal[i][1]) &&
            lineOut.includes(horizontal[i][2])
          ) {
            setRotate1("lineHorizontal");
          }
        }
      }
    }
    if (disabledProp === false) {
      setLine(false);
    }
  }, [disabledProp, lineOut]);

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      opacity: progress2.value,
    };
  });
  useEffect(() => {
    progress2.value = withSpring(1, { duration: 4000 });

    return () => {
      progress2.value = 0;
    };
  }, [disabledProp]);

  return (
    <>
      <TouchableWithoutFeedback disabled={disabledProp} onPress={handlePress}>
        <View style={!enableColor ? styles.buttonCont : styles.DarkbuttonCont}>
          {state["state" + index + ""] ? (
            <View style={styles.showContainer}>
              <Animated.Text
                style={
                  !enableColor
                    ? [styles.appearText, animatedStyle]
                    : [styles.DarkappearText, animatedStyle]
                }
              >
                {value}
              </Animated.Text>
              {line ? (
                <Animated.View
                  style={[
                    styles[rotate1],
                    animatedStyle2,
                    { backgroundColor: !enableColor ? "black" : "white" },
                  ]}
                ></Animated.View>
              ) : null}
              {/* {line ? (
                <View
                  style={
                    rotate1
                      ? styles.lineRotate1
                      : rotate2
                      ? styles.lineRotate2
                      : styles.line
                  }
                ></View>
              ) : null} */}
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  buttonCont: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderColor: "black",
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  DarkbuttonCont: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderColor: Colors.dark.text,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  appearText: {
    fontSize: 30,
    fontWeight: "500",
    position: "relative",
  },
  DarkappearText: {
    fontSize: 30,
    fontWeight: "500",
    color: Colors.dark.text,
  },
  line: {
    position: "absolute",
    width: 4,
    height: 85,
    // backgroundColor: "black",
  },
  lineHorizontal: {
    position: "absolute",
    width: 85,
    height: 4,
    // backgroundColor: "black",
  },
  lineRotate1: {
    position: "absolute",
    transform: [{ rotate: "-45deg" }],
    width: 4,
    height: 85 * Math.sqrt(2),
    // backgroundColor: "black",
  },
  lineRotate2: {
    position: "absolute",
    transform: [{ rotate: "45deg" }],
    width: 4,
    height: 85 * Math.sqrt(2),
    // backgroundColor: "black",
  },
  showContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
