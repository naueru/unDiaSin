// Core
import { FC } from "react";
import { Text, View } from "react-native";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Utils
import { createThemedStyle } from "../utils/styles";

type TTitle = {
  label: string;
};

const Title: FC<TTitle> = ({ label }) => {
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default Title;

const computedStyles = createThemedStyle({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  label: {
    color: "secondary800",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
