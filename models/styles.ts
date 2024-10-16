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
  black: THexColor;
  primaryText: THexColor;
  secondaryText: THexColor;
  primaryButton: THexColor;
  secondaryButton: THexColor;
}

export type IColorKey = keyof IColors;

export interface IColorVariants {
  dark: IColors;
  light: IColors;
  common: {
    themeToggle: {
      border: THexColor;
      lightSky: THexColor;
      darkSky: THexColor;
      moon: THexColor;
      stars: THexColor;
      cloud: THexColor;
      sun: THexColor;
      lightMountain: THexColor;
      darkMountain: THexColor;
      lens: THexColor;
    };
    languageSelect: {
      water: THexColor;
      earth: THexColor;
    };
  };
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
  buttonShadow: Pick<TStyle, TShadowStyles>;
}

export type NamedStyles = ViewStyle | TextStyle | ImageStyle;
export type NamedStylesConjuntion = ViewStyle & TextStyle & ImageStyle;
