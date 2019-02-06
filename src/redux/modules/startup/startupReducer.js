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
		case 'RUN_STARTUP_SAGAS_REQUESTED':
			return {
				...state,
				done: false,
				error: '',
			};
		case 'RUN_STARTUP_SAGAS_SUCCEEDED':
			return {
				...state,
				done: true,
			};
		case 'RUN_STARTUP_SAGAS_FAILED':
			return {
				...state,
				done: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default startup;
