import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { FC } from "react";

import { StatusBar } from "expo-status-bar";
import ManageExpendable from "./screens/ManageExpendable";
import AllExpendables from "./screens/AllExpendables";
import ExpendableDetail from "./screens/ExpendableDetail";

import { Ionicons } from "@expo/vector-icons";

import { GLOBAL_STYLES } from "./constants/styles";
import Config from "./screens/Config";
import ExpendablesContextProvider from "./store/expendables-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpendablesOverview: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Expendables"
        component={AllExpendables}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ManageExpendable" component={ExpendableDetail} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpendablesContextProvider>
        <NavigationContainer>
          <BottomTabs.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GLOBAL_STYLES.colors.primary500 },
              headerTintColor: GLOBAL_STYLES.colors.white,
              tabBarStyle: { backgroundColor: GLOBAL_STYLES.colors.primary500 },
              tabBarActiveTintColor: GLOBAL_STYLES.colors.accent500,
            }}
            initialRouteName="ExpendablesOverview"
          >
            <BottomTabs.Screen
              name="Config"
              component={Config}
              options={{
                title: "Configuración",
                tabBarLabel: "",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name={"settings"} size={size} color={color} />
                ),
              }}
            />
            <BottomTabs.Screen
              name="ExpendablesOverview"
              component={ExpendablesOverview}
              options={{
                title: "Un día sin",
                tabBarLabel: "",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name={"skull"} size={size} color={color} />
                ),
              }}
            />
            <BottomTabs.Screen
              name="ManageExpendable"
              component={ManageExpendable}
              options={{
                title: "Manejar venenos",
                tabBarLabel: "",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons size={size} color={color} name={"add-circle"} />
                ),
              }}
            />
          </BottomTabs.Navigator>
        </NavigationContainer>
      </ExpendablesContextProvider>
    </>
  );
}
