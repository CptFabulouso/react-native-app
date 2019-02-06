// @flow

import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

import cs from './locales/cs.json';
import en from './locales/en.json';

type SupportedLanguage = $Keys<i18n.translations>;

type TranslateProps = {|
	t: (key: $Keys<cs>, options?: Object) => string,
	i18n: Object,
	i18nLoadedAt: Date,
|};
export type { SupportedLanguage, TranslateProps };

i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.translations = { en, cs };

export default i18n;
