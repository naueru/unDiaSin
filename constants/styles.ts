const COLOR_ALTERNATIVES = {
  a: {
    primary200: "#537EC5",
    primary500: "#293A80",
    primary800: "#010038",
    accent500: "#F39422",
    error500: "#F30A49",
    white: "#FFFFFF",
  },
};

export const GLOBAL_STYLES = {
  colors: {
    ...COLOR_ALTERNATIVES.a,
  },
  shadow: {
    elevation: 8,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
};
