import { FC, PropsWithChildren, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

const FieldsRow: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View style={styles.rowGroup}>
      {((children && Array.isArray(children) && children) || []).map(
        (child: ReactNode, index) => (
          <View key={`child_${index}`} style={styles.rowGroupField}>
            {child}
          </View>
        )
      )}
    </View>
  );
};

export default FieldsRow;

const styles = StyleSheet.create({
  rowGroup: {
    gap: 16,
    flexDirection: "row",
  },
  rowGroupField: {
    flex: 1,
  },
});
