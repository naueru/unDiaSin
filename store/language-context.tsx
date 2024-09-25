// Core
import { createContext, PropsWithChildren, useState } from "react";

// Types
import { TTranslation, TTranslationsKeys } from "../models/translations";

// Constants
import TRANSLATIONS from "../constants/translations";
import { DEFAULT_LANGUAGE } from "../constants/defaults";

export interface ITranslationContext {
  language: string;
  chooseLanguage: Function;
  translation: TTranslation;
}

export const TranslationsContext = createContext<ITranslationContext>({
  language: "",
  chooseLanguage: () => {},
  translation: TRANSLATIONS.spanish,
});

const TranslationsContextProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<TTranslationsKeys>(DEFAULT_LANGUAGE);

  const chooseLanguage = (language: TTranslationsKeys) => {
    setLanguage(() => language);
  };

  const value = {
    language,
    chooseLanguage,
    translation: TRANSLATIONS[language],
  };

  return (
    <TranslationsContext.Provider value={value}>
      {children}
    </TranslationsContext.Provider>
  );
};

export default TranslationsContextProvider;
