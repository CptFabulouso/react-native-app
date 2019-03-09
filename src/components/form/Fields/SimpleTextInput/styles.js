// @flow

import { StyleSheet } from 'react-native';

import { Colors } from 'themes';

export default StyleSheet.create({
	container: {
		height: 50,
		borderWidth: 1.5,
		borderRadius: 7,
		borderColor: Colors.border,
		justifyContent: 'center',
		paddingLeft: 15,
		overflow: 'hidden',
	},

	background: {
		...StyleSheet.absoluteFill,
		backgroundColor: 'white',
		opacity: 0.7,
	},
});
