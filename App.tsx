// Core
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { FC } from "react";

import { StatusBar } from "expo-status-bar";

// Context
import ExpendablesContextProvider from "./store/expendables-context";

// Screens
import ManageExpendable from "./screens/ManageExpendable";
import AllExpendables from "./screens/AllExpendables";
import ExpendableDetail from "./screens/ExpendableDetail";
import Config from "./screens/Config";

// Constants
import { GLOBAL_STYLES } from "./constants/styles";
import { ROUTES } from "./constants/constants";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpendablesOverview: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.expendables}
        component={AllExpendables}
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name={ROUTES.expendableDetail}
        component={ExpendableDetail}
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_right",
        }}
      />
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
            initialRouteName={ROUTES.expendablesOverview}
          >
            <BottomTabs.Screen
              name={ROUTES.config}
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
              name={ROUTES.expendablesOverview}
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
              name={ROUTES.manageExpendable}
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
