import { IColorVariants, IGlobalStyles } from "../models/styles";

const COLOR_VARIANTS: IColorVariants = {
  dark: {
    primary200: "#537EC5",
    primary500: "#293A80",
    primary800: "#010038",
    secondary800: "#FFFFFF",
    accent500: "#F39422",
    error500: "#F30A49",
    white: "#FFFFFF",
  },
  light: {
    primary200: "#FCF7F8",
    primary500: "#CED3DC",
    primary800: "#ABA9C3",
    secondary800: "#000000",
    accent500: "#275DAD",
    error500: "#F30A49",
    white: "#FFFFFF",
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
};
