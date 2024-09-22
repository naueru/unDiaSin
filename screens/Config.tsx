// Core
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { Appearance, Button, FlatList, Text, View } from "react-native";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Utils
import { createThemedStyle } from "../utils/styles";

// Constants
import { ICONS_SORTED } from "../constants/IconsSorted";
import { GLOBAL_STYLES } from "../constants/styles";
import ThemeToggle from "../components/ThemeToggle";
import Title from "../components/Title";

const Config: FC = () => {
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];
  const isDark = scheme === "dark";
  return (
    <View style={styles.container}>
      <Title label="Tema" />
      <View style={styles.theme}>
        <View style={styles.themeButtons}>
          <ThemeToggle
            onChange={(value: boolean) =>
              Appearance.setColorScheme(value ? "dark" : "light")
            }
            value={isDark}
          />
        </View>
      </View>
      <Title label="Idioma" />
      <FlatList
        data={ICONS_SORTED.filter(
          (item: string) =>
            item.indexOf("sharp") === -1 && item.indexOf("outline") === -1
        )}
        renderItem={({ item }) => (
          <View style={styles.iconContainer}>
            <Ionicons
              name={item}
              size={30}
              color={GLOBAL_STYLES.colors[scheme].accent500}
            />
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
        keyExtractor={(item) => "icon_" + item}
        numColumns={8}
      />
    </View>
  );
};

export default Config;

const computedStyles = createThemedStyle({
  container: {
    alignItems: "center",
    backgroundColor: "primary500",
    flex: 1,
    justifyContent: "center",
    padding: 32,
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
  title: {
    fontSize: 16,
    textAlign: "center",
    color: "accent500",
  },
  theme: {
    gap: 16,
    padding: 32,
  },
  themeButtons: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
  },
});
