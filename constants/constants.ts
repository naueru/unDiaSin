// Types
import { TLanguageSelectData } from "../models/translations";

export const ROUTES = {
  expendables: "Expendables",
  manageExpendable: "ManageExpendable",
  config: "Config",
  expendablesOverview: "ExpendablesOverview",
  expendableDetail: "ExpendableDetail",
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
