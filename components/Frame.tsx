// Core
import { FC, PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

// Constants
import { GLOBAL_STYLES } from "../constants/styles";

type TFieldsRowProps = {
  label?: string;
  style?: object;
} & PropsWithChildren;

const Frame: FC<TFieldsRowProps> = ({ children, label, style }) => {
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

const styles = StyleSheet.create({
  frame: {
    borderColor: GLOBAL_STYLES.colors.primary200,
    borderRadius: 6,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 8,
    width: "100%",
  },
  frameLabel: {
    color: GLOBAL_STYLES.colors.primary200,
  },
  frameLabelWrapper: {
    alignSelf: "flex-start",
    backgroundColor: GLOBAL_STYLES.colors.primary500,
    left: 10,
    paddingHorizontal: 8,
    position: "absolute",
    top: -10,
  },
});
