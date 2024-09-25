// Core
import { Ionicons } from "@expo/vector-icons";
import { FC, memo } from "react";
import { Pressable, Text, View } from "react-native";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Utils
import { createThemedStyle } from "../utils/styles";

// Types
import { TIcons } from "../models/Icons";

// Constants
import { GLOBAL_STYLES } from "../constants/styles";

type TIconPickerProps = {
  name: TIcons;
  onPress: Function;
  selected?: boolean;
  size?: number;
  label?: string;
};

const PressableIcon: FC<TIconPickerProps> = ({
  name,
  onPress,
  selected,
  label,
  size = 30,
}) => {
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];

  const handleSelect = () => {
    onPress(name);
  };
  return (
    <Pressable onPress={handleSelect}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={name}
          size={size}
          color={
            selected
              ? GLOBAL_STYLES.colors[scheme].secondary800
              : GLOBAL_STYLES.colors[scheme].accent500
          }
        />
        {label ? <Text style={styles.text}>{label}</Text> : null}
      </View>
    </Pressable>
  );
};

export default memo(PressableIcon);

const computedStyles = createThemedStyle({
  iconContainer: {
    alignItems: "center",
    gap: 8,
  },
  text: {
    color: "accent500",
    fontSize: 8,
    textAlign: "center",
  },
});
