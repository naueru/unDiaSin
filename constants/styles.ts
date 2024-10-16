import { IColorVariants, IGlobalStyles } from "../models/styles";

const COLOR_VARIANTS: IColorVariants = {
  dark: {
    primary200: "#FCF7F8",
    primary500: "#363636",
    primary800: "#ABA9C3",
    secondary800: "#000000",
    accent500: "#00897b",
    error500: "#F30A49",
    white: "#FFFFFF",
    black: "#000000",
    primaryText: "#FFFFFF",
    secondaryText: "#969696",
    primaryButton: "#00897b",
    secondaryButton: "#969696",
  },
  light: {
    primary200: "#537EC5",
    primary500: "#293A80",
    primary800: "#010038",
    secondary800: "#FFFFFF",
    accent500: "#F39422",
    error500: "#F30A49",
    white: "#FFFFFF",
    black: "#000000",
    primaryText: "#FFFFFF",
    secondaryText: "#537EC5",
    primaryButton: "#F39422",
    secondaryButton: "#537EC5",
  },
  common: {
    themeToggle: {
      border: "#537EC5",
      lightSky: "#87CEEB",
      darkSky: "#0A0B3A",
      moon: "#FFFFFF",
      stars: "#FFFFFF",
      cloud: "#FFFFFF",
      sun: "#F39422",
      lightMountain: "#76552B",
      darkMountain: "#402905",
      lens: "#FFFFFF",
    },
    languageSelect: {
      water: "#87CEEB",
      earth: "#006400",
    },
  },
};

export const GLOBAL_STYLES: IGlobalStyles = {
  colors: {
    ...COLOR_VARIANTS,
  },
  shadow: {
    elevation: 8,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  buttonShadow: {
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
};
