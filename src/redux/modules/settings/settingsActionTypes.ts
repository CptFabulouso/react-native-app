import { SettingsState } from './settingsReducer';
import { SupportedLanguage } from 'src/types';

export const CHANGE_APP_LANGUAGE = 'CHANGE_APP_LANGUAGE';
export const CHANGE_LOCAL_SETTING = 'CHANGE_LOCAL_SETTING';

export type SettingsKey = keyof SettingsState;
export type SettingsData = SettingsState[keyof SettingsState];

interface changeAppLanguageAction {
	type: typeof CHANGE_APP_LANGUAGE;
	payload: SupportedLanguage;
}

interface changeLocalSettingAction {
	type: typeof CHANGE_LOCAL_SETTING;
	payload: {
		key: SettingsKey;
		value: SettingsData;
	};
}

export type SettingsActionTypes =
	| changeAppLanguageAction
	| changeLocalSettingAction;
