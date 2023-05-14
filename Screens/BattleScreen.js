import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Box from "../components/Box";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const winComb = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
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
export default function BattleScreen({ navigation, route }) {
  const isEnabled = route.params;

  const [state, setState] = useState({
    state1: false,
    state2: false,
    state3: false,
    state4: false,
    state5: false,
    state6: false,
    state7: false,
    state8: false,
    state9: false,
    turn: "X",
  });
  const [answerX, setAnswerX] = useState([]);
  const [answerO, setAnswerO] = useState([]);
  const [xWins, setXWins] = useState(false);
  const [oWins, setOWins] = useState(false);
  const [disabledProp, setDisableProp] = useState(false);
  const [lineOut, setLineOut] = useState();
  function handlePressMove(updateState, index) {
    setState(updateState);
    if (updateState["turn"] === "X") {
      setAnswerX((prev) => {
        return [...prev, index];
      });
    } else if (updateState["turn"] === "O") {
      setAnswerO((prev) => {
        return [...prev, index];
      });
    }
  }
  // useEffect(() => {
  //   for (let i = 0; i < winComb.length; i++) {
  //     if (answerO.sort().toString().includes(winComb[i])) {
  //       console.log("X win");

  //       setXWins(true);
  //       setDisableProp(true);
  //       setLineOut(winComb[i]);
  //     } else if (answerX.sort().toString().includes(winComb[i])) {
  //       console.log("O wins");
  //       setOWins(true);
  //       setDisableProp(true);
  //       setLineOut(winComb[i]);
  //     }
  //   }

  //   // if (answerO.some((combination) => isEqual(combination, winComb))) {
  //   //   console.log("X won");
  //   // }
  //   // console.log(answerO);
  // }, [answerO, answerX]);
  useEffect(() => {
    for (let i = 0; i < winComb.length; i++) {
      if (winComb[i].every((val) => answerX.includes(val))) {
        console.log("O wins");
        setOWins(true);
        setDisableProp(true);
        setLineOut(winComb[i]);
      } else if (winComb[i].every((val) => answerO.includes(val))) {
        console.log("X wins");
        setXWins(true);
        setDisableProp(true);
        setLineOut(winComb[i]);
      }
    }
  }, [answerO, answerX]);
  const clearAll = () => {
    setAnswerO([]);
    setAnswerX([]);
    setXWins(false);
    setOWins(false);
    setDisableProp(false);
    setLineOut([]);
    setState({
      state1: false,
      state2: false,
      state3: false,
      state4: false,
      state5: false,
      state6: false,
      state7: false,
      state8: false,
      state9: false,
      turn: "X",
    });
  };

  const progress = useSharedValue(0);
  const scale = useSharedValue(0);
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
  }, [xWins, oWins]);
  return (
    <View style={!isEnabled ? styles.container : styles.Darkcontainer}>
      <Animated.View style={[styles.textCont, animatedStyle]}>
        {xWins ? (
          <Text style={!isEnabled ? styles.textApp : styles.DarkTextApp}>
            X has won
          </Text>
        ) : null}
        {oWins ? (
          <Text style={!isEnabled ? styles.textApp : styles.DarkTextApp}>
            O has won
          </Text>
        ) : null}
      </Animated.View>
      <View style={styles.littleCont}>
        {num.map((index) => {
          return (
            <Box
              index={index}
              key={index}
              state={state}
              onPress={handlePressMove}
              disabledProp={disabledProp}
              enableColor={isEnabled}
              lineOut={lineOut}
            />
          );
        })}
        <TouchableOpacity onPress={clearAll} style={styles.clearButton}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("home");
          }}
          style={styles.closeButton}
        >
          <Text style={styles.closeText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Darkcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.backgroundColor,
  },
  littleCont: {
    width: 270,
    // height:190,
    flexDirection: "row",
    // backgroundColor:"blue",
    flexWrap: "wrap",
    padding: 0,
    margin: 0,
    justifyContent: "center",
  },
  textApp: {
    fontSize: 30,
    fontWeight: "500",
    // marginBottom: 50,
  },
  DarkTextApp: {
    fontSize: 30,
    fontWeight: "500",
    color: Colors.dark.text,
  },
  textCont: {
    height: 50,
    width: 150,

    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  clearButton: {
    width: 200,
    height: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 20,
  },
  clearText: {
    fontSize: 30,
    color: "white",
    fontWeight: "500",
  },
  closeButton: {
    width: 200,
    height: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 20,
  },
  closeText: {
    fontSize: 30,
    color: "white",
    fontWeight: "500",
  },
});
