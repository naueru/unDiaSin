// Core
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { FC, useContext } from "react";

// Context
import TranslationsContextProvider, {
  TranslationsContext,
} from "./store/language-context";
import ExpendablesContextProvider from "./store/expendables-context";

// Components
import DummyDataButton from "./components/DummyDataButton";

// Screens
import ManageExpendable from "./screens/ManageExpendable";
import AllExpendables from "./screens/AllExpendables";
import ExpendableDetail from "./screens/ExpendableDetail";
import Config from "./screens/Config";

// Hooks
import { useColorTheme } from "./hooks/styles";

// Constants
import { GLOBAL_STYLES } from "./constants/styles";
import { ROUTES } from "./constants/constants";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpendablesOverview: FC = () => {
  const scheme = useColorTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GLOBAL_STYLES.colors[scheme].primary500,
        },
        headerTintColor: GLOBAL_STYLES.colors[scheme].primaryText,
      }}
    >
      <Stack.Screen
        name={ROUTES.expendables}
        component={AllExpendables}
        options={() => {
          const { translation } = useContext(TranslationsContext);
          return {
            title: translation.ALL_EXPENDABLES_TITLE,
            presentation: "modal",
            animation: "slide_from_bottom",
            headerRight: () => <DummyDataButton />,
          };
        }}
      />
      <Stack.Screen
        name={ROUTES.expendableDetail}
        component={ExpendableDetail}
        options={{
          presentation: "modal",
          animation: "slide_from_right",
          title: "Detail",
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const scheme = useColorTheme();
  return (
    <>
      <StatusBar style={"light"} />
      <TranslationsContextProvider>
        <ExpendablesContextProvider>
          <NavigationContainer>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <BottomTabs.Navigator
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: GLOBAL_STYLES.colors[scheme].primary500,
                    },
                    headerTintColor: GLOBAL_STYLES.colors[scheme].primaryText,
                    tabBarStyle: {
                      backgroundColor: GLOBAL_STYLES.colors[scheme].primary500,
                    },
                    tabBarActiveTintColor:
                      GLOBAL_STYLES.colors[scheme].accent500,
                    tabBarShowLabel: false,
                  }}
                  initialRouteName={ROUTES.expendablesOverview}
                >
                  <BottomTabs.Screen
                    name={ROUTES.config}
                    component={Config}
                    options={() => {
                      const { translation } = useContext(TranslationsContext);
                      return {
                        title: translation.CONFIG_SCREEN_TITLE,
                        tabBarLabel: "",
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons
                            name={"settings"}
                            size={size}
                            color={color}
                          />
                        ),
                      };
                    }}
                  />
                  <BottomTabs.Screen
                    name={ROUTES.expendablesOverview}
                    component={ExpendablesOverview}
                    options={{
                      title: "Un día sin...",
                      tabBarLabel: "",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name={"skull"} size={size} color={color} />
                      ),
                      headerShown: false,
                    }}
                  />
                  <BottomTabs.Screen
                    name={ROUTES.manageExpendable}
                    component={ManageExpendable}
                    options={{
                      title: "Manejar venenos",
                      tabBarLabel: "",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons
                          size={size}
                          color={color}
                          name={"add-circle"}
                        />
                      ),
                    }}
                  />
                </BottomTabs.Navigator>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </NavigationContainer>
        </ExpendablesContextProvider>
      </TranslationsContextProvider>
    </>
  );
}
