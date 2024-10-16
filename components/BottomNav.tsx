// Core
import { Ionicons } from "@expo/vector-icons";
import {
  NavigationContainerRefWithCurrent,
  NavigationState,
} from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import { Pressable, View } from "react-native";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Utils
import { createThemedStyle } from "../utils/styles";

// Constants
import { DEFAULT_ROUTE } from "../constants/defaults";
import { ROUTE_DESTINATIONS, ROUTES_ICONS } from "../constants/constants";
import { GLOBAL_STYLES } from "../constants/styles";
import { TROUTE } from "../models/routes";

type NavigationProps = {
  navRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
};

const BottomNav: FC<NavigationProps> = ({ navRef }) => {
  const [routes, setRoutes] = useState<TROUTE[]>([]);
  const [currentRoute, setCurrentRoute] = useState<{ name: string }>();

  const navigation = navRef;

  const scheme = useColorTheme();
  const styles = computedStyles[scheme];

  let unsubscribe: Function;

  let rootState: Partial<NavigationState & { state: NavigationState }>;
  let index: number | undefined;
  let routeNames: TROUTE[] = [];
  let state;

  const isReady = navigation?.isReady();
  if (isReady) {
    rootState = navigation.getRootState();
    index = rootState.index;
    routeNames = (rootState.routeNames as TROUTE[]) || [];
    state = rootState.state;
  }

  useEffect(() => {
    if (!unsubscribe) {
      unsubscribe = navigation.addListener("state", (e) => {
        const state: NavigationState = e.data.state as NavigationState;
        const routes = state?.routes || [];
        const length = routes?.length;
        if (length) {
          setCurrentRoute(routes[length - 1]);
        }
      });
    }

    if (navRef.current) {
      setRoutes(routeNames);
    }
    return () => {
      navigation.removeListener("state", () => {});
    };
  }, [navRef.current]);

  return (
    <View style={styles.nav}>
      <View style={styles.shadow} />
      {routes.map((current, currentIndex: number) => (
        <Pressable
          key={`bottom_nav_${current}_${currentIndex}`}
          onPress={() =>
            navigation.navigate({
              name: ROUTE_DESTINATIONS[current].self.route,
              params: ROUTE_DESTINATIONS[current].self.params,
            } as never)
          }
          style={styles.link}
        >
          <Ionicons
            name={ROUTES_ICONS[current]}
            size={30}
            color={
              current === (currentRoute?.name || DEFAULT_ROUTE)
                ? GLOBAL_STYLES.colors[scheme].accent500
                : GLOBAL_STYLES.colors[scheme].primary200
            }
          />
        </Pressable>
      ))}
    </View>
  );
};

export default BottomNav;

const computedStyles = createThemedStyle({
  nav: {
    backgroundColor: "primary500",
    flexDirection: "row",
    justifyContent: "space-around",
    minHeight: 30,
  },
  shadow: {
    backgroundColor: "primary500",
    elevation: 2,
    height: 0.2,
    position: "absolute",
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    width: "100%",
  },
  link: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 16,
  },
});
