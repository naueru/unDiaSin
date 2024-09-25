import { TExpendable } from "../models/Expendables";
import { TIcons } from "../models/Icons";

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

export const DEFAULT_LANGUAGE = "spanish";
