import { Action, User } from 'src/types';

export interface AccountState {
	authorizing: boolean;
	authorized: boolean;
	error: string;
	user: User | null;
	resetCodeSending: boolean;
	resetCodeSent: boolean;
	resetCodeError: string;
}

const INITIAL_STATE: AccountState = {
	authorizing: false,
	authorized: false,
	error: '',
	user: null,
	resetCodeSending: false,
	resetCodeSent: false,
	resetCodeError: '',
};

const settings = (state = INITIAL_STATE, action: Action): AccountState => {
	switch (action.type) {
		case 'RE_LOGIN_USER': {
			if (action.phase === 'success') {
				return {
					...state,
					authorizing: false,
					authorized: true,
					user: action.newData,
				};
			} else if (action.phase === 'error') {
				return INITIAL_STATE;
			}
			return state;
		}
		case 'LOGIN_EMAIL_PASSWORD':
			if (action.phase === 'start') {
				return {
					...state,
					authorizing: true,
					authorized: false,
					error: '',
				};
			} else if (action.phase === 'success') {
				return {
					...state,
					authorizing: false,
					authorized: true,
					user: action.newData,
				};
			} else if (action.phase === 'error') {
				return {
					...state,
					authorizing: false,
					error: action.error,
				};
			}
			return state;
		case 'SEND_RESET_PASSWORD_CODE':
			if (action.phase === 'start') {
				return {
					...state,
					resetCodeSending: true,
					resetCodeSent: false,
					resetCodeError: '',
				};
			} else if (action.phase === 'success') {
				return {
					...state,
					resetCodeSending: false,
					resetCodeSent: true,
				};
			} else if (action.phase === 'error') {
				return {
					...state,
					resetCodeSending: false,
					resetCodeError: action.error,
				};
			}
			return state;
		case 'RESET_RESET_PASSWORD_CODE':
			return {
				...state,
				resetCodeSending: false,
				resetCodeSent: false,
				resetCodeError: '',
			};
		default:
			return state;
	}
};

export default settings;
