// Core
import { FC, PropsWithChildren, ReactNode } from "react";
import { View } from "react-native";

// Hooks
import { useColorTheme } from "../../hooks/styles";

// Components
import Frame from "../../components/Frame";

// Utils
import { createThemedStyle } from "../../utils/styles";

type TFieldsRowProps = {
  label?: string;
} & PropsWithChildren;

const Wrapper: FC<TFieldsRowProps> = ({ children, label }) =>
  label ? <Frame label={label}>{children}</Frame> : <View>{children}</View>;

const FieldsRow: FC<TFieldsRowProps> = ({ children, label }) => {
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];
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

const computedStyles = createThemedStyle({
  rowGroup: {
    flexDirection: "row",
    gap: 16,
  },
  rowGroupField: {
    flex: 1,
  },
});
