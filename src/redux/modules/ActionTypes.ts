import { AccountActionTypes } from './account/accountActionTypes';
import { DeviceActionTypes } from './device/deviceActionTypes';
// import { SettingsActions } from './settings/settingsActions';
// import { StartupActions } from './startup/startupActions';

export type Action =
	// SettingsActions |
	// StartupActions |
	DeviceActionTypes | AccountActionTypes;
