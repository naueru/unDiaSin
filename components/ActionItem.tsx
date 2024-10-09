// Core
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { FC } from "react";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Components
import DevOnly from "./DevOnly";

// Utils
import { createThemedStyle } from "../utils/styles";

// Types
import { TIcons } from "../models/Icons";

// Constants
import { GLOBAL_STYLES } from "../constants/styles";

export type TActionItemProps = {
  label: string;
  onPress: Function;
  icon?: TIcons;
  isDev?: boolean;
  style?: object;
};

const ActionItem: FC<TActionItemProps> = ({
  label,
  onPress,
  icon,
  isDev = false,
  style,
}) => {
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];
  const content = (
    <Pressable style={[styles.container, style]} onPress={() => onPress()}>
      <Text style={styles.label}>{label}</Text>
      {icon ? (
        <Ionicons
          name={icon}
          size={30}
          color={GLOBAL_STYLES.colors[scheme].primaryText}
        />
      ) : null}
    </Pressable>
  );
  return isDev ? <DevOnly>{content}</DevOnly> : content;
};

export default ActionItem;

const computedStyles = createThemedStyle({
  container: {
    alignItems: "center",
    backgroundColor: "primary500",
    borderBottomColor: "primary200",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 60,
  },
  label: {
    color: "primaryText",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
