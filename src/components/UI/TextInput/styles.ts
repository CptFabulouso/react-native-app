import { Platform, StyleSheet } from 'react-native';

import { Fonts } from 'src/themes';
export const TITLE_WIDTH = 300;

export default StyleSheet.create({
	container: {
		paddingTop: 10,
		height: 45,
	},

	input: {
		flex: 1,
		fontSize: Fonts.size.input,
		...Platform.select({
			ios: {
				height: 30,
				bottom: 0,
				paddingBottom: 10,
				marginBottom: 0,
				left: 0,
			},
			android: {
				height: 75,
				bottom: 7,
				paddingBottom: 0,
				marginBottom: 5,
				left: -4,
			},
		}),
	},
});
