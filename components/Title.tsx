// Core
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

// Constants
import { GLOBAL_STYLES } from "../constants/styles";

type TTitle = {
  label: string;
};

const Title: FC<TTitle> = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  label: {
    color: GLOBAL_STYLES.colors.white,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
