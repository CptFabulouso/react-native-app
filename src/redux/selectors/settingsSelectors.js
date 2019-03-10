// @flow

import { SettingsState } from '../modules/settings/settingsReducer';
import { State } from 'flow-types';

export const getDeviceLanguage = (state: State): string =>
	state.settings.language;

export const getSettings = (state: State): SettingsState => state.settings;
