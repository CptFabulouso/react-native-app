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
		height: Platform.OS == 'ios' ? 30 : 75,
		fontSize: Fonts.size.input,
		bottom: Platform.OS == 'ios' ? 0 : 7,
		paddingBottom: Platform.OS == 'ios' ? 10 : 0,
		marginBottom: Platform.OS == 'ios' ? 0 : 5,
		left: Platform.OS == 'ios' ? 0 : -4,
	},
});
