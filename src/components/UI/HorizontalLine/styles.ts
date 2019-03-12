import { StyleSheet } from 'react-native';

import { Colors } from 'src/themes';

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 20,
	},

	horizontalLine: {
		flex: 1,
		height: 1,
		backgroundColor: Colors.border,
	},
});
