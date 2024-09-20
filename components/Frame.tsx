// Core
import { FC, PropsWithChildren } from "react";
import { Text, View } from "react-native";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Utils
import { createThemedStyle } from "../utils/styles";

type TFieldsRowProps = {
  label?: string;
  style?: object;
} & PropsWithChildren;

const Frame: FC<TFieldsRowProps> = ({ children, label, style }) => {
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];

  return (
    <View style={[styles.frame, style]}>
      {label && (
        <View style={styles.frameLabelWrapper}>
          <Text style={styles.frameLabel}>{label}</Text>
        </View>
      )}
      {children}
    </View>
  );
};

export default Frame;

const computedStyles = createThemedStyle({
  frame: {
    borderColor: "primary200",
    borderRadius: 6,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 8,
    width: "100%",
  },
  frameLabel: {
    color: "primary200",
  },
  frameLabelWrapper: {
    alignSelf: "flex-start",
    backgroundColor: "primary500",
    left: 10,
    paddingHorizontal: 8,
    position: "absolute",
    top: -10,
  },
});
