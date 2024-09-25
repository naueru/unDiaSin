export type TTranslation = {
  CONFIG_SCREEN_TITLE: string;
  CONFIG_THEME_TITLE: string;
  CONFIG_LANG_TITLE: string;
  CONFIG_ICONS_TITLE: string;
  ALL_EXPENDABLES_TITLE: string;
  ALL_EXPENDABLES_EMPTY_LABEL: string;
  NEW_EXPENDABLE: string;
  DATE: string;
  SAVINGS: string;
  COST: string;
  RESTART: string;
  EDIT: string;
  REMOVE: string;
  CANCEL: string;
  OK: string;
  ARE_YOU_SURE: string;
  RESTART_DESCRIPTION: string;
  REMOVE_DESCRIPTION: string;
  YOU_TOOK_THE_FISRT_STEP: string;
  YOU_WILL_START_SOON: string;
  START_DATE: string;
  QUANTITY_PER_DAY: string;
  YOU_HAVE_SAVED: string;
  ITS_BEEN_ONE_DAY: string;
  ITS_BEEN_X_DAYS: string;
  FORMATTED_DATE: string;
  CURRENCY: string;
  EDIT_SCREEN_TITLE: string;
  ADD_SCREEN_TITLE: string;
  NAME: string;
  DAY: string;
  MONTH: string;
  YEAR: string;
  EXPENSES: string;
  ERROR_MAX_CHARS: string;
  ERROR_NUMBER_START_END: string;
  ERROR_INVALID_YEAR: string;
};

export type TTranslations = {
  spanish: TTranslation;
  english: TTranslation;
  japanese: TTranslation;
};

export type TTranslationsKeys = keyof TTranslations;

export type TLanguageSelectData = {
  value: string;
  label: string;
};
