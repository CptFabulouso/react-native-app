// @flow

import type { State, User } from 'flow-types';

export type AuthState = {|
	authorizing: boolean,
	authorized: boolean,
	error: string,
|};
export const getAuthState = (state: State): AuthState => ({
	authorizing: state.account.authorizing,
	authorized: state.account.authorized,
	error: state.account.error,
});

export const getRefreshToken = (state: State): ?string =>
	state.account.user && state.account.user.refreshToken;

export const getUser = (state: State): ?User => state.account.user;

export type ResetCodeState = {|
	sending: boolean,
	sent: boolean,
	error: string,
|};
export const getResetCodeState = (state: State): ResetCodeState => ({
	sending: state.account.resetCodeSending,
	sent: state.account.resetCodeSent,
	error: state.account.resetCodeError,
});
