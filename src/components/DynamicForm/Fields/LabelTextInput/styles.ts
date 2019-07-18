import { StyleSheet } from 'react-native';

import { Colors, Fonts } from 'src/themes';
export const TITLE_WIDTH = 300;

export default StyleSheet.create({
	container: {
		minHeight: 75,
	},

	inputLabelContainer: {
		backgroundColor: 'white',
		height: 50,
		borderWidth: 1.5,
		borderRadius: 7,
		borderColor: Colors.border,
		alignItems: 'center',
		overflow: 'hidden',
		flexDirection: 'row',
	},

	inputWrapper: {
		marginTop: 17,
		marginLeft: 15,
		flex: 1,
	},

	inputContainerInvalid: {
		borderColor: Colors.red,
	},

	label: {
		fontSize: Fonts.size.input,
		width: TITLE_WIDTH,
	},

	description: {
		marginBottom: 5,
	},

	labelContainer: {
		...StyleSheet.absoluteFillObject,
		left: 15,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},

	disabled: {
		opacity: 0.5,
	},

	error: {
		marginLeft: 15,
		color: Colors.red,
	},
});
