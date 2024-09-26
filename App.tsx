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
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";

// Context
import TranslationsContextProvider, {
  TranslationsContext,
} from "./store/language-context";
import ExpendablesContextProvider, {
  ExpendablesContext,
  IExpendablesContext,
} from "./store/expendables-context";
import ConfigurationContextProvider, {
  ConfigurationContext,
} from "./store/config-context";

// Screens
import ManageExpendable from "./screens/ManageExpendable";
import AllExpendables from "./screens/AllExpendables";
import ExpendableDetail from "./screens/ExpendableDetail";
import Config from "./screens/Config";

// Components
import NotificationsHaddler from "./components/NotificationsHandler";
import DummyDataButton from "./components/DummyDataButton";

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
  STORAGE_KEY_NOTIFICATIONS,
  STORAGE_KEY_THEME,
} from "./constants/constants";
import { DEFAULT_LANGUAGE } from "./constants/defaults";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

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
  const [loading, setLoading] = useState(true);
  const getTheme = useAsyncStorage(STORAGE_KEY_THEME);
  const languageAsyncStorage = useAsyncStorage(STORAGE_KEY_LANGUAGE);
  const configAsyncStorage = useAsyncStorage(STORAGE_KEY_NOTIFICATIONS);
  const scheme = useColorTheme();
  const { chooseLanguage } = useContext(TranslationsContext);
  const { setNotifications } = useContext(ConfigurationContext);
  const expendablesCtx = useContext<IExpendablesContext>(ExpendablesContext);

  useEffect(() => {
    async function fetchLanguage() {
      const storedLanguage = ((await languageAsyncStorage.getItem()) ||
        DEFAULT_LANGUAGE) as TTranslationsKeys;
      if (storedLanguage) {
        chooseLanguage(storedLanguage);
      }
    }

    async function fetchConfig() {
      let storedConfig;
      let parsedConfig;
      try {
        storedConfig = (await configAsyncStorage.getItem()) || "";
        parsedConfig = JSON.parse(storedConfig);
        setNotifications(parsedConfig);
      } catch (err) {
        console.error(err);
      }
    }

    async function fetchTheme() {
      let storedTheme: ColorSchemeName;
      try {
        storedTheme = (await getTheme.getItem()) as ColorSchemeName;
        if (storedTheme) {
          Appearance.setColorScheme(storedTheme);
        }
      } catch (err) {
        console.error(err);
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

    Promise.all([
      fetchConfig(),
      fetchLanguage(),
      fetchTheme(),
      fetchExpendables(),
    ]).finally(() => {
      setLoading(false);
    });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (!loading) {
      await SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
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
                title: "",
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
                title: "",
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
        <ConfigurationContextProvider>
          <ExpendablesContextProvider>
            <NotificationsHaddler />
            <Root />
          </ExpendablesContextProvider>
        </ConfigurationContextProvider>
      </TranslationsContextProvider>
    </>
  );
}
