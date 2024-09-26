// Core
import { FC, PropsWithChildren } from "react";
import { Pressable, View } from "react-native";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Components
import Title from "./Title";

// Utils
import { createThemedStyle } from "../utils/styles";

// Constants
import { GLOBAL_STYLES } from "../constants/styles";

type TToggleProps = {
  onChange: Function;
  defaultValue: boolean;
  big?: boolean;
  label?: string;
} & PropsWithChildren;

const Toggle: FC<TToggleProps> = ({
  onChange,
  defaultValue,
  big = false,
  label,
}) => {
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];
  const handleChange = () => {
    onChange(!defaultValue);
  };

  return (
    <View style={styles.outerContainer}>
      {label ? <Title label={label} /> : null}
      <Pressable
        onPress={handleChange}
        style={[
          styles.container,
          big ? styles.containerBig : {},
          defaultValue ? styles.on : {},
        ]}
      >
        <View style={[styles.button, big ? styles.buttonBig : {}]} />
      </Pressable>
    </View>
  );
};

export default Toggle;

const computedStyles = createThemedStyle({
  outerContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    width: "100%",
  },
  container: {
    ...GLOBAL_STYLES.shadow,
    alignItems: "flex-start",
    backgroundColor: "primary500",
    borderColor: "primary200",
    borderRadius: 15,
    borderWidth: 2,
    height: 30,
    justifyContent: "center",
    padding: 2,
    width: 60,
  },
  on: {
    alignItems: "flex-end",
  },
  containerBig: {
    borderRadius: 40,
    height: 80,
    padding: 6,
    width: 160,
  },
  button: {
    backgroundColor: "primary200",
    borderRadius: 13,
    height: 22,
    width: 22,
  },
  buttonBig: {
    borderRadius: 38,
    height: 65,
    width: 65,
  },
});
