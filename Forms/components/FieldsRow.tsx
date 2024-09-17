// Core
import { FC, PropsWithChildren, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

// Constants
import Frame from "../../components/Frame";

type TFieldsRowProps = {
  label?: string;
} & PropsWithChildren;

const Wrapper: FC<TFieldsRowProps> = ({ children, label }) =>
  label ? <Frame label={label}>{children}</Frame> : <View>{children}</View>;

const FieldsRow: FC<TFieldsRowProps> = ({ children, label }) => {
  return (
    <Wrapper label={label}>
      <View style={styles.rowGroup}>
        {((children && Array.isArray(children) && children) || []).map(
          (child: ReactNode, index) => (
            <View key={`child_${index}`} style={styles.rowGroupField}>
              {child}
            </View>
          )
        )}
      </View>
    </Wrapper>
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
