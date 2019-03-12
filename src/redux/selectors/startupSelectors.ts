import { createSelector } from 'reselect';

import { AppState } from 'src/types';

const getStartup = (state: AppState) => state.startup;

export const getStartupDone = createSelector(
	[getStartup],
	startup => {
		return {
			done: startup.done,
		};
	}
);
