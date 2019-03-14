import { StyleSheet } from 'react-native';

import { Fonts } from 'src/themes';

export default StyleSheet.create({
	container: {
		backgroundColor: 'white',
		borderRadius: 15,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},

	title: {
		paddingTop: 15,
		fontSize: Fonts.size.h5,
	},
});
