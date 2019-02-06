// @flow

import type { SettingsState } from '../modules/settings/settingsReducer';
import type { State } from 'flow-types';

export const getDeviceLanguage = (state: State): string =>
	state.settings.language;

export const getSettings = (state: State): SettingsState => state.settings;
