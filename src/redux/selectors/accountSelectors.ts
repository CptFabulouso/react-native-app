import { AppState, User } from 'src/types';

export type AuthState = {
	authorizing: boolean;
	authorized: boolean;
	error: string;
};
export const getAuthState = (state: AppState): AuthState => ({
	authorizing: state.account.authorizing,
	authorized: state.account.authorized,
	error: state.account.error,
});

export const getRefreshToken = (state: AppState): string | null =>
	state.account.user && state.account.user.refreshToken;

export const getUser = (state: AppState): User | null => state.account.user;

export type ResetCodeState = {
	sending: boolean;
	sent: boolean;
	error: string;
};
export const getResetCodeState = (state: AppState): ResetCodeState => ({
	sending: state.account.resetCodeSending,
	sent: state.account.resetCodeSent,
	error: state.account.resetCodeError,
});
