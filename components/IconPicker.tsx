// Core
import { Ionicons } from "@expo/vector-icons";
import { FC, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

//Components
import PressableIcon from "./PressableIcon";

// Types
import { TIcons } from "../models/Icons";

//Constants
import { ICONS_SORTED } from "../constants/IconsSorted";
import { GLOBAL_STYLES } from "../constants/styles";
import { DEFAULT_ICON } from "../constants/defaults";

type TIconPickerProps = {
  value: TIcons;
  onChange: Function;
  name: string;
};

const IconPicker: FC<TIconPickerProps> = ({
  value = DEFAULT_ICON,
  onChange,
  name,
}) => {
  const [showList, setShowList] = useState(false);

  const handleSelect = (value: string) => {
    onChange(name, value);
    setShowList(false);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setShowList((current) => !current)}>
        <View>
          <Ionicons
            name={value}
            size={60}
            color={GLOBAL_STYLES.colors.accent500}
          />
        </View>
      </Pressable>
      {showList && (
        <FlatList
          data={ICONS_SORTED.filter(
            (item: string) =>
              item.indexOf("sharp") === -1 && item.indexOf("outline") === -1
          )}
          renderItem={({ item }) => (
            <PressableIcon
              name={item}
              onPress={() => handleSelect(item)}
              selected={item === value}
              label={name}
            />
          )}
          keyExtractor={(item) => "icon_" + item}
          horizontal
        />
      )}
    </View>
  );
};

export default IconPicker;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: GLOBAL_STYLES.colors.primary500,
    gap: 16,
    justifyContent: "center",
    maxHeight: 300,
    padding: 16,
  },
  iconContainer: {
    alignItems: "center",
    height: 50,
    width: 50,
  },
});
