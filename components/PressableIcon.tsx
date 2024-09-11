import { Ionicons } from "@expo/vector-icons";
import { FC, memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { GLOBAL_STYLES } from "../constants/styles";
import { TIcons } from "../models/Icons";

type TIconPickerProps = {
  name: TIcons;
  onPress: Function;
  selected: boolean;
};

const IconPicker: FC<TIconPickerProps> = ({ name, onPress, selected }) => {
  const handleSelect = () => {
    onPress(name);
  };
  return (
    <Pressable onPress={handleSelect}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={name}
          size={30}
          color={
            selected
              ? GLOBAL_STYLES.colors.white
              : GLOBAL_STYLES.colors.accent500
          }
        />
        <Text style={styles.text}>{name}</Text>
      </View>
    </Pressable>
  );
};

export default memo(IconPicker);

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
