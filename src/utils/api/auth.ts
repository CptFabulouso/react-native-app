import { User } from './apiTypes';
import { user } from './mocks/user';

import { sleep } from '../common';

export const createAccountWithEmailAndPassword = async (
	email: string,
	password: string
): Promise<User> => {
	await sleep(1000);

	if (password.length === 0) {
		throw new Error('wrong password');
	}

	return user(email);
};

export const loginWithEmailAndPassword = async (
	email: string,
	password: string
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

export const sendResetPasswordCode = async (email: string): Promise<null> => {
	await sleep(1000);
	if (email) {
		//
	}
	return null;
};

export const changePassword = async (
	email: string,
	password: string,
	token: string
): Promise<null> => {
	await sleep(1000);
	if (email && password && token) {
		//
	}

	return null;
};

export const reLoginWithToken = async (refreshToken: string): Promise<User> => {
	await sleep(1000);
	if (refreshToken) {
		return user('email@email.com');
	}
	throw new Error('no token');
};
