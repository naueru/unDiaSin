// Core
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { FC, useRef } from "react";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Components
import BSModal from "./BSModal";
import Title from "./Title";

// Constants
import { createThemedStyle } from "../utils/styles";
import { LANGUAGES } from "../constants/constants";
import { GLOBAL_STYLES } from "../constants/styles";

type TLanguageSelectProps = {
  onSelect: Function;
  defaultValue: string;
};

const LanguageSelect: FC<TLanguageSelectProps> = ({
  onSelect,
  defaultValue,
}) => {
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];
  const sheetRef = useRef<BottomSheetModal>(null);

  const handleSelect = (value: string) => {
    onSelect(value);
    sheetRef.current?.dismiss();
  };

  const handleOpenModal = () => {
    sheetRef.current?.present();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleOpenModal}>
        <View style={styles.innerContainer}>
          <View>
            <View
              style={[
                {
                  backgroundColor:
                    GLOBAL_STYLES.colors.common.languageSelect.water,
                },
                styles.water,
              ]}
            />
            <Ionicons
              name="earth"
              size={68}
              color={GLOBAL_STYLES.colors.common.languageSelect.earth}
            />
          </View>
          <Title
            label={
              LANGUAGES.find((lang) => lang.value === defaultValue)?.label || ""
            }
          />
        </View>
      </Pressable>
      <BSModal ref={sheetRef}>
        <BottomSheetFlatList
          data={LANGUAGES}
          renderItem={({ item }) => {
            return (
              <Pressable onPress={() => handleSelect(item.value)}>
                <View style={styles.options}>
                  <Title label={item.label} />
                </View>
              </Pressable>
            );
          }}
          keyExtractor={(item) => "lang_" + item.value}
        />
      </BSModal>
    </View>
  );
};

export default LanguageSelect;

const computedStyles = createThemedStyle({
  container: {
    ...GLOBAL_STYLES.shadow,
    backgroundColor: "primary500",
    borderColor: "accent500",
    borderStyle: "solid",
    borderRadius: 40,
    borderWidth: 2,
    flexDirection: "row",
    height: 81,
    justifyContent: "center",
    padding: 4,
  },
  water: {
    borderRadius: 30,
    height: 58,
    position: "absolute",
    transform: [{ translateX: 5 }, { translateY: 5 }],
    width: 58,
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  options: {
    alignItems: "center",
    borderBottomColor: "primary200",
    borderBottomWidth: 1,
    justifyContent: "center",
    minHeight: 60,
    width: "100%",
  },
});
