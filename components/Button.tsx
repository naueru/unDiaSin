// Core
import { FC } from "react";
import { ButtonProps, Pressable, Text, TextStyle, View } from "react-native";

// Hooks
import { useColorTheme } from "../hooks/styles";

// Utils
import { createThemedStyle } from "../utils/styles";

// Constants
import { NamedStyles } from "../models/styles";

// Constants
import { GLOBAL_STYLES } from "../constants/styles";

export type TButton = {
  style?: NamedStyles;
  primary?: boolean;
} & ButtonProps;

const Button: FC<TButton> = ({
  onPress,
  title,
  style = {},
  primary = true,
}) => {
  const {
    color,
    fontFamily,
    fontSize,
    fontStyle,
    fontWeight,
    letterSpacing,
    lineHeight,
    textAlign,
    textDecorationLine,
    textDecorationStyle,
    textDecorationColor,
    textShadowColor,
    textShadowOffset,
    textShadowRadius,
    textTransform,
    userSelect,
    ...containerStyles
  } = style as TextStyle;
  const textStyle: TextStyle = Object.fromEntries(
    Object.entries({
      color,
      fontFamily,
      fontSize,
      fontStyle,
      fontWeight,
      letterSpacing,
      lineHeight,
      textAlign,
      textDecorationLine,
      textDecorationStyle,
      textDecorationColor,
      textShadowColor,
      textShadowOffset,
      textShadowRadius,
      textTransform,
      userSelect,
    }).filter(([_, v]) => v != null)
  );
  const scheme = useColorTheme();
  const styles = computedStyles[scheme];
  return (
    <View style={styles.outherContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.container,
          !pressed ? styles.shadow : {},
          pressed ? styles.fade : {},
          !primary ? styles.secondaryContainer : {},
          containerStyles,
        ]}
      >
        <Text style={[styles.label, textStyle]}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const computedStyles = createThemedStyle({
  outherContainer: {
    backgroundColor: "white",
    borderRadius: 2,
  },
  container: {
    backgroundColor: "primaryButton",
    borderRadius: 2,
  },
  secondaryContainer: {
    backgroundColor: "secondaryButton",
  },
  label: {
    color: "primaryText",
    fontSize: 14,
    fontWeight: 500,
    margin: 8,
    textAlign: "center",
    textTransform: "uppercase",
  },
  secondaryLabel: {
    color: "secondaryText",
  },
  shadow: GLOBAL_STYLES.buttonShadow,
  fade: {
    opacity: 0.9,
  },
});
