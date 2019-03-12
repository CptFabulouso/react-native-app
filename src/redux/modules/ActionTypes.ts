import { AccountActionTypes } from './account/accountActionTypes';
import { DeviceActionTypes } from './device/deviceActionTypes';
import { SettingsActionTypes } from './settings/settingsActionTypes';
// import { StartupActions } from './startup/startupActions';

export type Action =
	| SettingsActionTypes
	// StartupActions |
	| DeviceActionTypes
	| AccountActionTypes;
