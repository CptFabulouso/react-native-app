//@flow

import { Platform } from 'react-native';

type FontWeight =
	| 'normal'
	| 'bold'
	| '100'
	| '200'
	| '300'
	| '400'
	| '500'
	| '600'
	| '700'
	| '800'
	| '900';

export const getFontStyleForWeight = (
	fontFamily?: string,
	fontWeight?: FontWeight
) => {
	if (!fontFamily) {
		return {};
	}
	if (Platform.OS === 'ios') {
		return { fontFamily, fontWeight };
	}
	switch (fontWeight) {
		case 'normal':
			return { fontFamily: `${fontFamily} Regular`, fontWeight: undefined };
		case 'bold':
			return { fontFamily: `${fontFamily} Bold`, fontWeight: undefined };
		case '100':
			return { fontFamily: `${fontFamily} Thin`, fontWeight: undefined };
		case '200':
			return { fontFamily: `${fontFamily} ExtraLight`, fontWeight: undefined };
		case '300':
			return { fontFamily: `${fontFamily} Light`, fontWeight: undefined };
		case '400':
			return { fontFamily: `${fontFamily} Regular`, fontWeight: undefined };
		case '500':
			return { fontFamily: `${fontFamily} Medium`, fontWeight: undefined };
		case '600':
			return { fontFamily: `${fontFamily} SemiBold`, fontWeight: undefined };
		case '700':
			return { fontFamily: `${fontFamily} Bold`, fontWeight: undefined };
		case '800':
			return { fontFamily: `${fontFamily} ExtraBold`, fontWeight: undefined };
		case '900':
			return { fontFamily: `${fontFamily} Black`, fontWeight: undefined };
		default: {
			return fontFamily
				? { fontFamily: `${fontFamily} Regular`, fontWeight: undefined }
				: {};
		}
	}
};
