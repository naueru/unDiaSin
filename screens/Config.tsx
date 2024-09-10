import { FC } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { ICONS_SORTED } from "../constants/IconsSorted";
import { GLOBAL_STYLES } from "../constants/styles";

const Config: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Config</Text>
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
              color={GLOBAL_STYLES.colors.accent500}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: GLOBAL_STYLES.colors.primary500,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
  },
  text: {
    fontSize: 8,
    textAlign: "center",
    color: GLOBAL_STYLES.colors.accent500,
  },
});
