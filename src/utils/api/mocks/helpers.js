// @flow

export const generateRandomId = (): string => '' + randomBetween(1, 99999999);

export const randomBetween = (from: number, to: number) => {
	return Math.round(Math.random() * to) + from;
};
