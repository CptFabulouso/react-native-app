// @flow

export function sleep(time: number): Promise<void> {
	return new Promise(resolve => this.setTimeout(resolve, time));
}

export function getPartialLanguageCode(language: string) {
	return language.split('-')[0];
}
