// Types
import { TLanguageSelectData } from "../models/translations";
import { TIcons } from "../models/Icons";
import { TROUTE, TROUTE_DESTINATIONS, TROUTES } from "../models/routes";

export const ROUTES: TROUTES = {
  expendables: "expendables",
  manageExpendable: "manageExpendable",
  config: "config",
  expendablesOverview: "expendablesOverview",
  expendableDetail: "expendableDetail",
};

export const ROUTES_ICONS: { [key in TROUTE]: TIcons } = {
  expendables: "skull",
  manageExpendable: "add-circle",
  config: "settings",
  expendablesOverview: "skull",
  expendableDetail: "skull",
};

export const ROUTE_DESTINATIONS: TROUTE_DESTINATIONS = {
  expendables: {
    left: { route: ROUTES.config, params: {} },
    right: { route: ROUTES.manageExpendable, params: {} },
    self: {
      route: ROUTES.expendables,
      params: {},
    },
  },
  manageExpendable: {
    left: {
      route: ROUTES.expendablesOverview,
      params: { screen: ROUTES.expendables },
    },
    right: { route: null, params: {} },
    self: {
      route: ROUTES.manageExpendable,
      params: {},
    },
  },
  config: {
    left: { route: null, params: {} },
    right: {
      route: ROUTES.expendablesOverview,
      params: { screen: ROUTES.expendables },
    },
    self: {
      route: ROUTES.config,
      params: {},
    },
  },
  expendablesOverview: {
    left: { route: ROUTES.config, params: {} },
    right: { route: ROUTES.manageExpendable, params: {} },
    self: {
      route: ROUTES.expendablesOverview,
      params: { screen: ROUTES.expendables },
    },
  },
  expendableDetail: {
    left: {
      route: ROUTES.expendablesOverview,
      params: { screen: ROUTES.expendables },
    },
    right: {
      route: ROUTES.manageExpendable,
      params: {},
    },
    self: {
      route: ROUTES.expendableDetail,
      params: {},
    },
  },
};

export const MILLS_PER_SEC: number = 1000;
export const SEC_PER_MIN: number = 60;
export const MIN_PER_HOUR: number = 60;
export const HOURS_PER_DAY: number = 24;

export const MILLS_PER_DAY: number =
  MILLS_PER_SEC * SEC_PER_MIN * MIN_PER_HOUR * HOURS_PER_DAY; // 86400000

export const LANGUAGES: TLanguageSelectData[] = [
  { value: "spanish", label: "Español" },
  { value: "english", label: "English" },
  { value: "japanese", label: "日本語" },
];

export const DAYS_PER_MONTH: number[] = [
  31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
];

// Storage
export const STORAGE_KEY_EXPENDABLES: string = "expendable_";
export const STORAGE_KEY_NOTIFICATIONS: string = "notifications";
export const STORAGE_KEY_LANGUAGE: string = "language";
export const STORAGE_KEY_THEME: string = "theme";

// Pan Navigator
export const MIN_FINGER_TRAVEL: number = 150;
