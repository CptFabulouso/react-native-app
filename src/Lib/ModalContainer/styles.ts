import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},

	backdrop: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		opacity: 0,
		backgroundColor: 'black',
	},

	content: {
		flex: 1,
		justifyContent: 'center',
	},
});
