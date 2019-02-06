// @flow

import type { State } from 'flow-types';

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
