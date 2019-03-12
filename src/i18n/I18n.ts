import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

import cs from './locales/cs.json';
import en from './locales/en.json';

const translations = {
	cs,
	en,
};

i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.defaultLocale = 'en';
i18n.translations = translations;

// FIXME: allow use of only supported languages
// export type SupportedLanguage = keyof typeof translations;
export type SupportedLanguage = string;

export default i18n;
