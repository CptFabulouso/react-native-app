// @flow

import type { AccountActions } from './account/accountActions';
import type { DeviceActions } from './device/deviceActions';
import type { SettingsActions } from './settings/settingsActions';
import type { StartupActions } from './startup/startupActions';

export type Action =
	| StartupActions
	| SettingsActions
	| DeviceActions
	| AccountActions;
