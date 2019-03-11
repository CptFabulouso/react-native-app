import { View } from 'react-native';
import React from 'react';

// import { LoadingCard } from 'components';

import * as API from 'src/utils/api';
import { getRefreshToken } from '../../selectors';
import { sleep } from 'src/utils/common';
// import NavigationActions from 'navigation/NavigationActions';
import * as accountActions from './accountActions';
import * as deviceActions from '../device/deviceActions';
import {
	Action,
	ActionCreator,
	// FormikActions,
	LoadData,
	User,
} from 'src/types';

// import {
//   ChangePasswordFormValues,
//   CreateAccountFormValues,
//   ForgottenPasswordFormValues,
//   LoginFormValues,
// } from 'components/Forms';

export const loginWithEmailAndPassword = (
	email: string,
	password: string
	// formActions: FormikActions<LoginFormValues>,
): ActionCreator => async dispatch => {
	// formActions.setSubmitting(true);
	dispatch(accountActions.loginWithEmailAndPasswordRequested());

	try {
		const user: User = await API.auth.loginWithEmailAndPassword(
			email,
			password
		);
		dispatch(accountActions.loginWithEmailAndPasswordSucceeded(user));
		dispatch(runOnLoginActions(user));
		// formActions.resetForm();
	} catch (er) {
		dispatch(accountActions.loginWithEmailAndPasswordFailed(er.message));
	} finally {
		// formActions.setSubmitting(false);
	}
};

export const sendResetPasswordCode = (
	email: string
	// formActions: FormikActions<ForgottenPasswordFormValues>,
): ActionCreator => async dispatch => {
	// formActions.setSubmitting(true);
	dispatch(accountActions.sendResetPasswordCodeRequested());

	try {
		await API.auth.sendResetPasswordCode(email);
		dispatch(accountActions.sendResetPasswordCodeSucceeded());
	} catch (er) {
		dispatch(accountActions.sendResetPasswordCodeFailed(er.message));
	} finally {
		// formActions.setSubmitting(false);
	}
};

export const changePassword = (
	email: string,
	password: string,
	token: string
	// formActions: FormikActions<ChangePasswordFormValues>,
): ActionCreator => async dispatch => {
	// formActions.setSubmitting(true);
	dispatch(accountActions.changePasswordRequested());
	try {
		await API.auth.changePassword(email, password, token);
		dispatch(accountActions.changePasswordSucceeded());
		// formActions.resetForm();
	} catch (er) {
		dispatch(accountActions.changePasswordFailed(er.message));
	} finally {
		// formActions.setSubmitting(false);
	}
};

export const runOnLoginActions = (
	user: User
): ActionCreator => async dispatch => {
	dispatch(accountActions.userAuthorized(user));
	// NavigationActions.push('Auth');
};

export const runOnLogoutActions = (): ActionCreator => async dispatch => {
	dispatch(accountActions.userUnauthorized());
	// NavigationActions.push('UnAuth');
};

export const reLogin = (): ActionCreator => async (dispatch, getState) => {
	dispatch(accountActions.reLoginRequested());

	const refreshToken = getRefreshToken(getState());
	await sleep(1000);

	if (!refreshToken) {
		dispatch(accountActions.reLoginFail('no token'));
		dispatch(runOnLogoutActions());
		return;
	}

	try {
		const user = await API.auth.reLoginWithToken(refreshToken);
		dispatch(accountActions.reLoginSuccess(user));
		dispatch(runOnLoginActions(user));
	} catch (er) {
		dispatch(accountActions.reLoginFail(er.message));
		dispatch(runOnLogoutActions());
	}
};

export const logOut = (): ActionCreator => async dispatch => {
	dispatch(deviceActions.showOverallModal(View));
	dispatch(accountActions.logOutRequested());

	try {
		await API.auth.logOut();
		dispatch(accountActions.logOutSuccess());
		dispatch(runOnLogoutActions());
	} catch (er) {
		dispatch(accountActions.logOutFail(er.message));
	} finally {
		dispatch(deviceActions.hideOverallModal());
	}
};

export const createAccountWithEmailAndPassword = (
	email: string,
	password: string
	// formActions: FormikActions<CreateAccountFormValues>,
): ActionCreator => async dispatch => {
	// formActions.setSubmitting(true);
	dispatch(accountActions.createEmailAccountRequested());

	try {
		const user: User = await API.auth.createAccountWithEmailAndPassword(
			email,
			password
		);
		dispatch(accountActions.createEmailAccountSucceeded(user));
		// formActions.resetForm();
	} catch (er) {
		dispatch(accountActions.createEmailAccountFailed(er.message));
	} finally {
		// formActions.setSubmitting(false);
	}
};
