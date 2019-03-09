// @flow

import { user } from './mocks/user';
import type { User } from './apiTypes';

import { sleep } from 'utils/common';

export const createAccountWithEmailAndPassword = async (
	email: string,
	password: string //eslint-disable-line
): Promise<User> => {
	await sleep(1000);

	if (password.length === 0) {
		throw new Error('wrong password');
	}

	return user(email);
};

export const loginWithEmailAndPassword = async (
	email: string,
	password: string //eslint-disable-line
): Promise<User> => {
	await sleep(1000);

	if (password.length === 0) {
		throw new Error('wrong password');
	}

	return user(email);
};

export const logOut = async (): Promise<void> => {
	await sleep(1000);

	return;
};

export const sendResetPasswordCode = async (
	email: string //eslint-disable-line
): Promise<null> => {
	await sleep(1000);

	return null;
};

export const changePassword = async (
	email: string, //eslint-disable-line
	password: string, //eslint-disable-line
	token: string //eslint-disable-line
): Promise<null> => {
	await sleep(1000);

	return null;
};

export const reLoginWithToken = async (refreshToken: string): Promise<User> => {
	await sleep(1000);
	if (refreshToken) {
		return user('email@email.com');
	}
	throw new Error('no token');
};
