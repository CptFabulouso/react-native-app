// @flow
import { StyleSheet } from 'react-native';

import { Colors, Fonts, Metrics } from 'themes';
export const TITLE_WIDTH = 300;

export default StyleSheet.create({
	container: {
		height: 75,
	},

	background: {
		...StyleSheet.absoluteFill,
		backgroundColor: 'white',
		opacity: 0.7,
	},

	inputContainer: {
		height: 50,
		borderWidth: 1.5,
		borderRadius: 7,
		borderColor: Colors.border,
		justifyContent: 'center',
		paddingLeft: 15,
		overflow: 'hidden',
	},

	inputContainerInvalid:{
		borderColor: Colors.red,
	},

	input: {
		paddingVertical: Metrics.spacing.tiny,
	},

	label: {
		fontSize: Fonts.size.h6,
	},

	labelContainer: {
		width: TITLE_WIDTH,
	},

	disabled: {
		opacity: 0.5,
	},

	error: {
		marginLeft: 15,
		color: Colors.red,
	},
});
