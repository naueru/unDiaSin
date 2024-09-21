import { ImageStyle, ShadowStyleIOS, TextStyle, ViewStyle } from "react-native";
import { TStyle } from "../utils/styles";

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

export type TColorProperties = {
  backgroundColor: IColorKey;
  borderBlockColor: IColorKey;
  borderBlockEndColor: IColorKey;
  borderBlockStartColor: IColorKey;
  borderBottomColor: IColorKey;
  borderColor: IColorKey;
  borderEndColor: IColorKey;
  borderLeftColor: IColorKey;
  borderRightColor: IColorKey;
  borderStartColor: IColorKey;
  borderTopColor: IColorKey;
  color: IColorKey;
  overlayColor: IColorKey;
  shadowColor: IColorKey;
  textDecorationColor: IColorKey;
  textShadowColor: IColorKey;
  tintColor: IColorKey;
};

export type TShadowStyles = "elevation" & ShadowStyleIOS;
export interface IGlobalStyles {
  colors: IColorVariants;
  shadow: Pick<TStyle, TShadowStyles>;
}

export type NamedStyles = ViewStyle | TextStyle | ImageStyle;
