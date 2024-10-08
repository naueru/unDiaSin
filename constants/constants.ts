// Types
import { TLanguageSelectData } from "../models/translations";

export const ROUTES = {
  expendables: "Expendables",
  manageExpendable: "ManageExpendable",
  config: "Config",
  expendablesOverview: "ExpendablesOverview",
  expendableDetail: "ExpendableDetail",
};

type TROUTE_DESTINATION = {
  route: string | null;
  params: {
    [key: string]: string | number;
  };
};

type TROUTE_DESTINATION_PAIR = {
  left: TROUTE_DESTINATION;
  right: TROUTE_DESTINATION;
};

type TROUTE_DESTINATIONS = { [key: string]: TROUTE_DESTINATION_PAIR };

export const ROUTE_DESTINATIONS: TROUTE_DESTINATIONS = {
  Expendables: {
    left: { route: ROUTES.config, params: {} },
    right: { route: ROUTES.manageExpendable, params: {} },
  },
  ManageExpendable: {
    left: {
      route: ROUTES.expendablesOverview,
      params: {},
    },
    right: { route: null, params: {} },
  },
  Config: {
    left: { route: null, params: {} },
    right: { route: ROUTES.expendablesOverview, params: {} },
  },
  ExpendablesOverview: {
    left: { route: ROUTES.config, params: {} },
    right: { route: ROUTES.manageExpendable, params: {} },
  },
  ExpendableDetail: {
    left: {
      route: ROUTES.expendablesOverview,
      params: { screen: ROUTES.expendables },
    },
    right: {
      route: ROUTES.manageExpendable,
      params: {},
    },
  },
};

export const MILLS_PER_SEC = 1000;
export const SEC_PER_MIN = 60;
export const MIN_PER_HOUR = 60;
export const HOURS_PER_DAY = 24;

export const MILLS_PER_DAY =
  MILLS_PER_SEC * SEC_PER_MIN * MIN_PER_HOUR * HOURS_PER_DAY; // 86400000

export const LANGUAGES: TLanguageSelectData[] = [
  { value: "spanish", label: "Español" },
  { value: "english", label: "English" },
  { value: "japanese", label: "日本語" },
];

export const DAYS_PER_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Storage
export const STORAGE_KEY_EXPENDABLES = "expendable_";
export const STORAGE_KEY_NOTIFICATIONS = "notifications";
export const STORAGE_KEY_LANGUAGE = "language";
export const STORAGE_KEY_THEME = "theme";
