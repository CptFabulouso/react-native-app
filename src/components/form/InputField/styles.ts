import { StyleSheet } from 'react-native';

import { Metrics } from 'src/themes';

export default StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: '#ccc',
	},

	input: {
		paddingVertical: Metrics.spacing.tiny,
	},

	error: {},
});
