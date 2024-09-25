// Models
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { IColorKey, NamedStyles, TColorProperties } from "../models/styles";

// Constants
import { GLOBAL_STYLES } from "../constants/styles";

export type TStyle = {
  [key: string]: NamedStyles;
};

export type TStyleArg = {
  [key: string]: NamedStyles &
    Partial<{
      [p in keyof TColorProperties]: IColorKey;
    }>;
};

export type TStyleKeys = keyof (
  | ViewStyle
  | TextStyle
  | ImageStyle
  | keyof Partial<{
      [p in keyof TColorProperties]: IColorKey;
    }>
);

export interface IThemedStyle {
  dark: TStyle;
  light: TStyle;
}

export const createThemedStyle = (styles: TStyleArg): IThemedStyle => {
  const light: TStyle = {};
  const dark: TStyle = {};
  const classNames = Object.keys(styles);
  classNames.forEach((className) => {
    const currentClassName = { ...styles[className] };
    const properties = Object.keys(currentClassName);
    let lightProperties: { [key: string]: TStyleKeys } = {};
    let darkProperties: { [key: string]: TStyleKeys } = {};
    properties.forEach((property) => {
      if (property.toLowerCase().indexOf("color") > -1) {
        lightProperties[property] =
          GLOBAL_STYLES.colors.light[currentClassName[property as TStyleKeys]];
        darkProperties[property] =
          GLOBAL_STYLES.colors.dark[currentClassName[property as TStyleKeys]];
      } else {
        lightProperties[property] = currentClassName[property as TStyleKeys];
        darkProperties[property] = currentClassName[property as TStyleKeys];
      }
    });
    light[className] = lightProperties;
    dark[className] = darkProperties;
  });
  return {
    light: StyleSheet.create(light),
    dark: StyleSheet.create(dark),
  };
};
