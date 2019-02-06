// @flow

import { createSelector } from 'reselect';

import type { State } from 'flow-types';

const getStartup = (state: State) => state.startup;

export const getStartupDone = createSelector([getStartup], startup => {
	return {
		done: startup.done,
	};
});
