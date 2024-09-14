// Core
import { FC, PropsWithChildren, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

// Constants
import { GLOBAL_STYLES } from "../../constants/styles";

type TFieldsRowProps = {
  label?: string;
} & PropsWithChildren;

const FieldsRow: FC<TFieldsRowProps> = ({ children, label }) => {
  return (
    <View style={label ? styles.frame : {}}>
      {label && (
        <View style={styles.frameLabelWrapper}>
          <Text style={styles.frameLabel}>{label}</Text>
        </View>
      )}
      <View style={styles.rowGroup}>
        {((children && Array.isArray(children) && children) || []).map(
          (child: ReactNode, index) => (
            <View key={`child_${index}`} style={styles.rowGroupField}>
              {child}
            </View>
          )
        )}
      </View>
    </View>
  );
};

export default FieldsRow;

const styles = StyleSheet.create({
  rowGroup: {
    gap: 16,
    flexDirection: "row",
  },
  frame: {
    borderColor: GLOBAL_STYLES.colors.primary200,
    borderRadius: 6,
    borderStyle: "solid",
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  frameLabel: {
    color: GLOBAL_STYLES.colors.primary200,
  },
  frameLabelWrapper: {
    alignSelf: "flex-start",
    backgroundColor: GLOBAL_STYLES.colors.primary500,
    left: 10,
    paddingHorizontal: 8,
    position: "relative",
    top: -10,
  },
  rowGroupField: {
    flex: 1,
  },
});
