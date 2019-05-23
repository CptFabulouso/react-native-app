export function sleep(time: number): Promise<void> {
	// @ts-ignore this...
	return new Promise(resolve => this.setTimeout(resolve, time));
}

export function getPartialLanguageCode(language: string) {
	return language.split('-')[0];
}

export function addOpacityToHexColor(color: string, opacity: number) {
	opacity = Math.round(opacity * 255);
	const hexString = opacity.toString(16);
	if (color.length === 4) {
		// short version of color
		return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${
			color[3]
		}${hexString}`;
	} else {
		return `${color}${hexString}`;
	}
}
