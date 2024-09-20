import { ImageStyle, ShadowStyleIOS, TextStyle, ViewStyle } from "react-native";

export type THexColor = `#${string}`;

export interface IColors {
  primary200: THexColor;
  primary500: THexColor;
  primary800: THexColor;
  secondary800: THexColor;
  accent500: THexColor;
  error500: THexColor;
  white: THexColor;
}

export type IColorKey = keyof IColors;

export interface IColorVariants {
  dark: IColors;
  light: IColors;
}

export interface IGlobalStyles {
  colors: IColorVariants & IColors;
  shadow: ShadowStyleIOS & {
    elevation?: number | undefined;
  };
}

export type NamedStyles = ViewStyle | TextStyle | ImageStyle;
