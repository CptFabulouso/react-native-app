import { FormikActions } from 'formik';
import { LoadingCard } from 'src/components';
import React from 'react';

import * as API from 'src/utils/api';
import * as accountActions from './accountActions';
import * as deviceActions from '../device/deviceActions';
import { ActionCreator, User } from 'src/types';
import { getRefreshToken } from '../../selectors';
import { sleep } from 'src/utils/common';
import NavigationActions from 'src/navigation/NavigationActions';

import {
	ChangePasswordFormValues,
	CreateAccountFormValues,
	ForgottenPasswordFormValues,
	LoginFormValues,
} from 'src/components/Forms';
import i18n from 'src/i18n';

export const loginWithEmailAndPassword = (
	{ email, password }: LoginFormValues,
	formActions: FormikActions<LoginFormValues>
): ActionCreator => async dispatch => {
	dispatch(
		deviceActions.showOverallModal(
			<LoadingCard title={i18n.t('auth.loggingIn')} />
		)
	);

	formActions.setSubmitting(true);
	dispatch(accountActions.loginWithEmailAndPasswordRequested());

	try {
		const user: User = await API.auth.loginWithEmailAndPassword(
			email,
			password
		);
		dispatch(accountActions.loginWithEmailAndPasswordSucceeded(user));
		dispatch(runOnLoginActions(user));
	} catch (er) {
		dispatch(accountActions.loginWithEmailAndPasswordFailed(er.message));
	} finally {
		dispatch(deviceActions.hideOverallModal());
		formActions.setSubmitting(false);
	}
};

export const sendResetPasswordCode = (
	{ email }: ForgottenPasswordFormValues,
	formActions: FormikActions<ForgottenPasswordFormValues>
): ActionCreator => async dispatch => {
	formActions.setSubmitting(true);
	dispatch(accountActions.sendResetPasswordCodeRequested());

	try {
		await API.auth.sendResetPasswordCode(email);
		dispatch(accountActions.sendResetPasswordCodeSucceeded());
	} catch (er) {
		dispatch(accountActions.sendResetPasswordCodeFailed(er.message));
	} finally {
		formActions.setSubmitting(false);
	}
};

export const changePassword = (
	{ email, password, token }: ChangePasswordFormValues,
	formActions: FormikActions<ChangePasswordFormValues>
): ActionCreator => async dispatch => {
	formActions.setSubmitting(true);
	dispatch(accountActions.changePasswordRequested());
	try {
		await API.auth.changePassword(email, password, token);
		dispatch(accountActions.changePasswordSucceeded());
		formActions.resetForm();
	} catch (er) {
		dispatch(accountActions.changePasswordFailed(er.message));
	} finally {
		formActions.setSubmitting(false);
	}
};

export const runOnLoginActions = (
	user: User
): ActionCreator => async dispatch => {
	dispatch(accountActions.userAuthorized(user));
	NavigationActions.push('Auth');
};

export const runOnLogoutActions = (): ActionCreator => async dispatch => {
	dispatch(accountActions.userUnauthorized());
	NavigationActions.push('UnAuth');
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
	dispatch(
		deviceActions.showOverallModal(
			<LoadingCard title={i18n.t('auth.loggingOut')} />
		)
	);
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
	{ email, password }: CreateAccountFormValues,
	formActions: FormikActions<CreateAccountFormValues>
): ActionCreator => async dispatch => {
	formActions.setSubmitting(true);
	dispatch(accountActions.createEmailAccountRequested());

	try {
		const user: User = await API.auth.createAccountWithEmailAndPassword(
			email,
			password
		);
		dispatch(accountActions.createEmailAccountSucceeded(user));
		formActions.resetForm();
	} catch (er) {
		dispatch(accountActions.createEmailAccountFailed(er.message));
	} finally {
		formActions.setSubmitting(false);
	}
};
