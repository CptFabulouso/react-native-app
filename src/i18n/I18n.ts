import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

import cs from './locales/cs.json';
import en from './locales/en.json';

type SupportedLanguage = 'cs' | 'en';

export { SupportedLanguage };

i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.translations = { en, cs };

export default i18n;
