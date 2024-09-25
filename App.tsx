// Core
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { FC, useContext, useEffect } from "react";
import { Appearance, ColorSchemeName } from "react-native";

// Context
import TranslationsContextProvider, {
  TranslationsContext,
} from "./store/language-context";
import ExpendablesContextProvider, {
  ExpendablesContext,
  IExpendablesContext,
} from "./store/expendables-context";

// Components
import DummyDataButton from "./components/DummyDataButton";

// Screens
import ManageExpendable from "./screens/ManageExpendable";
import AllExpendables from "./screens/AllExpendables";
import ExpendableDetail from "./screens/ExpendableDetail";
import Config from "./screens/Config";

// Hooks
import { useColorTheme } from "./hooks/styles";

// Types
import { TTranslationsKeys } from "./models/translations";

// Constants
import { GLOBAL_STYLES } from "./constants/styles";
import {
  ROUTES,
  STORAGE_KEY_EXPENDABLES,
  STORAGE_KEY_LANGUAGE,
  STORAGE_KEY_THEME,
} from "./constants/constants";

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

const Root = () => {
  const getTheme = useAsyncStorage(STORAGE_KEY_THEME);
  const languageAsyncStorage = useAsyncStorage(STORAGE_KEY_LANGUAGE);
  const scheme = useColorTheme();
  const { chooseLanguage } = useContext(TranslationsContext);
  const expendablesCtx = useContext<IExpendablesContext>(ExpendablesContext);

  useEffect(() => {
    async function fetchLanguage() {
      const storedLanguage =
        (await languageAsyncStorage.getItem()) as TTranslationsKeys;
      if (storedLanguage) {
        chooseLanguage(storedLanguage);
      }
    }

    async function fetchTheme() {
      const storedTheme: ColorSchemeName =
        (await getTheme.getItem()) as ColorSchemeName;
      if (storedTheme) {
        Appearance.setColorScheme(storedTheme);
      }
    }

    async function fetchExpendables() {
      const storedItemsKeys = await AsyncStorage.getAllKeys();
      const storedExpendablesKeys = storedItemsKeys.filter(
        (item) => item.indexOf(STORAGE_KEY_EXPENDABLES) === 0
      );
      const storedExpendables = await AsyncStorage.multiGet(
        storedExpendablesKeys
      );
      const parsedExpendables = storedExpendables.map((expendable) =>
        JSON.parse(expendable[1] || "")
      );
      expendablesCtx.setExpendables(parsedExpendables);
    }

    fetchLanguage();
    fetchTheme();
    fetchExpendables();
  }, []);

  return (
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
              tabBarActiveTintColor: GLOBAL_STYLES.colors[scheme].accent500,
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
                    <Ionicons name={"settings"} size={size} color={color} />
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
                  <Ionicons size={size} color={color} name={"add-circle"} />
                ),
              }}
            />
          </BottomTabs.Navigator>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style={"light"} />
      <TranslationsContextProvider>
        <ExpendablesContextProvider>
          <Root />
        </ExpendablesContextProvider>
      </TranslationsContextProvider>
    </>
  );
}
