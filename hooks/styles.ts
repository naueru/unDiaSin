import { useColorScheme } from "react-native";

export type ColorSchemaType = "light" | "dark";

export const useColorTheme = (): ColorSchemaType => {
  let scheme = useColorScheme();
  if (scheme !== "light" && scheme !== "dark") {
    scheme = "dark";
  }
  return scheme;
};
