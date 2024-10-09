// Core
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Appearance, ScrollView, Text, View } from "react-native";
import { FC, useContext, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Components
import LanguageSelect from "../components/LanguageSelect";
import PressableIcon from "../components/PressableIcon";
import PanNavigator from "../components/PanNavigator";
import ThemeToggle from "../components/ThemeToggle";
import TimePicker from "../components/TimePicker";
import BSModal from "../components/BSModal";
import DevOnly from "../components/DevOnly";
import Toggle from "../components/Toggle";
import Title from "../components/Title";
import Frame from "../components/Frame";

// Context
import { ConfigurationContext, TTimeObject } from "../store/config-context";
import { TranslationsContext } from "../store/language-context";

// Utils
import { createThemedStyle } from "../utils/styles";

// Types
import { TIcons } from "../models/Icons";

// Constants
import { STORAGE_KEY_THEME } from "../constants/constants";
import { ICONS_SORTED } from "../constants/IconsSorted";
import { GLOBAL_STYLES } from "../constants/styles";

const Config: FC = () => {
  const { translation, chooseLanguage, language } =
    useContext(TranslationsContext);
  const configCtx = useContext(ConfigurationContext);

  const themeStorage = useAsyncStorage(STORAGE_KEY_THEME);
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];
  const isDark = scheme === "dark";
  const sheetRef = useRef<BottomSheetModal>(null);
  const containerRef = useRef<ScrollView>(null);

  const pauseScroll = () => {
    containerRef.current?.setNativeProps({ scrollEnabled: false });
  };
  const resumeScroll = () => {
    containerRef.current?.setNativeProps({ scrollEnabled: true });
  };

  return (
    <PanNavigator initialAnimationValue={0}>
      <View style={styles.container}>
        <ScrollView
          ref={containerRef}
          contentContainerStyle={styles.contentContainer}
          scrollEnabled={true}
        >
          <Title label={translation.CONFIG_THEME_TITLE} />
          <ThemeToggle
            onChange={(value: boolean) => {
              Appearance.setColorScheme(value ? "dark" : "light");
              themeStorage.setItem(value ? "dark" : "light");
            }}
            value={isDark}
          />

          <Title label={translation.CONFIG_LANG_TITLE} />
          <LanguageSelect
            defaultValue={language}
            onSelect={(value: string) => chooseLanguage(value)}
          />
          <Frame style={styles.notificationsFrame}>
            <Toggle
              label={translation.CONFIG_NOTIFICATIONS_TITLE}
              onChange={(value: boolean) => {
                configCtx.setNotifications(value);
              }}
              defaultValue={configCtx.notifications}
            />
            {configCtx.notifications ? (
              <TimePicker
                onScroll={pauseScroll}
                onStop={resumeScroll}
                defaultValues={configCtx.notificationsTime}
                onChange={(_: string, values: TTimeObject) =>
                  configCtx.setNotificationsTime(values)
                }
                name="notificationsTime"
              />
            ) : null}
          </Frame>

          <DevOnly>
            <Title label={translation.CONFIG_ICONS_TITLE} />
            <PressableIcon
              name="images"
              onPress={() => sheetRef.current?.present()}
              size={60}
            />

            <BSModal ref={sheetRef}>
              <BottomSheetFlatList
                contentContainerStyle={styles.iconsContentContainer}
                data={ICONS_SORTED.filter(
                  (item: TIcons) =>
                    item.indexOf("sharp") === -1 &&
                    item.indexOf("outline") === -1
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
          </DevOnly>
        </ScrollView>
      </View>
    </PanNavigator>
  );
};

export default Config;

const computedStyles = createThemedStyle({
  container: {
    backgroundColor: "primary500",
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
    gap: 32,
    padding: 32,
  },
  iconsContentContainer: {
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    height: 50,
    width: 50,
  },
  text: {
    color: "accent500",
    fontSize: 8,
    textAlign: "center",
  },
  notificationsFrame: {
    gap: 16,
  },
});
