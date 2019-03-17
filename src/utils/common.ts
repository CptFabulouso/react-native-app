export function sleep(time: number): Promise<void> {
	// @ts-ignore this...
	return new Promise(resolve => this.setTimeout(resolve, time));
}

export function getPartialLanguageCode(language: string) {
	return language.split('-')[0];
}
