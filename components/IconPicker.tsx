// Core
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { FC, useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";

//Components
import BSModal from "./BSModal";
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
  const sheetRef = useRef<BottomSheetModal>(null);

  const handleSelect = (value: string) => {
    onChange(name, value);
    sheetRef.current?.dismiss();
  };

  const handleOpenModal = () => {
    sheetRef.current?.present();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleOpenModal}>
        <View>
          <Ionicons
            name={value}
            size={60}
            color={GLOBAL_STYLES.colors.accent500}
          />
        </View>
      </Pressable>
      <BSModal ref={sheetRef}>
        <BottomSheetFlatList
          data={ICONS_SORTED.filter(
            (item: string) =>
              item.indexOf("sharp") === -1 && item.indexOf("outline") === -1
          )}
          renderItem={({ item }: { item: TIcons }) => {
            return (
              <PressableIcon
                name={item}
                onPress={() => handleSelect(item)}
                selected={item === value}
              />
            );
          }}
          keyExtractor={(item) => "icon_" + item}
          numColumns={7}
        />
      </BSModal>
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
