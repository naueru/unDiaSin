// Core
import { PanGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture";
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";
import {
  ParamListBase,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";

// Utils
import { createThemedStyle } from "../utils/styles";
import { throttle } from "../utils/utils";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Constants
import { ROUTE_DESTINATIONS } from "../constants/constants";

const toRightConfig = {
  toValue: 2,
  duration: 400,
  useNativeDriver: true,
};

const toMidConfig = {
  toValue: 1,
  duration: 400,
  useNativeDriver: true,
};

const toLeftConfig = {
  toValue: 0,
  duration: 400,
  useNativeDriver: true,
};
const toRightConfigInstant = {
  toValue: 2,
  duration: 1,
  useNativeDriver: true,
};

const toMidConfigInstant = {
  toValue: 1,
  duration: 1,
  useNativeDriver: true,
};

const toLeftConfigInstant = {
  toValue: 0,
  duration: 1,
  useNativeDriver: true,
};

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

const PanNavigator: FC<
  { initialAnimationValue?: number } & PropsWithChildren
> = ({ children, initialAnimationValue = 1 }) => {
  const windowWidth = Dimensions.get("window").width;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute<NativeStackNavigatorProps>();
  const a: any = navigation.getParent()?.getState();
  const b = a?.routes[a?.index]?.params?.from;
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];

  const navigateTo = throttle((direction: "left" | "right") => {
    const name: string = route.name;
    const destinationByName = ROUTE_DESTINATIONS[name];
    const { route: destination, params } = destinationByName[direction];

    if (destination) {
      navigation.navigate(destination, {
        ...params,
        from:
          direction === DIRECTIONS.LEFT ? DIRECTIONS.RIGHT : DIRECTIONS.LEFT,
      });
    }
  });
  const isFocused = useIsFocused();

  const screenAnim = useRef(new Animated.Value(initialAnimationValue)).current;

  const screenToLeft = Animated.timing(screenAnim, toLeftConfig);
  const screenToMid = Animated.timing(screenAnim, toMidConfig);
  const screenToRight = Animated.timing(screenAnim, toRightConfig);
  const screenToLeftInstant = Animated.timing(screenAnim, toLeftConfigInstant);
  const screenToMidInstant = Animated.timing(screenAnim, toMidConfigInstant);
  const screenToRightInstant = Animated.timing(
    screenAnim,
    toRightConfigInstant
  );

  const screenXVal = screenAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [-windowWidth, 0, windowWidth],
  });

  useEffect(() => {
    const from = route?.params?.from || b;
    if (isFocused && from === DIRECTIONS.RIGHT) {
      screenToLeftInstant.start(() => screenToMid.start());
    } else if (isFocused && from === DIRECTIONS.LEFT) {
      screenToRightInstant.start(() => screenToMid.start());
    } else if (!isFocused && from === DIRECTIONS.RIGHT) {
      screenToRightInstant.start();
    } else if (!isFocused && from === DIRECTIONS.LEFT) {
      screenToLeftInstant.start();
    } else {
      screenToMidInstant.start();
    }
  }, [isFocused, route.params]);

  const pan = Gesture.Pan()
    .runOnJS(true)
    .minDistance(200)
    .onEnd((e) => {
      if (e.translationX > 1) {
        navigateTo(DIRECTIONS.LEFT);
      } else {
        navigateTo(DIRECTIONS.RIGHT);
      }
    });

  return (
    <PanNavigatorWrapper gesture={pan}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.container,
            { transform: [{ translateX: screenXVal }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
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
