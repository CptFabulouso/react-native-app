import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';

import cs from './locales/cs.json';
import en from './locales/en.json';

const translations = {
	cs,
	en,
};

const bestLanguage = RNLocalize.findBestAvailableLanguage([
	'en-US',
	'cs-CZ',
]) || { languageTag: 'en-US', isRTL: false };

export function getDefaultLocaleCode(): string {
	const locales = RNLocalize.getLocales();

	if (Array.isArray(locales)) {
		for (let i = 0; i < locales.length; i++) {
			if (locales[i].languageTag === bestLanguage.languageTag) {
				return locales[i].languageCode;
			}
		}
	}
	// fallback to en
	return 'en';
}

i18n.locale = bestLanguage.languageTag;
i18n.fallbacks = true;
i18n.defaultLocale = 'en';
i18n.translations = translations;

// FIXME: allow use of only supported languages
// export type SupportedLanguage = keyof typeof translations;
export type SupportedLanguage = string;

export default i18n;
