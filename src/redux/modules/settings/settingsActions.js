// @flow

import { getDeviceLanguage } from '../../selectors';
import RNLanguages from 'react-native-languages';
import i18n from 'i18n';
import type { Action, ActionCreator, SupportedLanguage } from 'flow-types';
import type { SettingsState } from './settingsReducer';

type SettingsKey = $Keys<SettingsState>;
type SettingsData = $Values<SettingsState>;

export type SettingsActions =
	| {|
			type: 'CHANGE_APP_LANGUAGE',
			payload: SupportedLanguage,
	  |}
	| {|
			type: 'CHANGE_LOCAL_SETTING',
			payload: {|
				key: SettingsKey,
				value: SettingsData,
			|},
	  |};

export const changeAppLanguage = (language: SupportedLanguage): Action => {
	i18n.locale = language;
	return {
		type: 'CHANGE_APP_LANGUAGE',
		payload: language,
	};
};

export const loadLanguage = (): ActionCreator => (dispatch, getState) => {
	const savedLanguage = getDeviceLanguage(getState());
	if (savedLanguage) {
		dispatch(changeAppLanguage(savedLanguage));
	} else {
		dispatch(changeAppLanguage(RNLanguages.language));
	}
};

export const setVocabularyAtBeginnings = (value: boolean): Action =>
	changeLocalSetting('vocabularyAtMessageBeginning', value);

export const setAutomaticLowData = (value: boolean): Action =>
	changeLocalSetting('automaticLowData', value);

export const changeLocalSetting = (
	key: SettingsKey,
	value: SettingsData
): Action => ({
	type: 'CHANGE_LOCAL_SETTING',
	payload: {
		key,
		value,
	},
});
