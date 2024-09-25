// Core
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { Appearance, Text, View } from "react-native";
import { FC, useContext, useRef } from "react";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Components
import PressableIcon from "../components/PressableIcon";
import ThemeToggle from "../components/ThemeToggle";
import LanguageSelect from "../components/LanguageSelect";
import BSModal from "../components/BSModal";
import Title from "../components/Title";

// Context
import { TranslationsContext } from "../store/language-context";

// Utils
import { createThemedStyle } from "../utils/styles";

// Types
import { TIcons } from "../models/Icons";

// Constants
import { ICONS_SORTED } from "../constants/IconsSorted";
import { GLOBAL_STYLES } from "../constants/styles";

const Config: FC = () => {
  const { translation, chooseLanguage, language } =
    useContext(TranslationsContext);
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];
  const isDark = scheme === "dark";
  const sheetRef = useRef<BottomSheetModal>(null);
  return (
    <View style={styles.container}>
      <Title label={translation.CONFIG_THEME_TITLE} />

      <ThemeToggle
        onChange={(value: boolean) =>
          Appearance.setColorScheme(value ? "dark" : "light")
        }
        value={isDark}
      />

      <Title label={translation.CONFIG_LANG_TITLE} />
      <LanguageSelect
        defaultValue={language}
        onSelect={(value: string) => chooseLanguage(value)}
      />
      <Title label={translation.CONFIG_ICONS_TITLE} />
      <PressableIcon
        name="images"
        onPress={() => sheetRef.current?.present()}
        size={60}
      />
      <BSModal ref={sheetRef}>
        <BottomSheetFlatList
          contentContainerStyle={styles.contentContainer}
          data={ICONS_SORTED.filter(
            (item: TIcons) =>
              item.indexOf("sharp") === -1 && item.indexOf("outline") === -1
          )}
          renderItem={({ item }: { item: TIcons }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name={item}
                size={30}
                color={GLOBAL_STYLES.colors[scheme].accent500}
              />
              <Text style={styles.text}>{item}</Text>
            </View>
          )}
          keyExtractor={(item) => "icon_conf_" + item}
          numColumns={8}
        />
      </BSModal>
    </View>
  );
};

export default Config;

const computedStyles = createThemedStyle({
  container: {
    alignItems: "center",
    backgroundColor: "primary500",
    flex: 1,
    gap: 32,
    justifyContent: "center",
    padding: 32,
  },
  contentContainer: {
    alignItems: "center",
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
  },
  text: {
    fontSize: 8,
    textAlign: "center",
    color: "accent500",
  },
});
