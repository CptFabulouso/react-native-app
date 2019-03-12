import { Action } from 'src/types';

type StartupState = {
	done: boolean;
	error: string;
};

const INITIAL_STATE = {
	done: false,
	error: '',
};

const startup = (state = INITIAL_STATE, action: Action): StartupState => {
	switch (action.type) {
		default:
			return state;
	}
};

export default startup;
