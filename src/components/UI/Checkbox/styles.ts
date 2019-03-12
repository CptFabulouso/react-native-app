import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	checkbox: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
	},
	unchecked: {
		borderColor: 'blue',
	},
	checked: {
		borderColor: 'green',
		backgroundColor: 'green',
	},
});
