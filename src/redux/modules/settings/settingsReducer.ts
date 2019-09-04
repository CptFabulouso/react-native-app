import { Action, SupportedLanguage } from 'src/types';
import { getDefaultLocaleCode } from 'src/i18n';

export type SettingsState = {
	language: SupportedLanguage;
};

const INITIAL_STATE: SettingsState = {
	language: getDefaultLocaleCode(),
};

const settings = (state = INITIAL_STATE, action: Action): SettingsState => {
	switch (action.type) {
		case 'CHANGE_APP_LANGUAGE':
			return {
				...state,
				language: action.payload,
			};
		case 'CHANGE_LOCAL_SETTING':
			return {
				...state,
				[action.payload.key]: action.payload.value,
			};
		default:
			return state;
	}
};

export default settings;
