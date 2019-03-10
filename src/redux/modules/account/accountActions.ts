import React from 'react';

import { LoadingCard } from 'components';

import * as API from 'utils/api';
import { getRefreshToken } from '../../selectors';
import { hideOverallModal, showOverallModal } from '../device/deviceActions';
import { sleep } from 'utils/common';
import NavigationActions from 'navigation/NavigationActions';
import i18n from 'i18n';
import {
	Action,
	ActionCreator,
	FormikActions,
	LoadData,
	User,
} from 'flow-types';
import {
	ChangePasswordFormValues,
	CreateAccountFormValues,
	ForgottenPasswordFormValues,
	LoginFormValues,
} from 'components/Forms';

export type AccountActions =
	| LoadData<'LOGIN_EMAIL_PASSWORD', User>
	| LoadData<'RE_LOGIN_USER', User>
	| LoadData<'SEND_RESET_PASSWORD_CODE', {}>
	| LoadData<'CHANGE_PASSWORD', {}>
	| LoadData<'CREATE_EMAIL_ACCOUNT', User>
	| LoadData<'LOGOUT_USER', {}>
	| {|
			type: 'RESET_RESET_PASSWORD_CODE',
	  |}
	| {|
			type: 'USER_AUTHORIZED',
			user: User,
	  |}
	| {|
			type: 'USER_UNAUTHORIZED',
	  |}
	| {|
			type: 'USER_UNAUTHORIZED',
	  |};

export const loginWithEmailAndPassword = (
	email: string,
	password: string,
	formActions: FormikActions<LoginFormValues>
): ActionCreator => async dispatch => {
	formActions.setSubmitting(true);
	dispatch(loginWithEmailAndPasswordRequested());

	try {
		const user: User = await API.auth.loginWithEmailAndPassword(
			email,
			password
		);
		dispatch(loginWithEmailAndPasswordSucceeded(user));
		dispatch(runOnLoginActions(user));
		// formActions.resetForm();
	} catch (er) {
		dispatch(loginWithEmailAndPasswordFailed(er.message));
	} finally {
		formActions.setSubmitting(false);
	}
};

export const loginWithEmailAndPasswordRequested = (): Action => ({
	type: 'LOGIN_EMAIL_PASSWORD',
	phase: 'start',
});

export const loginWithEmailAndPasswordSucceeded = (user: User): Action => ({
	type: 'LOGIN_EMAIL_PASSWORD',
	phase: 'success',
	newData: user,
});

export const loginWithEmailAndPasswordFailed = (message: string): Action => ({
	type: 'LOGIN_EMAIL_PASSWORD',
	phase: 'error',
	error: message,
});

export const sendResetPasswordCode = (
	email: string,
	formActions: FormikActions<ForgottenPasswordFormValues>
): ActionCreator => async dispatch => {
	formActions.setSubmitting(true);
	dispatch(sendResetPasswordCodeRequested());

	try {
		await API.auth.sendResetPasswordCode(email);
		dispatch(sendResetPasswordCodeSucceeded());
	} catch (er) {
		dispatch(sendResetPasswordCodeFailed(er.message));
	} finally {
		formActions.setSubmitting(false);
	}
};

export const sendResetPasswordCodeRequested = (): Action => ({
	type: 'SEND_RESET_PASSWORD_CODE',
	phase: 'start',
});

export const sendResetPasswordCodeSucceeded = (): Action => ({
	type: 'SEND_RESET_PASSWORD_CODE',
	phase: 'success',
	newData: {},
});

export const sendResetPasswordCodeFailed = (message: string): Action => ({
	type: 'SEND_RESET_PASSWORD_CODE',
	phase: 'error',
	error: message,
});

export const resetResetPasswordState = (): Action => ({
	type: 'RESET_RESET_PASSWORD_CODE',
});

export const changePassword = (
	email: string,
	password: string,
	token: string,
	formActions: FormikActions<ChangePasswordFormValues>
): ActionCreator => async dispatch => {
	formActions.setSubmitting(true);
	dispatch(changePasswordRequested());
	try {
		await API.auth.changePassword(email, password, token);
		dispatch(changePasswordSucceeded());
		formActions.resetForm();
	} catch (er) {
		dispatch(changePasswordFailed(er.message));
	} finally {
		formActions.setSubmitting(false);
	}
};

export const changePasswordRequested = (): Action => ({
	type: 'CHANGE_PASSWORD',
	phase: 'start',
});

export const changePasswordSucceeded = (): Action => ({
	type: 'CHANGE_PASSWORD',
	phase: 'success',
	newData: {},
});

export const changePasswordFailed = (message: string): Action => ({
	type: 'CHANGE_PASSWORD',
	phase: 'error',
	error: message,
});

export const runOnLoginActions = (
	user: User
): ActionCreator => async dispatch => {
	dispatch(userAuthorized(user));
	NavigationActions.push('Auth');
};

export const runOnLogoutActions = (): ActionCreator => async dispatch => {
	dispatch(userUnauthorized());
	NavigationActions.push('UnAuth');
};

export const userAuthorized = (user: User): Action => ({
	type: 'USER_AUTHORIZED',
	user,
});

export const userUnauthorized = (): Action => ({
	type: 'USER_UNAUTHORIZED',
});

export const reLogin = (): ActionCreator => async (dispatch, getState) => {
	dispatch(reLoginRequested());

	const refreshToken: ?string = getRefreshToken(getState());
	await sleep(1000);

	if (!refreshToken) {
		dispatch(reLoginFail('no token'));
		dispatch(runOnLogoutActions());
		return;
	}

	try {
		const user = await API.auth.reLoginWithToken(refreshToken);
		dispatch(reLoginSuccess(user));
		dispatch(runOnLoginActions(user));
	} catch (er) {
		dispatch(reLoginFail(er.message));
		dispatch(runOnLogoutActions());
	}
};

export const reLoginRequested = (): Action => ({
	type: 'RE_LOGIN_USER',
	phase: 'start',
});

export const reLoginSuccess = (user: User): Action => ({
	type: 'RE_LOGIN_USER',
	phase: 'success',
	newData: user,
});

export const reLoginFail = (message: string): Action => ({
	type: 'RE_LOGIN_USER',
	phase: 'error',
	error: message,
});

export const logOut = (): ActionCreator => async dispatch => {
	dispatch(showOverallModal(<LoadingCard title={i18n.t('auth.loggingOut')} />));
	dispatch(logOutRequested());

	try {
		await API.auth.logOut();
		dispatch(logOutSuccess());
		dispatch(runOnLogoutActions());
	} catch (er) {
		dispatch(logOutFail(er.message));
	} finally {
		dispatch(hideOverallModal());
	}
};

export const logOutRequested = (): Action => ({
	type: 'LOGOUT_USER',
	phase: 'start',
});

export const logOutSuccess = (): Action => ({
	type: 'LOGOUT_USER',
	phase: 'success',
	newData: {},
});

export const logOutFail = (message: string): Action => ({
	type: 'LOGOUT_USER',
	phase: 'error',
	error: message,
});

export const createAccountWithEmailAndPassword = (
	email: string,
	password: string,
	formActions: FormikActions<CreateAccountFormValues>
): ActionCreator => async dispatch => {
	formActions.setSubmitting(true);
	dispatch(createEmailAccountRequested());

	try {
		const user: User = await API.auth.createAccountWithEmailAndPassword(
			email,
			password
		);
		dispatch(createEmailAccountSucceeded(user));
		formActions.resetForm();
	} catch (er) {
		dispatch(createEmailAccountFailed(er.message));
	} finally {
		formActions.setSubmitting(false);
	}
};

export const createEmailAccountRequested = (): Action => ({
	type: 'CREATE_EMAIL_ACCOUNT',
	phase: 'start',
});

export const createEmailAccountSucceeded = (user: User): Action => ({
	type: 'CREATE_EMAIL_ACCOUNT',
	phase: 'success',
	newData: user,
});

export const createEmailAccountFailed = (message: string): Action => ({
	type: 'CREATE_EMAIL_ACCOUNT',
	phase: 'error',
	error: message,
});
