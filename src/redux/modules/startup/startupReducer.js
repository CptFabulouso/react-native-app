// @flow

import type { Action, Exact } from 'flow-types';

type State = Exact<{
	done: boolean,
	error: string,
}>;

const INITIAL_STATE = {
	done: false,
	error: '',
};

const startup = (state: State = INITIAL_STATE, action: Action): State => {
	switch (action.type) {
		case 'RUN_STARTUP_ACTIONS':
			return {
				...state,
				done: false,
				error: '',
			};
		default:
			return state;
	}
};

export default startup;
