import RNLanguages from 'react-native-languages';

import { Action, SupportedLanguage } from 'src/types';

export type SettingsState = {
	language: SupportedLanguage;
};

const INITIAL_STATE: SettingsState = {
	language: RNLanguages.language,
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
