// @flow

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		position: 'absolute',
		top: 50,
		right: 30,
	},

	close: {
		position: 'absolute',
		top: -20,
		right: -20,
		height: 20,
		width: 20,
		borderRadius: 10,
		opacity: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'red',
	},

	button: {
		height: 50,
		width: 50,
		borderRadius: 25,
		opacity: 0.5,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},

	devmenu: {
		backgroundColor: 'brown',
	},

	reload: {
		backgroundColor: 'navy',
	},

	debug: {
		backgroundColor: 'brown',
	},

	text: {
		color: 'white',
	},
});
