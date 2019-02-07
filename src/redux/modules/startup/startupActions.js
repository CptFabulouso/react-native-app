// @flow

import { loadLanguage } from '../settings/settingsActions';
import { reLogin } from '../account/accountActions';

import type { ActionCreator } from 'flow-types';

export type StartupActions = {|
	type: 'RUN_STARTUP_ACTIONS',
|};

export const runStartupActions = (): ActionCreator => async dispatch => {
	dispatch(reLogin());
	dispatch(loadLanguage());
};
