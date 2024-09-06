import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { FC } from "react";

import { StatusBar } from "expo-status-bar";
import ManageExpendable from "./screens/ManageExpendable";
import AllExpendables from "./screens/AllExpendables";
import ExpendableDetail from "./screens/ExpendableDetail";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpendableOverview: FC = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="AllExpendables" component={AllExpendables} />
      <BottomTabs.Screen name="ExpendableDetail" component={ExpendableDetail} />
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpendablesOverview"
            component={ExpendableOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ManageExpendable" component={ManageExpendable} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
