// @flow

import { loadLanguage } from '../settings/settingsActions';
// import { startOrientationListener } from '../device/deviceActions';

import type { ActionCreator } from 'flow-types';

export type StartupActions =
	| {|
			type: 'RUN_STARTUP_SAGAS_REQUESTED',
	  |}
	| {|
			type: 'RUN_STARTUP_SAGAS_SUCCEEDED',
	  |}
	| {|
			type: 'RUN_STARTUP_SAGAS_FAILED',
			payload: string,
	  |};

export const runStartupActions = (): ActionCreator => async dispatch => {
	dispatch(loadLanguage());
};
