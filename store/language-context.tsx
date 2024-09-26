// Core
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useState } from "react";

// Types
import { TTranslation, TTranslationsKeys } from "../models/translations";

// Constants
import TRANSLATIONS from "../constants/translations";
import { DEFAULT_LANGUAGE } from "../constants/defaults";
import { STORAGE_KEY_LANGUAGE } from "../constants/constants";

export interface ITranslationContext {
  language: TTranslationsKeys;
  chooseLanguage: Function;
  translation: TTranslation;
}

export const TranslationsContext = createContext<ITranslationContext>({
  language: DEFAULT_LANGUAGE,
  chooseLanguage: () => {},
  translation: TRANSLATIONS.spanish,
});

const TranslationsContextProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<TTranslationsKeys>(DEFAULT_LANGUAGE);
  const asyncStorage = useAsyncStorage(STORAGE_KEY_LANGUAGE);

  const chooseLanguage = (language: TTranslationsKeys) => {
    setLanguage(() => language);
    asyncStorage.setItem(language);
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
