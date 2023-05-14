import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import BattleScreen from "../Screens/BattleScreen";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="battle"
        component={BattleScreen}
        options={{ headerShown: false }}
      />
       
    </Stack.Navigator>
  );
};
export default AppNavigator;
