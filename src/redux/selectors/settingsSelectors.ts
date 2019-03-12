import { AppState, SupportedLanguage } from 'src/types';
import { SettingsState } from '../modules/settings/settingsReducer';

export const getDeviceLanguage = (state: AppState): SupportedLanguage =>
	state.settings.language;

export const getSettings = (state: AppState): SettingsState => state.settings;
