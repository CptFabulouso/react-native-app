import { Action, ActionCreator, SupportedLanguage } from 'src/types';
import {
	CHANGE_APP_LANGUAGE,
	CHANGE_LOCAL_SETTING,
	SettingsData,
	SettingsKey,
} from './settingsActionTypes';
import { getDeviceLanguage } from '../../selectors';
import i18n, { getDefaultLocaleCode } from 'src/i18n';


export const changeAppLanguage = (language: SupportedLanguage): Action => {
	i18n.locale = language;
	return {
		type: CHANGE_APP_LANGUAGE,
		payload: language,
	};
};

export const loadLanguage = (): ActionCreator => (dispatch, getState) => {
	const savedLanguage = getDeviceLanguage(getState());
	if (savedLanguage) {
		dispatch(changeAppLanguage(savedLanguage));
	} else {
		dispatch(changeAppLanguage(getDefaultLocaleCode()));
	}
};

export const changeLocalSetting = (
	key: SettingsKey,
	value: SettingsData
): Action => ({
	type: CHANGE_LOCAL_SETTING,
	payload: {
		key,
		value,
	},
});
