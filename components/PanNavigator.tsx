// Core
import { PanGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture";
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { FC, PropsWithChildren } from "react";
import { View } from "react-native";

// Utils
import { createThemedStyle } from "../utils/styles";
import { throttle } from "../utils/utils";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Types
import { TROUTE } from "../models/routes";

// Constants
import { MIN_FINGER_TRAVEL, ROUTE_DESTINATIONS } from "../constants/constants";

const DIRECTIONS = {
  LEFT: "left",
  RIGHT: "right",
};

type PanNavigatorProps = FC<PropsWithChildren & { gesture: PanGesture }>;

const PanNavigatorWrapper: PanNavigatorProps = ({ children, gesture }) => {
  return (
    <GestureDetector children={children} gesture={gesture}></GestureDetector>
  );
};

const PanNavigator: FC<PropsWithChildren> = ({ children }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const route = useRoute<NativeStackNavigatorProps>();
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];

  const navigateTo = throttle((direction: "left" | "right") => {
    const name: TROUTE = route.name;
    const destinationByName = ROUTE_DESTINATIONS[name];
    const { route: destination, params } = destinationByName[direction];

    if (destination) {
      navigation.navigate(destination, {
        ...params,
      });
    }
  });

  const pan = Gesture.Pan()
    .runOnJS(true)
    .minDistance(MIN_FINGER_TRAVEL)
    .onEnd((e) => {
      if (e.translationX > MIN_FINGER_TRAVEL) {
        navigateTo(DIRECTIONS.LEFT);
      } else if (e.translationX < -MIN_FINGER_TRAVEL) {
        navigateTo(DIRECTIONS.RIGHT);
      }
    });

  return (
    <PanNavigatorWrapper gesture={pan}>
      <View style={styles.container}>{children}</View>
    </PanNavigatorWrapper>
  );
};

export default PanNavigator;

const computedStyles = createThemedStyle({
  container: {
    backgroundColor: "primary500",
    flex: 1,
    justifyContent: "center",
  },
});
