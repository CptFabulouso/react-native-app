import { Action, User } from 'src/types';
import {
	CHANGE_PASSWORD,
	CREATE_EMAIL_ACCOUNT,
	LOGIN_EMAIL_PASSWORD,
	LOGOUT_USER,
	RESET_RESET_PASSWORD_CODE,
	RE_LOGIN_USER,
	SEND_RESET_PASSWORD_CODE,
	USER_AUTHORIZED,
	USER_UNAUTHORIZED,
} from './accountActionTypes';

export const loginWithEmailAndPasswordRequested = (): Action => ({
	type: LOGIN_EMAIL_PASSWORD,
	phase: 'start',
});

export const loginWithEmailAndPasswordSucceeded = (user: User): Action => ({
	type: LOGIN_EMAIL_PASSWORD,
	phase: 'success',
	newData: user,
});

export const loginWithEmailAndPasswordFailed = (message: string): Action => ({
	type: LOGIN_EMAIL_PASSWORD,
	phase: 'error',
	error: message,
});

export const sendResetPasswordCodeRequested = (): Action => ({
	type: SEND_RESET_PASSWORD_CODE,
	phase: 'start',
});

export const sendResetPasswordCodeSucceeded = (): Action => ({
	type: SEND_RESET_PASSWORD_CODE,
	phase: 'success',
	newData: {},
});

export const sendResetPasswordCodeFailed = (message: string): Action => ({
	type: SEND_RESET_PASSWORD_CODE,
	phase: 'error',
	error: message,
});

export const resetResetPasswordState = (): Action => ({
	type: RESET_RESET_PASSWORD_CODE,
});

export const changePasswordRequested = (): Action => ({
	type: CHANGE_PASSWORD,
	phase: 'start',
});

export const changePasswordSucceeded = (): Action => ({
	type: CHANGE_PASSWORD,
	phase: 'success',
	newData: {},
});

export const changePasswordFailed = (message: string): Action => ({
	type: CHANGE_PASSWORD,
	phase: 'error',
	error: message,
});

export const userAuthorized = (user: User): Action => ({
	type: USER_AUTHORIZED,
	user,
});

export const userUnauthorized = (): Action => ({
	type: USER_UNAUTHORIZED,
});

export const reLoginRequested = (): Action => ({
	type: RE_LOGIN_USER,
	phase: 'start',
});

export const reLoginSuccess = (user: User): Action => ({
	type: RE_LOGIN_USER,
	phase: 'success',
	newData: user,
});

export const reLoginFail = (message: string): Action => ({
	type: RE_LOGIN_USER,
	phase: 'error',
	error: message,
});

export const logOutRequested = (): Action => ({
	type: LOGOUT_USER,
	phase: 'start',
});

export const logOutSuccess = (): Action => ({
	type: LOGOUT_USER,
	phase: 'success',
	newData: {},
});

export const logOutFail = (message: string): Action => ({
	type: LOGOUT_USER,
	phase: 'error',
	error: message,
});

export const createEmailAccountRequested = (): Action => ({
	type: CREATE_EMAIL_ACCOUNT,
	phase: 'start',
});

export const createEmailAccountSucceeded = (user: User): Action => ({
	type: CREATE_EMAIL_ACCOUNT,
	phase: 'success',
	newData: user,
});

export const createEmailAccountFailed = (message: string): Action => ({
	type: CREATE_EMAIL_ACCOUNT,
	phase: 'error',
	error: message,
});
