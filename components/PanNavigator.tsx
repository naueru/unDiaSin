// Core
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, PropsWithChildren } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

// Utils
import { throttle } from "../utils/utils";

// Constants
import { ROUTE_DESTINATIONS } from "../constants/constants";

type PanNavigatorProps = FC<PropsWithChildren>;

const PanNavigator: PanNavigatorProps = ({ children }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();

  const navigateTo = throttle((direction: "left" | "right") => {
    const name: string = route.name;
    const destinationByName = ROUTE_DESTINATIONS[name];
    const destination = destinationByName[direction];
    if (destination) {
      navigation.navigate(destination);
    }
  });

  const pan = Gesture.Pan()
    .runOnJS(true)
    .minDistance(200)
    .onEnd((e) => {
      if (e.translationX > 1) {
        navigateTo("left");
      } else {
        navigateTo("right");
      }
    });
  return <GestureDetector children={children} gesture={pan}></GestureDetector>;
};

export default PanNavigator;
