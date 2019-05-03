import { IntlProvider, addLocaleData } from "react-intl";
import { store } from "../../store";

import messages_en from "../../translations/en-US.json";
import messages_tr from "../../translations/tr-TR.json";

import tr from "react-intl/locale-data/tr";
import en from "react-intl/locale-data/en";

addLocaleData([...tr, ...en]);

export interface Languages<T> {
  [key: string]: T;
  "en-US": T;
  "tr-TR": T;
}

export interface Language {
  title: string;
  flag: string;
  key: string;
}

export const languages: Languages<any> = {
  "en-US": messages_en,
  "tr-TR": messages_tr,
};

export const awailableLanguages: Languages<Language> = {
  "en-US": {
    key: "en-US",
    title: "United States (English)",
    flag: "/images/flags/us.png",
  },
  "tr-TR": {
    key: "tr-TR",
    title: "Türkiye (Türkçe)",
    flag: "/images/flags/tr.png",
  },
};

const i18n = () => {
  const { intl } = new IntlProvider(
    {
      locale: store.getState().locale.selectedLanguage,
      messages: languages[store.getState().locale.selectedLanguage],
    },
    {},
  ).getChildContext();

  return intl;
};

export const formatMessage = (
  id: string,
  variables?: { [key: string]: ReactIntl.MessageValue } | undefined,
) =>
  i18n().formatMessage(
    {
      id,
    },
    variables,
  );

export default i18n;
