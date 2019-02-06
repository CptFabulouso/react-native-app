// @flow

import type { Action, Exact } from 'flow-types';

type State = Exact<{
	authorizing: boolean,
	authorized: boolean,
	error: string,
}>;

const INITIAL_STATE: State = {
	authorizing: false,
	authorized: false,
	error: '',
};

const settings = (state: State = INITIAL_STATE, action: Action): State => {
	switch (action.type) {
		case 'USER_AUTHORIZED':
			return state;
		case 'USER_UNAUTHORIZED':
			return state;
		default:
			return state;
	}
};

export default settings;
