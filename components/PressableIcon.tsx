import { Ionicons } from "@expo/vector-icons";
import { FC, memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { GLOBAL_STYLES } from "../constants/styles";
import { TIcons } from "../models/Icons";

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
              ? GLOBAL_STYLES.colors.white
              : GLOBAL_STYLES.colors.accent500
          }
        />
        {label ? <Text style={styles.text}>{label}</Text> : null}
      </View>
    </Pressable>
  );
};

export default memo(PressableIcon);

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    height: 50,
    width: 50,
  },
  text: {
    color: GLOBAL_STYLES.colors.accent500,
    fontSize: 8,
    textAlign: "center",
  },
});
