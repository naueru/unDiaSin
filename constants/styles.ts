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
};

export const GLOBAL_STYLES: IGlobalStyles = {
  colors: {
    ...COLOR_VARIANTS.dark,
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
