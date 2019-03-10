import { AccountActions } from './account/accountActions';
import { DeviceActions } from './device/deviceActions';
import { SettingsActions } from './settings/settingsActions';
import { StartupActions } from './startup/startupActions';

export type Action =
	| StartupActions
	| SettingsActions
	| DeviceActions
	| AccountActions;
