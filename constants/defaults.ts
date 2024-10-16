// Types
import { TTranslationsKeys } from "../models/translations";
import { TExpendable } from "../models/Expendables";
import { TIcons } from "../models/Icons";
import { TROUTE } from "../models/routes";

// Constants
import { ROUTES } from "./constants";

export const DEFAULT_ICON: TIcons = "skull";

export const DEFAULT_EXPENDABLE: TExpendable = {
  id: "0",
  name: "",
  initDay: "1",
  initMonth: "1",
  initYear: "2000",
  icon: "skull",
  cost: "0",
  timesPerDay: "0",
};

export const DEFAULT_LANGUAGE: TTranslationsKeys = "spanish";

export const DEFAULT_ROUTE: TROUTE = ROUTES.expendablesOverview;
